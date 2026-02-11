// ===== WAYLAND CHATBOT DEMO - JAVASCRIPT =====
// All functionality scoped to avoid global conflicts

(function() {
    'use strict';

    // ===== CONFIGURATION =====
    const CONFIG = {
        storageKey: 'waylandChatbotDisabled',
        botName: 'WA Bot',
        userName: 'You',
        suggestedPrompts: [
            "What grades does Wayland serve?",
            "Tell me about the daily schedule",
            "What clubs are available?",
            "Where is Wayland located?",
            "What happens if I'm sick?"
        ]
    };

    // ===== KNOWLEDGE BASE =====
    const KNOWLEDGE_BASE = [
        {
            intents: ['grade', 'grades', 'year', 'years', 'level', '9', '10', '11', '12', 'serve'],
            response: "Wayland Academy is a private boarding and day school serving grades 9–12. We welcome students from around the world to our campus in Beaver Dam, Wisconsin."
        },
        {
            intents: ['location', 'address', 'where', 'find', 'beaver dam', 'wisconsin'],
            response: "Wayland Academy is located at 101 North University Avenue, Beaver Dam, WI 53916. We're in south-central Wisconsin, easily accessible from Madison and Milwaukee."
        },
        {
            intents: ['phone', 'contact', 'call', 'number', 'reach'],
            response: "You can reach Wayland Academy at our main phone: 920-356-2120. For admissions inquiries specifically, call 800-860-7725. We're happy to help!"
        },
        {
            intents: ['boarding', 'day student', 'live', 'campus', 'residential', 'dorm'],
            response: "Approximately 70% of Wayland students live on campus in our residence halls. We're proud to be both a boarding and day school, offering flexibility for families."
        },
        {
            intents: ['schedule', 'daily', 'day', 'classes', 'time', 'block', 'a/b', 'ab', 'rotation'],
            response: "Wayland uses an A/B week schedule with block rotation, providing deeper learning in each class period. We have designated free time from 5:45–8:00 pm, followed by mandatory study hall Sunday through Thursday from 8:00–9:30 pm."
        },
        {
            intents: ['study hall', 'homework', 'evening', 'night'],
            response: "Study hall is mandatory Sunday through Thursday from 8:00–9:30 pm. This structured time helps all students stay on top of their academics and develop strong study habits."
        },
        {
            intents: ['myblock', 'my block', 'enrichment', 'independent'],
            response: "MyBlock is a special time in our schedule for independent study, clubs, enrichment activities, or meeting with teachers. It's a great opportunity to explore interests and get extra help when needed."
        },
        {
            intents: ['assembly', 'chapel', 'monday', 'friday', 'gathering'],
            response: "We gather as a community for Assembly on Mondays and Chapel on Fridays. These are important traditions that bring our diverse student body together."
        },
        {
            intents: ['club', 'clubs', 'activities', 'extracurricular', 'robotics', 'sewing', 'theater', 'model un', 'thespian'],
            response: "Wayland offers diverse clubs including Robotics Club, Sewing Club, Model UN, Thespian Society, and many more! These activities run during free time and MyBlock. Check with Student Life for the complete list."
        },
        {
            intents: ['robotics', 'robot', 'stem'],
            response: "Robotics Club is one of our popular STEM activities! Students design, build, and compete with robots. It's a great way to develop engineering and teamwork skills."
        },
        {
            intents: ['sewing', 'fashion', 'clothing'],
            response: "Sewing Club welcomes students interested in fashion, design, and textile arts. No prior experience necessary—just bring your creativity!"
        },
        {
            intents: ['theater', 'theatre', 'drama', 'acting', 'thespian', 'play', 'musical'],
            response: "Thespian Society is perfect for students passionate about theater! We produce plays and musicals throughout the year and welcome actors, technical crew, and everyone in between."
        },
        {
            intents: ['dining', 'food', 'meal', 'cafeteria', 'eat', 'lunch', 'dinner', 'breakfast'],
            response: "Our dining services support many dietary needs. For specific restrictions or allergies, students and families should work directly with the Health Center to ensure proper accommodations."
        },
        {
            intents: ['allergy', 'allergies', 'dietary', 'vegetarian', 'vegan', 'gluten'],
            response: "We accommodate various dietary needs and restrictions. Please contact the Health Center directly to discuss specific allergies or dietary requirements. Your health and safety are our priority."
        },
        {
            intents: ['sick', 'ill', 'illness', 'not feeling well', 'health center', 'nurse', 'doctor'],
            response: "If you're sick and missing classes, please go to the Health Center—don't stay in your room. The Health Center is open Monday–Friday, 7:30 a.m.–3:30 p.m. and staff can provide care and notify your teachers."
        },
        {
            intents: ['health center', 'medical', 'healthcare', 'clinic'],
            response: "The Health Center is your resource for medical needs, illness management, and dietary accommodations. Hours are Monday–Friday, 7:30 a.m.–3:30 p.m. For emergencies outside these hours, contact your dorm parent or on-duty staff."
        },
        {
            intents: ['tradition', 'traditions', 'event', 'events', 'parade of nations', 'parade'],
            response: "Wayland has wonderful traditions including our annual Parade of Nations, celebrating the diversity of our international community. Throughout the year, we host many special events that build school spirit!"
        },
        {
            intents: ['weekend', 'saturday', 'sunday', 'free time'],
            response: "Weekends offer time for relaxation, activities, and exploring the area. Free time during the week is 5:45–8:00 pm. Student Life organizes weekend trips and on-campus events throughout the year."
        },
        {
            intents: ['admission', 'admissions', 'apply', 'application', 'enroll'],
            response: "For admissions questions, please call our dedicated admissions line at 800-860-7725. The admissions team can guide you through the application process and answer specific enrollment questions."
        },
        {
            intents: ['tuition', 'cost', 'price', 'financial', 'scholarship', 'aid'],
            response: "For tuition, financial aid, and scholarship information, please contact our Admissions office at 800-860-7725. They can provide detailed information and discuss options for your family."
        },
        {
            intents: ['thank', 'thanks', 'appreciate'],
            response: "You're very welcome! I'm here to help. If you have more questions, feel free to ask or contact the main office at 920-356-2120."
        },
        {
            intents: ['hi', 'hello', 'hey', 'greetings'],
            response: "Hello! Welcome to Wayland Academy's information assistant. I can help answer questions about our schedule, clubs, residence life, and more. What would you like to know?"
        }
    ];

    // ===== DOM ELEMENTS =====
    const elements = {
        container: document.getElementById('waChatbotContainer'),
        mainInterface: document.getElementById('waChatbotMain'),
        killScreen: document.getElementById('waKillScreen'),
        messages: document.getElementById('waChatMessages'),
        suggestions: document.getElementById('waSuggestions'),
        userInput: document.getElementById('waUserInput'),
        sendBtn: document.getElementById('waSendBtn'),
        killSwitchBtn: document.getElementById('waKillSwitchBtn'),
        reactivateBtn: document.getElementById('waReactivateBtn')
    };

    // ===== UTILITY FUNCTIONS =====
    function getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    }

    function sanitizeHTML(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function scrollToBottom() {
        elements.messages.scrollTop = elements.messages.scrollHeight;
    }

    // ===== MESSAGE HANDLING =====
    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `wa-chatbot-message ${isUser ? 'wa-chatbot-message-user' : 'wa-chatbot-message-bot'}`;

        const avatar = document.createElement('div');
        avatar.className = 'wa-chatbot-avatar';
        avatar.textContent = isUser ? 'Y' : 'WA';
        avatar.setAttribute('aria-hidden', 'true');

        const content = document.createElement('div');
        content.className = 'wa-chatbot-message-content';

        const bubble = document.createElement('div');
        bubble.className = 'wa-chatbot-message-bubble';
        bubble.innerHTML = sanitizeHTML(text);

        const time = document.createElement('div');
        time.className = 'wa-chatbot-message-time';
        time.textContent = getCurrentTime();

        content.appendChild(bubble);
        content.appendChild(time);

        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);

        elements.messages.appendChild(messageDiv);

        setTimeout(scrollToBottom, 100);
    }

    // ===== INTENT MATCHING =====
    function findBestMatch(userInput) {
        const input = userInput.toLowerCase().trim();

        for (const qa of KNOWLEDGE_BASE) {
            for (const intent of qa.intents) {
                if (input.includes(intent.toLowerCase())) {
                    return qa.response;
                }
            }
        }

        return null;
    }

    function getDefaultResponse() {
        return "I don't have information about that specific question yet. For detailed or official information, please contact:\n\n" +
               "• Main Office: 920-356-2120\n" +
               "• Admissions: 800-860-7725\n\n" +
               "I'm still learning and this is a prototype. A real person at Wayland can give you the most accurate answer!";
    }

    // ===== USER INTERACTION =====
    function handleUserMessage() {
        const userText = elements.userInput.value.trim();

        if (!userText) return;

        addMessage(userText, true);
        elements.userInput.value = '';

        setTimeout(() => {
            const response = findBestMatch(userText) || getDefaultResponse();
            addMessage(response, false);
        }, 500);
    }

    function handleSuggestionClick(suggestionText) {
        elements.userInput.value = suggestionText;
        handleUserMessage();
    }

    // ===== KILL SWITCH =====
    function disableChatbot() {
        elements.mainInterface.classList.add('wa-chatbot-hidden');
        elements.killScreen.classList.add('wa-chatbot-active');
        localStorage.setItem(CONFIG.storageKey, 'true');
    }

    function enableChatbot() {
        elements.mainInterface.classList.remove('wa-chatbot-hidden');
        elements.killScreen.classList.remove('wa-chatbot-active');
        localStorage.removeItem(CONFIG.storageKey);
    }

    function checkKillSwitchState() {
        if (localStorage.getItem(CONFIG.storageKey) === 'true') {
            disableChatbot();
        }
    }

    // ===== INITIALIZATION =====
    function renderSuggestions() {
        CONFIG.suggestedPrompts.forEach(prompt => {
            const chip = document.createElement('button');
            chip.className = 'wa-chatbot-suggestion-chip';
            chip.textContent = prompt;
            chip.setAttribute('aria-label', `Ask: ${prompt}`);
            chip.addEventListener('click', () => handleSuggestionClick(prompt));
            elements.suggestions.appendChild(chip);
        });
    }

    function showWelcomeMessage() {
        setTimeout(() => {
            addMessage(
                "Welcome to Wayland Academy! I'm here to help answer your questions about our school. " +
                "Try clicking a suggested question below, or type your own question about our schedule, clubs, residence life, and more!",
                false
            );
        }, 300);
    }

    function attachEventListeners() {
        elements.sendBtn.addEventListener('click', handleUserMessage);

        elements.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleUserMessage();
            }
        });

        elements.killSwitchBtn.addEventListener('click', disableChatbot);
        elements.reactivateBtn.addEventListener('click', enableChatbot);
    }

    function init() {
        checkKillSwitchState();
        renderSuggestions();
        showWelcomeMessage();
        attachEventListeners();
    }

    // Start the chatbot
    init();

})();