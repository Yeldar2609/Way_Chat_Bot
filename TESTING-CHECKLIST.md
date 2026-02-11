# Wayland Chatbot Demo v2.0 - Testing Checklist

## Pre-Launch QA

### Browser & Device Testing
- [ ] **Desktop Chrome** - All features functional, no console errors
- [ ] **Desktop Firefox** - All features functional, no console errors
- [ ] **Desktop Safari** - All features functional, no console errors
- [ ] **Mobile iOS Safari** - Responsive layout, touch targets 44px+
- [ ] **Mobile Android Chrome** - Responsive layout, touch targets 44px+
- [ ] **Tablet (iPad)** - Widget scales appropriately

### Launcher Functionality
- [ ] Launcher appears in bottom-right corner
- [ ] Launcher button has red gradient background
- [ ] Green "online" dot pulses at bottom-right of launcher
- [ ] "Chat with us!" label appears on hover (desktop)
- [ ] Label hides on small screens (mobile)
- [ ] Click launcher opens widget with smooth animation
- [ ] Click launcher again closes widget with smooth animation
- [ ] Widget closes when Escape key pressed
- [ ] Icon shows person emoji (👤)

### Widget Panel - Header
- [ ] Title reads "Wayland Academy"
- [ ] Subtitle reads "Assistant"
- [ ] "Demo v2.0" badge appears
- [ ] Disable button present and accessible
- [ ] Header has red gradient background
- [ ] All text readable with good contrast

### Widget Panel - Warning Banner
- [ ] Warning banner appears below header
- [ ] Text reads: "⚠️ Prototype demo. Official answers should be confirmed with school offices."
- [ ] Banner background is cream-colored
- [ ] Banner visible at all times

### Chat Functionality
- [ ] Widget shows welcome message on first open
- [ ] User message appears on right side with green background
- [ ] Bot message appears on left side with white background and border
- [ ] Messages auto-scroll to show newest
- [ ] Each message shows timestamp
- [ ] Avatars show: Bot = "WA", User = "Y"
- [ ] Message bubbles have appropriate rounded corners
- [ ] No console errors when messages added

### Suggested Prompts
- [ ] 5 suggestion chips appear below messages
- [ ] Click chip auto-fills input and sends question
- [ ] Response appears from bot
- [ ] Chips have visible focus style for keyboard navigation

### Input & Send
- [ ] Input field has focus ring
- [ ] Send button has red gradient background
- [ ] Click Send button submits message
- [ ] Press Enter key submits message
- [ ] Input clears after message sent

### FAQ Testing

#### School Basics
- [ ] "What grades does Wayland serve?" → Returns grades 9-12
- [ ] "Where is Wayland located?" → Returns full address
- [ ] "How do I contact Wayland?" → Returns phone numbers

#### Schedule & Time
- [ ] "Tell me about daily schedule" → Returns A/B week, study hall
- [ ] "What is MyBlock?" → Returns enrichment time description
- [ ] "What about assembly and chapel?" → Returns correct days

#### Clubs & Activities
- [ ] "What clubs are available?" → Lists clubs
- [ ] "Tell me about robotics" → Mentions design and build
- [ ] "Tell me about sewing" → Mentions fashion and design
- [ ] "Tell me about theater" → Mentions Thespian Society

#### Residential Life
- [ ] "How many students live on campus?" → Returns ~70%

#### Health Services
- [ ] "What if I'm sick?" → Directs to Health Center
- [ ] "What are Health Center hours?" → Returns hours

#### Unknown Questions
- [ ] "What is the capital of France?" → Returns fallback with contact info

### Kill Switch (Disable Function)
- [ ] Click "Disable" button in header
- [ ] Widget shows "Assistant is currently disabled"
- [ ] All interactive elements become unresponsive
- [ ] Refresh page - widget remains disabled
- [ ] Kill switch state persists in localStorage
- [ ] Re-enable works and removes overlay

### Responsive Behavior

#### Desktop (1920px+)
- [ ] Widget positioned bottom-right
- [ ] Width approximately 420px
- [ ] Launcher label visible on hover

#### Tablet (768px)
- [ ] Widget width responsive
- [ ] Touch targets 44px minimum

#### Mobile (375px - 768px)
- [ ] Widget spans almost full width
- [ ] Widget positioned above launcher
- [ ] Launcher label hidden
- [ ] All touch targets 44px+

#### Small Mobile (320px)
- [ ] Widget spans full width
- [ ] All text readable
- [ ] No horizontal scroll

### Accessibility Testing

#### Keyboard Navigation
- [ ] Tab moves focus through all interactive elements
- [ ] Shift+Tab reverses tab order
- [ ] All focused elements have visible outline
- [ ] Outline color contrasts with background

#### Color Contrast
- [ ] Button text readable on red gradient (white on red)
- [ ] Message text readable (dark on white, white on red)
- [ ] Warning banner text readable (brown on cream)

### Animation Testing
- [ ] Launcher pulse animation smooth
- [ ] Widget open/close animations smooth
- [ ] Message fade-in smooth
- [ ] Hover transitions smooth

### Performance Testing
- [ ] Page loads quickly (< 2s)
- [ ] No jank when typing
- [ ] Scrolling smooth in message area
- [ ] Open/close multiple times - still works
- [ ] Send 20+ messages - still responsive

### Security Testing
- [ ] localStorage working correctly
- [ ] No sensitive data in localStorage
- [ ] User input properly sanitized
- [ ] Widget styles don't affect page outside widget
- [ ] No global CSS pollution

### Before Demo Day

- [ ] Test on actual demo computer
- [ ] Test internet connection
- [ ] Browser zoom at 100%
- [ ] Close other browser tabs
- [ ] Take final screenshots
- [ ] Have backup (screenshots, PDF)

## Sign-Off

**Tested By:** [Your Name]
**Date:** [Date]
**Pass/Fail:** PASS / FAIL

If any test fails, debug and retest before demo day!
