# Wayland Chatbot v2.0 - Implementation & Customization Guide

## 🚀 Quick Start

### Single File Version
```
index.html (420KB total with all CSS + JS inline)
```

**To run:**
1. Open `index.html` in any modern browser
2. No server required
3. Works immediately

---

## 📐 Architecture Summary

### Component Structure

```
index.html (single production file)
├── Launcher Button (bottom-right, fixed)
│   ├── Person icon (👤)
│   ├── Pulse animation + online dot
│   └── "Chat with us!" label (hover)
│
├── Chat Widget Panel (expandable)
│   ├── Header (red gradient)
│   │   ├── Title + Subtitle
│   │   ├── Demo badge
│   │   └── Disable button
│   ├── Warning banner (cream)
│   ├── Messages area (scrollable)
│   │   ├── Welcome message
│   │   ├── User messages (green, right)
│   │   └── Bot messages (white, left)
│   ├── Suggested prompts (5 chips)
│   ├── Input area (text + send)
│   └── Footer (version + phone link)
│
└── Disabled Overlay (when killed)
    └── "Assistant is currently disabled"
```

### Code Organization

```javascript
(function() {
    // IIFE for scoped globals
    
    CONFIG = { storageKeys, prompts }
    KNOWLEDGE_BASE = [ { intents, response }, ... ]
    elements = { DOM references }
    state = { isOpen, isDisabled }
    
    Utility Functions:
    - getCurrentTime()
    - sanitizeHTML()
    - scrollToBottom()
    
    Widget Logic:
    - openWidget() / closeWidget()
    - addMessage()
    - handleUserMessage()
    - handleSuggestionClick()
    
    Intent Matching:
    - findBestMatch()
    - getDefaultResponse()
    
    Kill Switch:
    - disableChatbot() / enableChatbot()
    - checkDisabledState()
    
    Init:
    - renderSuggestions()
    - showWelcomeMessage()
    - attachEventListeners()
    - restoreState()
})()
```

---

## 🎨 Design Customization

### Change Primary Color

**Red (Current):** `#B4232A`
**Alternatives:**
- Navy: `#003d7a`
- Green: `#1a6d3e`
- Purple: `#5e2b84`

**Edit locations in CSS:**

```css
:root {
    --wa-primary-red: #B4232A;      /* ← Change this */
    --wa-accent-red: #C93B3F;       /* ← And this (lighter shade) */
}
```

**Affected elements:**
- Launcher button gradient
- Widget header gradient
- Send button gradient
- User message bubbles
- Focus states
- Hover states

### Change Warm Background

**Current:** `#F8F3F1` (warm beige)
**Alternatives:**
- Lighter: `#FAFAFA`
- Warmer: `#FAF5F0`
- Cooler: `#F5F5F5`

```css
:root {
    --wa-warm-bg: #F8F3F1;  /* ← Change this */
}
```

### Modify Fonts

Currently uses system fonts (clean, fast):
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, ...
```

To add custom font (Google Fonts example):
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

Then in CSS:
```css
.wa-chatbot-root * {
    font-family: 'Inter', sans-serif;
}
```

### Adjust Launcher Position

**Desktop positioning (currently bottom-right):**
```css
.wa-chatbot-launcher {
    bottom: 24px;   /* Distance from bottom */
    right: 24px;    /* Distance from right edge */
}
```

**Move to bottom-left:**
```css
.wa-chatbot-launcher {
    bottom: 24px;
    left: 24px;     /* Change from right to left */
    right: auto;    /* Clear right */
}
```

**Move to top-right:**
```css
.wa-chatbot-launcher {
    top: 24px;      /* Add top */
    bottom: auto;   /* Clear bottom */
    right: 24px;
}
```

### Launcher Size

**Current:** 56px diameter
**To make smaller (mobile-friendly):**
```css
.wa-chatbot-launcher-btn {
    width: 48px;    /* ← Reduce from 56px */
    height: 48px;   /* ← Reduce from 56px */
    font-size: 24px; /* ← Reduce from 28px */
}
```

### Widget Panel Width

**Desktop:**
```css
.wa-chatbot-widget {
    width: 420px;   /* ← Change this (current: 420px) */
}
```

**Larger (600px):**
```css
.wa-chatbot-widget {
    width: 600px;
    max-height: 750px;
}
```

### Animation Speed

**Currently 300ms for smooth feel:**
```css
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                      /* ↑ Change 0.3s to adjust */
```

**Faster (200ms):**
```css
transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
```

**Slower (500ms):**
```css
transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
```

---

## 📝 Content Customization

### Change Welcome Message

**Find in JavaScript section:**
```javascript
function showWelcomeMessage() {
    addMessage(
        "Hi! 👋 I'm your Wayland Academy assistant. Ask me about our schedule, clubs, location, or anything else about campus life!"
    );
}
```

**Edit the string:**
```javascript
function showWelcomeMessage() {
    addMessage(
        "Welcome! 👋 I can help answer questions about [Your School]. What would you like to know?"
    );
}
```

### Change Suggested Prompts

**Find in CONFIG:**
```javascript
const CONFIG = {
    suggestedPrompts: [
        "What grades does Wayland serve?",
        "Tell me about daily schedule",
        "What clubs are available?",
        "Where is Wayland located?",
        "What if I'm sick?"
    ]
};
```

**Edit to 5 of your own:**
```javascript
suggestedPrompts: [
    "What is your school known for?",
    "Tell me about campus safety",
    "How do I get involved?",
    "Where can I find a campus map?",
    "How do I apply?"
]
```

### Add New Q&A Responses

**Find KNOWLEDGE_BASE array:**
```javascript
const KNOWLEDGE_BASE = [
    // Existing entries...
];
```

**Add new entry (before closing bracket):**
```javascript
{
    intents: ['keyword1', 'keyword2', 'phrase with spaces'],
    response: "Your response text here. Keep it 2-5 sentences for best UX."
},
```

**Example:**
```javascript
{
    intents: ['bus', 'transportation', 'shuttle', 'ride', 'parking'],
    response: "We offer bus service from the main station. Parking is available in Lot C. Ask the front desk for route schedules!"
},
```

**Best practices for intents:**
- Use lowercase (code does .toLowerCase())
- Include common variations: "club", "clubs", "activity", "activities"
- Include abbreviated versions: "email", "e-mail", "contact info"
- Avoid too-generic: "the", "and", "is" cause false positives

### Change Warning Banner Text

**Find in HTML:**
```html
<div class="wa-chatbot-warning">
    ⚠️ Prototype demo. Official answers should be confirmed with school offices.
