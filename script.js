       // For circuit lines
       function createCircuitLines() {
        const container = document.getElementById('circuitLines');
        const lineCount = 15;
        
        for (let i = 0; i < lineCount; i++) {
            const line = document.createElement('div');
            line.classList.add('circuit-line');
            
            // Random properties (for background)
            const top = Math.random() * 100;
            const width = Math.random() * 100 + 50;
            const delay = Math.random() * 5;
            const duration = Math.random() * 5 + 5;
            
            line.style.top = `${top}%`;
            line.style.width = `${width}%`;
            line.style.animationDelay = `${delay}s`;
            line.style.animationDuration = `${duration}s`;
            
            container.appendChild(line);
        }
    }
    
    // For data nodes
    function createDataNodes() {
        const container = document.getElementById('dataNodes');
        const nodeCount = 30;
        
        for (let i = 0; i < nodeCount; i++) {
            const node = document.createElement('div');
            node.classList.add('data-node');
            
            // Random properties
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const delay = Math.random() * 3;
            const duration = Math.random() * 2 + 2;
            
            node.style.left = `${left}%`;
            node.style.top = `${top}%`;
            node.style.animationDelay = `${delay}s`;
            node.style.animationDuration = `${duration}s`;
            
            container.appendChild(node);
        }
    }
    
    // For binary rain
    function createBinaryRain() {
        const container = document.getElementById('binaryRain');
        const columnCount = 20;
        
        for (let i = 0; i < columnCount; i++) {
            const column = document.createElement('div');
            column.classList.add('binary-column');
            
            // Random properties
            const left = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = Math.random() * 10 + 10;
            
            column.style.left = `${left}%`;
            column.style.animationDelay = `${delay}s`;
            column.style.animationDuration = `${duration}s`;
            
            // Adding binary numbers
            let binaryContent = '';
            for (let j = 0; j < 30; j++) {
                binaryContent += Math.random() > 0.5 ? '1' : '0';
            }
            
            column.textContent = binaryContent;
            container.appendChild(column);
        }
    }
    
    // Terminal animation
    function animateTerminal() {
        const terminalLines = [
            { prompt: 'user@taskmate:~$', command: 'init taskmate', output: 'Initializing TaskMate AI... Success!' },
            { prompt: 'user@taskmate:~$', command: 'connect calendar', output: 'Google Calendar connected. Found 3 upcoming meetings.' },
            { prompt: 'user@taskmate:~$', command: 'analyze productivity', output: 'Analyzing workflow patterns...\n- Peak productivity hours: 9AM-12PM\n- Frequent interruptions detected\n- Recommendation: Enable Focus Mode during peak hours' },
            { prompt: 'user@taskmate:~$', command: 'automate "meeting followups"', output: 'Created automation:\n- After meetings, TaskMate will:\n  1. Send summary emails to attendees\n  2. Add action items to your task list\n  3. Schedule follow-up if needed' },
            { prompt: 'user@taskmate:~$', command: 'optimize schedule', output: 'Optimizing your calendar...\n- Moved 2 low-priority meetings\n- Created 3 focus blocks\n- Scheduled breaks between intense work sessions' },
            { prompt: 'user@taskmate:~$', command: '', output: '' }
        ];
        
        const terminalBody = document.getElementById('terminalBody');
        let lineIndex = 0;
        let charIndex = 0;
        let isPrompt = true;
        let currentLine = 0;
        
        function typeTerminal() {
            if (lineIndex >= terminalLines.length) {
                lineIndex = 0;
                setTimeout(() => {
                    terminalBody.innerHTML = '';
                    currentLine = 0;
                    typeTerminal();
                }, 3000);
                return;
            }
            
            const line = terminalLines[lineIndex];
            
            if (currentLine === lineIndex) {
                if (isPrompt) {
                    if (charIndex === 0) {
                        const lineDiv = document.createElement('div');
                        lineDiv.classList.add('terminal-line');
                        lineDiv.id = `line-${lineIndex}`;
                        terminalBody.appendChild(lineDiv);
                    }
                    
                    const lineDiv = document.getElementById(`line-${lineIndex}`);
                    
                    if (charIndex < line.prompt.length) {
                        if (charIndex === 0) {
                            lineDiv.innerHTML = `<span class="terminal-prompt"></span>`;
                        }
                        const promptSpan = lineDiv.querySelector('.terminal-prompt');
                        promptSpan.textContent = line.prompt.substring(0, charIndex + 1);
                        charIndex++;
                        setTimeout(typeTerminal, Math.random() * 50 + 30);
                    } else {
                        isPrompt = false;
                        charIndex = 0;
                        setTimeout(typeTerminal, 500);
                    }
                } else {
                    const lineDiv = document.getElementById(`line-${lineIndex}`);
                    
                    if (line.command && charIndex < line.command.length) {
                        if (charIndex === 0) {
                            lineDiv.innerHTML += `<span class="terminal-command"></span>`;
                        }
                        const commandSpan = lineDiv.querySelector('.terminal-command');
                        commandSpan.textContent = line.command.substring(0, charIndex + 1);
                        charIndex++;
                        setTimeout(typeTerminal, Math.random() * 50 + 30);
                    } else if (line.output && charIndex === 0) {
                        lineDiv.innerHTML += `<span class="terminal-cursor"></span>`;
                        setTimeout(() => {
                            lineDiv.removeChild(lineDiv.lastChild);
                            const outputDiv = document.createElement('div');
                            outputDiv.classList.add('terminal-output');
                            outputDiv.textContent = line.output;
                            terminalBody.appendChild(outputDiv);
                            charIndex = 0;
                            isPrompt = true;
                            lineIndex++;
                            currentLine = lineIndex;
                            setTimeout(typeTerminal, 1000);
                        }, 1000);
                    } else {
                        charIndex = 0;
                        isPrompt = true;
                        lineIndex++;
                        currentLine = lineIndex;
                        setTimeout(typeTerminal, 500);
                    }
                }
            }
        }
        
        // Intialising the terminal animation
        setTimeout(typeTerminal, 1500);
    }
    
    // Typing effect for the #hero section
    const words = ["PRODUCTIVITY", "EFFICIENCY", "WORKFLOW", "FOCUS"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingElement = document.querySelector('.typing-effect');
    
    function type() {
        const currentWord = words[wordIndex];
        const currentChar = currentWord.substring(0, charIndex);
        typingElement.textContent = currentChar;
        
        if (!isDeleting && charIndex < currentWord.length) {
            charIndex++;
            setTimeout(type, 100);
        } else if (isDeleting && charIndex > 0) {
            charIndex--;
            setTimeout(type, 50);
        } else {
            isDeleting = !isDeleting;
            if (!isDeleting) {
                wordIndex = (wordIndex + 1) % words.length;
            }
            setTimeout(type, 1000);
        }
    }
    
    // Initialize all effects
    document.addEventListener('DOMContentLoaded', () => {
        createCircuitLines();
        createDataNodes();
        createBinaryRain();
        animateTerminal();
        type();
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
        
        // Add hover effects to cards
        const cards = document.querySelectorAll('.feature-card, .pricing-card');
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
        });
    });