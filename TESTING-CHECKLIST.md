# Wayland Chatbot Demo v1 - Testing Checklist

## ✅ Pre-Demo Testing (Required)

### Core Functionality
- [ ] Open `wayland-chatbot-demo.html` in Chrome (works without server)
- [ ] Open in Firefox (cross-browser compatibility)
- [ ] Open in Safari (if available)
- [ ] Verify welcome message appears within 1 second
- [ ] Click each of the 5 suggested prompt chips - confirm auto-send works
- [ ] Type a question and click "Send" button - response appears
- [ ] Type a question and press Enter key - response appears
- [ ] Try empty input - nothing should happen (no error)

### Intent Matching (Test 10+ Queries)
- [ ] "What grades does Wayland serve?" → Grades 9-12 response
- [ ] "Where is the school located?" → Address response
- [ ] "What's the phone number?" → Contact info response
- [ ] "Tell me about clubs" → Clubs list response
- [ ] "What if I'm sick?" → Health Center guidance
- [ ] "A/B schedule" → Schedule explanation
- [ ] "study hall" → Study hall hours response
- [ ] "robotics club" → Robotics description
- [ ] "food allergies" → Dietary accommodation info
- [ ] "boarding students" → 70% boarding stat
- [ ] "random nonsense question" → Fallback with contact info

### Kill Switch
- [ ] Click "Kill Switch" button in header
- [ ] Chatbot hides, kill screen shows
- [ ] Refresh page - kill screen persists (localStorage check)
- [ ] Click "Reactivate Chatbot" button
- [ ] Chatbot returns, previous messages cleared
- [ ] Verify functionality works normally after reactivation

### UI/UX Polish
- [ ] Messages have timestamps
- [ ] User messages align right (blue background)
- [ ] Bot messages align left (white background)
- [ ] Messages animate in smoothly
- [ ] Auto-scroll to newest message works
- [ ] Warning banner is visible and readable
- [ ] Demo badge displays in header

### Responsive Design Testing

#### Desktop (1920x1080)
- [ ] Layout looks centered and professional
- [ ] All text is readable
- [ ] No horizontal scroll

#### Tablet (768x1024)
- [ ] Touch targets are large enough
- [ ] Suggestion chips wrap properly
- [ ] Messages scale appropriately

#### Mobile (375x667 - iPhone SE)
- [ ] Container takes full height
- [ ] Input area accessible above keyboard
- [ ] Message bubbles don't exceed 85% width
- [ ] All buttons are tappable

#### Small Mobile (320x568)
- [ ] Everything still functional
- [ ] No text cutoff
- [ ] Chips are smaller but readable

### Accessibility Testing
- [ ] Tab through all interactive elements (logical order)
- [ ] All buttons show focus outline when tabbed to
- [ ] Input field has proper focus state
- [ ] Screen reader can read aria-labels (if available)
- [ ] Color contrast is sufficient (text readable on all backgrounds)
- [ ] Enter key works in input field

## 🎯 Capstone Demo Preparation

### Screenshot/Presentation Checklist
- [ ] Take screenshot of initial state (welcome message visible)
- [ ] Take screenshot of active conversation (3-4 messages)
- [ ] Take screenshot of suggested prompts in use
- [ ] Take screenshot showing mobile view
- [ ] Take screenshot of kill switch screen
- [ ] Prepare 2-3 demo questions that show variety

### Demo Script Suggestions
1. "Let me show you the chatbot's welcome screen..."
2. "I'll click a suggested prompt about clubs..."
3. "Now I'll type a custom question about the schedule..."
4. "For safety, there's a kill switch that immediately disables it..."
5. "It handles unknown questions gracefully by routing to real staff..."

## 🔒 Safety & Embed Testing (Critical for Finalsite)

### Isolation Tests
- [ ] Inspect CSS classes - all prefixed with `wa-chatbot-`
- [ ] No global style pollution (body/html styles are scoped)
- [ ] View page source - no external CDN dependencies
- [ ] localStorage only uses `waylandChatbotDisabled` key (scoped)
- [ ] No console errors in browser DevTools

### Embed Simulation (Optional Advanced Test)
- [ ] Create a test HTML page with other content
- [ ] Embed the chatbot code in an iframe
- [ ] Verify chatbot doesn't break parent page styles
- [ ] Verify kill switch works in iframe context

## 📊 Content Accuracy Check

### Required Facts Present in Responses
- [ ] Grades 9-12 mentioned
- [ ] Correct address: 101 North University Avenue, Beaver Dam, WI 53916
- [ ] Correct phones: 920-356-2120 (main), 800-860-7725 (admissions)
- [ ] Free time: 5:45–8:00 pm
- [ ] Study hall: 8:00–9:30 pm (Sun-Thu)
- [ ] Health Center hours: Mon-Fri, 7:30 a.m.–3:30 p.m.
- [ ] ~70% boarding students
- [ ] Clubs: Robotics, Sewing, Model UN, Thespian Society mentioned
- [ ] Assembly Mondays, Chapel Fridays
- [ ] Parade of Nations tradition

## ⚠️ Common Issues to Watch For

- Input field doesn't clear after sending → Check `handleUserMessage()` function
- Messages don't scroll to bottom → Check `scrollToBottom()` timing
- Kill switch doesn't persist → Check localStorage browser support
- Suggestion chips don't work on mobile → Check touch event handling
- Text overflows on small screens → Check responsive breakpoints

## ✨ Bonus Points (Optional Enhancements)

- [ ] Test on school's actual computer/browser
- [ ] Show chatbot to teacher/advisor for feedback
- [ ] Test on a tablet device
- [ ] Verify works offline (no network required)
- [ ] Show peer the kill switch feature

---

## 🚀 Pre-Submission Final Check

Before submitting for capstone review:
1. **Functionality**: All core features work
2. **Professional Look**: UI is polished, not buggy
3. **Safety**: Kill switch tested and working
4. **Content**: All school facts are accurate
5. **Documentation**: This checklist is completed
6. **Backup**: Files are saved in multiple locations

**Testing Status**: _____ / _____ items completed

**Ready for Demo**: ☐ Yes ☐ Needs fixes

**Notes**:
_____________________________________________________________________________
_____________________________________________________________________________
_____________________________________________________________________________