</div>
```

**Edit to:**
```html
<div class="wa-chatbot-warning">
    ⚠️ This is a demo. For official information, contact admissions@yourschool.edu
</div>
```

### Change Contact Information

**Footer phone number:**
```html
<footer class="wa-chatbot-footer">
    <div>Version 2.0 | <a href="tel:920-356-2120">920-356-2120</a></div>
</footer>
```

**Change to your number:**
```html
<footer class="wa-chatbot-footer">
    <div>Version 2.0 | <a href="tel:555-123-4567">555-123-4567</a></div>
</footer>
```

**In fallback response:**
```javascript
function getDefaultResponse() {
    return "Great question! For official information:\n\n" +
           "Main: 555-123-4567\n" +
           "Email: info@yourschool.edu\n\n" +
           "A real person can give you the best answer!";
}
```

### Change Header Text

**Find in HTML:**
```html
<h1 class="wa-chatbot-title">Wayland Academy</h1>
<p class="wa-chatbot-subtitle">Assistant</p>
```

**Edit to:**
```html
<h1 class="wa-chatbot-title">Your School Name</h1>
<p class="wa-chatbot-subtitle">Help Center</p>
```

### Change Demo Badge

**Find:**
```html
<span class="wa-chatbot-badge">Demo v2.0</span>
```

**Options:**
```html
<span class="wa-chatbot-badge">Beta</span>
<span class="wa-chatbot-badge">v2.0</span>
<span class="wa-chatbot-badge">Prototype</span>
```

---

## 🔌 API Integration Stubs

### Prepare for Real AI (v3.0)

**Replace this:**
```javascript
function findBestMatch(userInput) {
    const input = userInput.toLowerCase().trim();
    // Keyword matching...
    return qa.response;
}
```

**With this (API stub):**
```javascript
function findBestMatch(userInput) {
    return getBotReply(userInput);
}

function getBotReply(question) {
    // TODO: Replace with API call in v3.0
    // For now, fall back to keyword matching
    
    const input = question.toLowerCase().trim();
    for (const qa of KNOWLEDGE_BASE) {
        for (const intent of qa.intents) {
            if (input.includes(intent.toLowerCase())) {
                return qa.response;
            }
        }
    }
    return getDefaultResponse();
}
```

**Then in v3.0, update getBotReply:**
```javascript
async function getBotReply(question) {
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question })
        });
        const data = await response.json();
        return data.reply;
    } catch (error) {
        return getDefaultResponse();
    }
}
```

### Analytics Stub

**Add tracking function:**
```javascript
function logEvent(eventType, payload) {
    // TODO: Send to analytics in v3.0
    console.log(`Event: ${eventType}`, payload);
}
```

**Use it:**
```javascript
function handleUserMessage() {
    // ... existing code ...
    logEvent('message_sent', { question: userText });
}

function openWidget() {
    // ... existing code ...
    logEvent('widget_opened', {});
}

