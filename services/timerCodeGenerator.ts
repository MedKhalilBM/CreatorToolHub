

import { TimerSettings } from '../types';

const getBackgroundValue = (isGradient: boolean, color1: string, color2: string, angle: number) => {
  return isGradient ? `linear-gradient(${angle}deg, ${color1}, ${color2})` : color1;
};

export const generateTimerHTML = (settings: TimerSettings): string => {
  return `
<div id="timer-container" class="layout-${settings.layout}">
    <div id="timer-display">00:00:00</div>
    <div id="end-time-display"></div>
</div>
`;
};

export const generateTimerCSS = (settings: TimerSettings): string => {
  const bg = getBackgroundValue(settings.backgroundColorIsGradient, settings.backgroundColor, settings.backgroundColor2, settings.backgroundColorAngle);

  return `
@import url('https://fonts.googleapis.com/css2?family=${settings.fontFamily.replace(/ /g, '+')}:wght@400;600;800&display=swap');

:root {
    --font-family: '${settings.fontFamily}', sans-serif;
    --text-color: ${settings.textColor};
    --bg-color: ${bg};
    --border-color: ${settings.borderColor};
    --border-width: ${settings.borderWidth}px;
    --corner-radius: ${settings.cornerRadius}px;
    --font-size: ${settings.fontSize}px;
    --end-time-color: ${settings.endTimeColor};
}

body, html {
    height: 100%;
    margin: 0;
    overflow: hidden;
    font-family: var(--font-family);
}

#timer-container {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px 40px;
    box-sizing: border-box;
    transition: all 0.3s ease;
}

#timer-display {
    color: var(--text-color);
    font-size: var(--font-size);
    font-weight: 800;
    font-variant-numeric: tabular-nums;
    line-height: 1;
    text-shadow: ${settings.textShadow ? '2px 2px 0px rgba(0,0,0,0.5)' : 'none'};
}

#end-time-display {
    margin-top: 8px;
    color: var(--end-time-color);
    font-size: calc(var(--font-size) * 0.35);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    display: ${settings.showEndTime ? 'block' : 'none'};
}

/* Layout Styles */
.layout-digital {
    background: transparent;
    padding: 0;
}

.layout-box {
    background: var(--bg-color);
    border: var(--border-width) solid var(--border-color);
    border-radius: var(--corner-radius);
    box-shadow: 0 10px 25px rgba(0,0,0,0.3);
}

/* Animations */
@keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.05); } 100% { transform: scale(1); } }
.pulse-anim { animation: pulse 0.3s ease-out; }

@keyframes shake { 0% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } 100% { transform: translateX(0); } }
.shake-anim { animation: shake 0.4s ease-in-out; }
`;
};

export const generateTimerJS = (settings: TimerSettings): string => {
  const startSeconds = (settings.startTimeHours * 3600) + (settings.startTimeMinutes * 60) + settings.startTimeSeconds;
  
  return `
let remainingTime = ${startSeconds};
const mode = "${settings.mode}"; // countdown_add, countdown_sub
const platform = "${settings.platform}";
const capSeconds = ${settings.capHours * 3600};

// Event Values
const secPerSub = ${settings.secondsPerSub}; // Used for Twitch Sub OR YouTube Free Sub
const secPerTip = ${settings.secondsPerTip};
const secPerCheer = ${settings.secondsPerCheer}; // Twitch Only
const secPerFollow = ${settings.secondsPerFollow}; // Twitch Only
const secPerMember = ${settings.secondsPerMember}; // YouTube Only
const secPerSuperChat = ${settings.secondsPerSuperChat}; // YouTube Only

let timerInterval;

window.addEventListener('onWidgetLoad', function (obj) {
    const data = obj.detail.session.data;
    const storedTime = data['subathon-timer-val'];
    
    // Resume from storage if available, else use start
    if (storedTime !== undefined && storedTime !== null) {
        remainingTime = parseInt(storedTime, 10);
    }
    
    updateDisplay();
    startTimer();
});

window.addEventListener('onEventReceived', function (obj) {
    const listener = obj.detail.listener;
    const event = obj.detail.event;
    
    let addedSeconds = 0;
    
    if (platform === 'twitch') {
        if (listener === 'subscriber-latest' || listener === 'bulk-subscriber-latest') {
            const amount = event.bulkGifted ? event.amount : 1;
            addedSeconds = amount * secPerSub;
        } else if (listener === 'tip-latest') {
            addedSeconds = Math.floor(event.amount * secPerTip);
        } else if (listener === 'cheer-latest') {
            addedSeconds = Math.floor((event.amount / 100) * secPerCheer);
        } else if (listener === 'follower-latest') {
            addedSeconds = secPerFollow;
        }
    } else {
        // YouTube Logic
        if (listener === 'member-latest') {
            addedSeconds = secPerMember;
        } else if (listener === 'subscriber-latest') {
            // YouTube Subscriber is the free follow
            addedSeconds = secPerSub; 
        } else if (listener === 'superchat-latest') {
            // Super Chat typically comes with amount
            addedSeconds = Math.floor(event.amount * secPerSuperChat);
        } else if (listener === 'tip-latest') {
            addedSeconds = Math.floor(event.amount * secPerTip);
        }
    }
    
    if (addedSeconds > 0) {
        handleTimeChange(addedSeconds);
    }
});

function handleTimeChange(seconds) {
    const container = document.getElementById('timer-container');
    
    if (mode === 'countdown_sub') {
        // Boss Rush Mode: Events REMOVE time
        remainingTime -= seconds;
        container.classList.add('shake-anim');
        setTimeout(() => container.classList.remove('shake-anim'), 400);
    } else {
        // Standard Subathon: Events ADD time
        remainingTime += seconds;
        container.classList.add('pulse-anim');
        setTimeout(() => container.classList.remove('pulse-anim'), 300);
    }
    
    // Cap logic
    if (capSeconds > 0 && remainingTime > capSeconds) {
        remainingTime = capSeconds;
    }
    if (remainingTime < 0) remainingTime = 0;
    
    updateDisplay();
    SE_API.store.set('subathon-timer-val', remainingTime);
}

function startTimer() {
    if (timerInterval) clearInterval(timerInterval);
    
    timerInterval = setInterval(() => {
        // Countdown
        if (remainingTime > 0) {
            remainingTime--;
        } else {
            // Timer finished
            remainingTime = 0;
        }
        
        updateDisplay();
        
        // Save every 10s to reduce spam
        if (remainingTime % 10 === 0) {
             SE_API.store.set('subathon-timer-val', remainingTime);
        }
        
    }, 1000);
}

function updateDisplay() {
    const display = document.getElementById('timer-display');
    const endTimeDisplay = document.getElementById('end-time-display');
    
    const h = Math.floor(remainingTime / 3600);
    const m = Math.floor((remainingTime % 3600) / 60);
    const s = remainingTime % 60;
    
    const fmt = (n) => n.toString().padStart(2, '0');
    display.innerText = \`\${fmt(h)}:\${fmt(m)}:\${fmt(s)}\`;
    
    // Calculate End Time
    if (endTimeDisplay.style.display !== 'none') {
        if (remainingTime === 0) {
            endTimeDisplay.innerText = 'ENDED';
        } else {
            const now = new Date();
            const end = new Date(now.getTime() + remainingTime * 1000);
            endTimeDisplay.innerText = 'ENDS ' + end.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
        }
    }
}
`;
};

export const generateTimerData = (settings: TimerSettings): string => {
  return JSON.stringify(settings, null, 2);
};