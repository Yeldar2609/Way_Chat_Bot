# Wayland Academy Chatbot Demo v1.0

> A safe, polished, capstone demo website for a school chatbot prototype

---

## 🎯 Project Overview

This is a fully functional chatbot demonstration built for a high school capstone project. It showcases a professional UI with scripted FAQ responses about Wayland Academy, designed with safety and embeddability in mind for potential future deployment on the school's Finalsite website.

**Key Features:**
- 20+ pre-programmed Q&A responses covering school basics, schedule, clubs, health services, and more
- Professional, responsive design (mobile to desktop)
- Kill switch for instant disable/enable
- Safe fallback handling for unknown questions
- No external dependencies (runs offline)
- Isolated code safe for embedding

---

## 📁 File Structure

```
project/
├── wayland-chatbot-demo.html          # Single-file version (recommended for demo)
├── demo-split/                         # Three-file version (easier to edit)
│   ├── index.html                      # HTML structure
│   ├── styles.css                      # All styles
│   └── script.js                       # All JavaScript
├── TESTING-CHECKLIST.md                # Comprehensive testing guide
├── NEXT-ITERATION-ROADMAP.md           # V2.0 planning document
└── README-WAYLAND-DEMO.md              # This file
```

---

## 🚀 Quick Start

### Option 1: Single-File Version (Easiest)
1. Open `wayland-chatbot-demo.html` in any modern web browser
2. No server required, no installation needed
3. Perfect for taking screenshots and presenting

### Option 2: Three-File Version (Better for Editing)
1. Open `demo-split/index.html` in your browser
2. Edit CSS in `styles.css` if you want to change colors/styling
3. Edit responses in `script.js` in the `KNOWLEDGE_BASE` array

---

## 💬 What the Chatbot Knows

### Topics Covered (20+ Q&A pairs):
1. **School Basics**: Grades served, location, contact information
2. **Schedule**: A/B week system, study hall hours, free time
3. **MyBlock**: Independent study and enrichment time
4. **Clubs & Activities**: Robotics, Sewing, Model UN, Thespian Society
5. **Dining**: Dietary accommodations and allergy management
6. **Health Services**: Health Center hours and when to visit
7. **Residence Life**: Boarding vs. day students, dorm information
8. **Traditions**: Parade of Nations, Assembly, Chapel
9. **Admissions**: Contact routing for enrollment questions
10. **Weekend Life**: Free time and campus events

### Example Questions You Can Ask:
- "What grades does Wayland serve?"
- "Where is the school located?"
- "Tell me about the clubs"
- "What if I'm sick?"
- "What's the daily schedule like?"
- "Are there robotics activities?"
- "How many students live on campus?"

---

## 🎨 Design Features

### Visual Design:
- **Color Scheme**: Professional blue gradient (school colors adaptable)
- **Typography**: System fonts for fast loading and readability
- **Layout**: Clean card-based design with clear visual hierarchy
- **Animations**: Subtle message fade-ins for polish

### User Experience:
- **Suggested Prompts**: 5 clickable chips for quick questions
- **Timestamps**: All messages show time sent
- **Auto-scroll**: Messages automatically scroll to newest
- **Enter Key**: Works in addition to Send button
- **Loading Delay**: 500ms bot response delay feels natural

### Safety Features:
- **Kill Switch**: Prominent red button to instantly disable
- **Persistence**: Kill switch state saved in localStorage
- **Warning Banner**: Clear prototype disclaimer
- **Fallback Routing**: Unknown questions route to real staff
- **Contact Info**: Phone numbers provided in responses

---

## 📱 Responsive Breakpoints

| Device | Width | Adjustments |
|--------|-------|-------------|
| Desktop | 1920px+ | Centered, max-width container |
| Laptop | 1024px - 1920px | Standard layout |
| Tablet | 768px - 1024px | Slightly condensed |
| Mobile | 375px - 768px | Full screen, larger touch targets |
| Small Mobile | 320px - 375px | Minimal padding, smaller chips |

---

## ♿ Accessibility Features

- Semantic HTML5 structure
- ARIA labels on interactive elements
- Keyboard navigation support (Tab through all controls)
- Visible focus states on all buttons/inputs
- Sufficient color contrast ratios (WCAG AA compliant)
- Enter key support for form submission

---

## 🔧 Customization Guide

### Change Colors:
**Edit the CSS variables in the `<style>` section:**

```css
/* Header gradient */
background: linear-gradient(135deg, #004d99 0%, #0066cc 100%);

/* Message bubbles */
.wa-chatbot-message-user .wa-chatbot-message-bubble {
    background: #0066cc;  /* Change this */
}
```

### Add New Q&A Pairs:
**Edit the `KNOWLEDGE_BASE` array in the JavaScript section:**

```javascript
{
    intents: ['keyword1', 'keyword2', 'phrase'],
    response: "Your bot response here with accurate school information."
}
```

### Change Suggested Prompts:
**Edit the `CONFIG.suggestedPrompts` array:**

```javascript
suggestedPrompts: [
    "Your first suggested question",
    "Your second suggested question",
    // Add up to 5 total
]
```

### Modify Welcome Message:
**Find the `showWelcomeMessage()` function and edit the text:**

```javascript
addMessage(
    "Your custom welcome message here!",
    false
);
```

---

## 🛡️ Safety & Embed Considerations

### Why It's Safe for Finalsite:

1. **Namespaced Classes**: All CSS uses `wa-chatbot-` prefix
2. **No Global Pollution**: Styles don't affect parent page
3. **Scoped JavaScript**: Wrapped in IIFE (Immediately Invoked Function Expression)
4. **localStorage Scoping**: Only uses one key: `waylandChatbotDisabled`
5. **No External Dependencies**: No CDN calls that could break
6. **Kill Switch**: Can be disabled instantly if issues arise

### Pre-Embed Checklist:
- [ ] Test in isolation (current state)
- [ ] Test in an iframe on a test page
- [ ] Verify no console errors
- [ ] Get IT department approval
- [ ] Have rollback plan ready
- [ ] Test kill switch functionality

---

## 📸 Taking Demo Screenshots

**Recommended Screenshots for Presentation:**

1. **Initial State**: Welcome message showing, suggested prompts visible
2. **Active Conversation**: 3-4 messages back and forth
3. **Suggested Prompt in Action**: Click a chip, show the response
4. **Mobile View**: Screenshot from phone or responsive mode
5. **Kill Switch Screen**: Show the disable feature
6. **Fallback Response**: Ask something it doesn't know, show safe routing

**Tips:**
- Use Chrome DevTools (F12) for mobile screenshots
- Toggle Device Toolbar (Ctrl+Shift+M)
- Select "iPhone 12 Pro" or similar for realistic mobile view
- Take full-page screenshots, not just viewport

---

## 🐛 Troubleshooting

### Messages Not Appearing?
- Check browser console for JavaScript errors (F12)
- Ensure you're using a modern browser (Chrome, Firefox, Safari, Edge)
- Try clearing browser cache

### Kill Switch Not Persisting?
- Check if localStorage is enabled (some privacy modes disable it)
- Try in normal (non-incognito) browser window
- Check browser console for storage errors

### Suggested Chips Not Working?
- Verify JavaScript loaded (check Network tab in DevTools)
- Ensure no JavaScript syntax errors
- Try refreshing the page

### Styling Looks Broken?
- Ensure CSS loaded properly (check Network tab)
- Try hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
- Check for browser extensions blocking styles

---

## 📊 Demo Presentation Tips

### Structure Your Demo:
1. **Introduction** (30 seconds)
   - "This is a chatbot prototype for Wayland Academy..."
   - Explain capstone goal

2. **Feature Walkthrough** (2 minutes)
   - Show welcome message
   - Click a suggested prompt
   - Type a custom question
   - Show the kill switch
   - Display mobile view

3. **Technical Highlights** (1 minute)
   - No external dependencies
   - Safe for embedding
   - 20+ Q&A responses
   - Responsive design

4. **Future Vision** (1 minute)
   - Mention V2.0 plans (real AI integration)
   - Show awareness of limitations
   - Discuss school benefit

### Questions You Might Get:
- **Q: "How does it handle questions it doesn't know?"**
  - A: "It provides contact information for the appropriate office."

- **Q: "Can it learn from conversations?"**
  - A: "This version is scripted, but V2.0 would use AI that can learn."

- **Q: "Is it safe for the school website?"**
  - A: "Yes, it has a kill switch and isolated code. Also includes a prototype disclaimer."

- **Q: "How long did this take?"**
  - A: "The design and implementation took [X time], with research into school requirements."

---

## 📈 Version History

### v1.0 (Current)
- Initial capstone demo release
- 20+ scripted Q&A responses
- Responsive design (320px - 1920px+)
- Kill switch functionality
- Professional UI with suggestions
- Safe fallback handling
- Comprehensive documentation

### v2.0 (Planned - See Roadmap)
- Real AI integration (OpenAI/Anthropic/CustomGPT)
- Natural language understanding
- Learning from conversations
- Admin panel for content management
- Analytics dashboard
- Multi-turn context awareness

---

## 📞 Support & Resources

### For Capstone Project:
- **Advisor**: [Your advisor's name]
- **Testing Checklist**: See `TESTING-CHECKLIST.md`
- **Future Planning**: See `NEXT-ITERATION-ROADMAP.md`

### Technical Resources:
- **MDN Web Docs**: https://developer.mozilla.org
- **JavaScript Info**: https://javascript.info
- **CSS Tricks**: https://css-tricks.com

### School Coordination:
- **Wayland Main Office**: 920-356-2120
- **Admissions Office**: 800-860-7725
- **IT Department**: [contact if available]

---

## 📝 License & Usage

This demo was created as a capstone project for Wayland Academy. The code is provided as-is for educational and demonstration purposes.

**Wayland Academy** retains rights to:
- School name and branding
- All factual information about the school
- Logo and visual identity (if added)

**Developer** retains rights to:
- Code implementation
- Design patterns
- Technical architecture

For production deployment, coordinate with Wayland Academy IT department and obtain necessary approvals.

---

## 🎓 Credits

**Developed by**: [Your Name]
**Project Type**: High School Capstone Demo
**School**: Wayland Academy
**Date**: [Current Date]
**Version**: 1.0

**Technologies Used**:
- HTML5
- CSS3 (Flexbox, Grid, Animations)
- Vanilla JavaScript (ES6+)
- localStorage API
- Responsive Design

---

## ✨ Final Notes

This demo represents a **working prototype** suitable for capstone presentation and evaluation. It demonstrates:

✅ Technical proficiency in web development
✅ Understanding of user experience design
✅ Awareness of safety and security considerations
✅ Forward-thinking with V2.0 planning
✅ Attention to accessibility and responsiveness

**Good luck with your capstone presentation!** 🚀

---

*For questions or technical support, refer to the TESTING-CHECKLIST.md and NEXT-ITERATION-ROADMAP.md files included in this project.*