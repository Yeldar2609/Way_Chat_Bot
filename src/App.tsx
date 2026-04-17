import { FormEvent, useMemo, useState } from 'react';
import { Send, X } from 'lucide-react';

type ChatRole = 'user' | 'assistant';

type ChatMessage = {
  role: ChatRole;
  content: string;
};

const SYSTEM_PROMPT = `You are the Wayland Website Chatbot.

Core behavior:
- Be warm, concise, and helpful for prospective students/families.
- Prefer phrases like "Based on Wayland's website...".
- If unsure, say you are unsure and direct to official contact channels.

Guardrails (must follow):
- Never share private student information.
- Do not diagnose medical or mental health conditions.
- Do not promise official outcomes (admission, financial aid, discipline decisions).
- Do not invent policies not present in the supplied knowledge base.
- For health concerns, direct users to the Schoen Health Center.

Use this knowledge base as authoritative context:
- Wayland Academy is a private boarding/day school for grades 9-12.
- Address: 101 North University Avenue, Beaver Dam, WI 53916.
- Main: 920-356-2120, Admission: 800-860-7725, Fax: 920-885-2032.
- Schedule: free time 5:45-8:00pm; study hall Sun-Thu 8:00-9:30pm; A/B week system; MyBlock.
- Dining by Sodexo Food Services; many dietary accommodations via the Health Center.
- Residence life: ~70% live on campus.
- Health: Schoen Health Center includes nurse, athletic trainer, mental health specialist; weekday hours 7:30am-3:30pm.
- Clubs include Robotics Club and Sewing Club among many others.
- Traditions include Parade of Nations in Kimberly Chapel ending at Swan Library balcony.

Response style:
- Keep answers factual and grounded in the knowledge above.
- If user asks for directions/policy details not in context, offer contact channels rather than guessing.
- Keep average answers 2-5 sentences unless user asks for detail.`;

const MODEL = 'google/gemma-4-31b-it:free';
const CONTEXT_WINDOW = 10;

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content:
        "Hi! I'm the Wayland assistant. Ask me about school life, schedule, clubs, dining, or campus resources.",
    },
  ]);
  const [error, setError] = useState<string | null>(null);

  const apiKey = useMemo(() => import.meta.env.VITE_OPENROUTER_API_KEY as string | undefined, []);

  const sendMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    if (!apiKey) {
      setError('Missing API key. Add VITE_OPENROUTER_API_KEY to your .env file.');
      return;
    }

    setError(null);
    setInput('');
    setIsLoading(true);

    const nextUserMessage: ChatMessage = { role: 'user', content: trimmed };
    const withUser = [...messages, nextUserMessage];
    setMessages(withUser);

    const recentMessages = withUser.slice(-CONTEXT_WINDOW);
    const requestMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...recentMessages.map((message) => ({ role: message.role, content: message.content })),
    ];

    setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Wayland Website Chatbot',
        },
        body: JSON.stringify({
          model: MODEL,
          messages: requestMessages,
          stream: true,
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error(`OpenRouter request failed (${response.status}).`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';

        for (const line of lines) {
          const trimmedLine = line.trim();
          if (!trimmedLine.startsWith('data:')) continue;
          const payload = trimmedLine.slice(5).trim();

          if (!payload || payload === '[DONE]') continue;

          try {
            const parsed = JSON.parse(payload);
            const delta: string | undefined = parsed?.choices?.[0]?.delta?.content;
            if (!delta) continue;

            setMessages((prev) => {
              const copy = [...prev];
              const last = copy[copy.length - 1];
              if (last?.role === 'assistant') {
                copy[copy.length - 1] = { ...last, content: `${last.content}${delta}` };
              }
              return copy;
            });
          } catch {
            // Ignore keep-alive / non-JSON chunks.
          }
        }
      }

      setMessages((prev) => {
        const copy = [...prev];
        const last = copy[copy.length - 1];
        if (last?.role === 'assistant' && !last.content.trim()) {
          copy[copy.length - 1] = {
            ...last,
            content: 'I had trouble generating a response. Please try again.',
          };
        }
        return copy;
      });
    } catch (caughtError) {
      const message = caughtError instanceof Error ? caughtError.message : 'Unknown error.';
      setError(message);
      setMessages((prev) => {
        const copy = [...prev];
        const last = copy[copy.length - 1];
        if (last?.role === 'assistant' && !last.content.trim()) {
          copy[copy.length - 1] = {
            ...last,
            content: 'Sorry, I could not reach the AI service. Please try again shortly.',
          };
        }
        return copy;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <p className="text-gray-500">Wayland chatbot demo</p>

      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
        {isOpen && (
          <div className="w-[420px] max-w-[calc(100vw-2rem)] h-[560px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col">
            <header className="bg-red-600 text-white px-4 py-3 flex items-center justify-between">
              <div>
                <h1 className="font-semibold text-base">Wayland Website Chatbot</h1>
                <p className="text-xs text-red-100">Grounded to Wayland knowledge + guardrails</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-red-700 rounded transition-colors"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </header>

            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50">
              {messages.map((message, idx) => (
                <div
                  key={`${message.role}-${idx}`}
                  className={`max-w-[90%] rounded-2xl px-3 py-2 text-sm whitespace-pre-wrap ${
                    message.role === 'assistant'
                      ? 'bg-white text-gray-900 border border-gray-200 mr-auto'
                      : 'bg-red-600 text-white ml-auto'
                  }`}
                >
                  {message.content || (isLoading && message.role === 'assistant' ? 'Thinking…' : '')}
                </div>
              ))}
            </div>

            <form onSubmit={sendMessage} className="p-3 border-t border-gray-200 bg-white">
              {error && <p className="mb-2 text-xs text-red-600">{error}</p>}
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask about student life, dining, clubs..."
                  className="flex-1 border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-300"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="bg-red-600 text-white rounded-xl px-3 py-2 disabled:opacity-50 hover:bg-red-700 transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>
            </form>
          </div>
        )}

        <button
          onClick={() => setIsOpen((previous) => !previous)}
          className="relative w-20 h-20 bg-red-600 rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
          aria-label="Open chat"
        >
          <img
            src="/image-removebg-preview.png"
            alt="Student Avatar"
            className="w-full h-full object-contain"
          />
          {!isOpen && <div className="absolute bottom-2 right-2 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />}
        </button>
      </div>
    </div>
  );
}

export default App;