function disableChatbot() {
    // ... existing code ...
    logEvent('widget_disabled', {});
}
```

---

## 🔒 Security Considerations

### HTML Sanitization

✅ **Already implemented:**
```javascript
function sanitizeHTML(text) {
    const div = document.createElement('div');
    div.textContent = text;  // ← Uses textContent, not innerHTML
    return div.innerHTML;     // ← Safe re-serialization
}
```

### localStorage Security

✅ **Currently storing:**
- `wa_chatbot_disabled` - Boolean (true/false)
- `wa_chatbot_open` - Boolean (true/false)

❌ **Never store:**
- User personal info
- Chat history
- Authentication tokens
- Sensitive school data

### Content Security

**The chatbot only:**
- ✅ Responds to school-related questions
- ✅ Routes unknown questions to staff
- ✅ Never provides medical advice
- ✅ Never provides personal recommendations

**To add content filtering in v3.0:**
```javascript
function isSafeQuestion(question) {
    const blockedWords = ['password', 'ssn', 'credit card'];
    const q = question.toLowerCase();
    return !blockedWords.some(word => q.includes(word));
}
```

---

## 📱 Responsive Breakpoints

**Desktop (1920px+):** Full widget, label on hover
**Laptop (1024px):** Standard layout
**Tablet (768px):** Adjusted spacing, full-width widget
**Mobile (375px):** Nearly full-width, above launcher
**Small Mobile (320px):** Full width, minimal padding

No custom breakpoints needed - CSS media queries already handle all devices.

---

## ♿ Accessibility Features

Already implemented:
- ✅ Semantic HTML (header, footer, role="region")
- ✅ ARIA labels on all buttons
- ✅ aria-expanded for open/close state
- ✅ aria-live="polite" for messages
- ✅ Keyboard navigation (Tab, Shift+Tab, Enter, Escape)
- ✅ Focus visible on all interactive elements
- ✅ Color contrast WCAG AA compliant
- ✅ 44px minimum touch targets

---

## 🚀 Deployment to Finalsite

### Option 1: Embed as iFrame

```html
<iframe
    src="https://yourserver.com/wayland-chatbot/index.html"
    width="100%"
    height="600"
    frameborder="0"
    allow="localStorage"
    sandbox="allow-same-origin allow-scripts allow-popups"
    title="Wayland Academy Chat Assistant"
></iframe>
```

### Option 2: Embed Inline Script

```html
<div id="wa-chatbot-root"></div>
<script src="https://yourserver.com/wayland-chatbot/index.html"></script>
```

### Option 3: Copy-Paste HTML

- Copy entire `index.html` content
- Paste into Finalsite's custom HTML block
- Test thoroughly
- Verify kill switch works

---

## 🔍 Testing Before Deployment

1. **Local:** Open index.html directly in browser
2. **Staging:** Test on Finalsite test page
3. **Cross-browser:** Chrome, Firefox, Safari, Edge
4. **Responsive:** Desktop, tablet, mobile
5. **Accessibility:** Keyboard nav, screen reader (if available)
6. **Kill switch:** Disable/enable persists after refresh
7. **Performance:** No console errors, smooth animations
8. **Security:** No XSS vulnerabilities, safe HTML sanitization

---

## 📚 Future Enhancements (v3.0+)

1. **Real AI Integration** - Replace keyword matching with NLP/LLM
2. **Analytics Dashboard** - Track popular questions, user engagement
3. **Multi-language** - Spanish, French, Mandarin support
4. **Chat History** - Store conversations (with consent)
5. **Admin Panel** - Update FAQ without code changes
6. **Voice Support** - "Hey Wayland..." voice commands
7. **Mobile App** - Native iOS/Android wrapper

---

## 🆘 Troubleshooting

### Widget not opening
- Check browser console for errors (F12)
- Verify JavaScript enabled
- Try different browser
- Clear localStorage: DevTools → Storage → localStorage → delete entry

### Messages not appearing
- Check that KNOWLEDGE_BASE is populated
- Verify sanitizeHTML() not breaking content
- Test with simple question: "hello"

### Kill switch not persisting
- Ensure localStorage enabled (not in private mode)
- Check DevTools → Storage → localStorage
- Try normal (non-private) browsing mode

### Styling looks wrong
- Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
- Check that CSS loaded (Network tab in DevTools)
- Verify no browser extensions blocking styles
- Try different browser

### Mobile layout broken
- Test viewport width (Chrome DevTools → Toggle Device Toolbar)
- Check media query breakpoints
- Verify no conflicting parent styles
- Test on actual device if possible

---

## 📞 Support Resources

**For Customization Questions:**
- MDN Web Docs: https://developer.mozilla.org
- CSS Tricks: https://css-tricks.com
- Stack Overflow: Search "[issue] chatbot javascript"

**For School-Specific Content:**
- Contact your school IT department
- Verify all facts before adding to FAQ
- Get school approval before deployment

---

This guide covers all common customizations. For advanced modifications, refer to the inline code comments in index.html.
