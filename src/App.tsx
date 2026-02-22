import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const toggleSize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <p>Start prompting (or editing) to see magic happen :)</p>

      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
        {isOpen && (
          <div className={`transition-all duration-300 ease-out ${isMinimized ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <div className="bg-white rounded-lg shadow-2xl p-6 max-w-sm w-96">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Chat with us!</h2>
                <button
                  onClick={toggleSize}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                  aria-label="Minimize chat"
                >
                  {isMinimized ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>
              <div className="text-gray-600 text-sm">
                <p>How can we help you today?</p>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={toggleChat}
          className={`transition-all duration-300 ease-out flex flex-col items-center gap-2 group`}
        >
          {!isOpen && (
            <span className="text-sm font-medium text-gray-700 bg-white px-3 py-1 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Chat with us!
            </span>
          )}

          <div
            className={`relative flex items-center justify-center bg-red-500 rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${
              isOpen && !isMinimized ? 'w-20 h-20' : 'w-56 h-64'
            }`}
          >
            <img
              src="/image-removebg-preview.png"
              alt="Student Avatar"
              className={`transition-transform duration-300 ${
                isOpen && !isMinimized ? 'scale-75' : 'scale-100'
              }`}
              style={{
                objectFit: 'contain',
                width: '100%',
                height: '100%',
              }}
            />

            {isOpen && !isMinimized && (
              <div className="absolute bottom-2 right-2 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
            )}
          </div>
        </button>
      </div>
    </div>
  );
}

export default App;
