
import { GoalSettings, GoalLayout } from '../types';

const getBackgroundValue = (isGradient: boolean, color1: string, color2: string, angle: number) => {
  return isGradient ? `linear-gradient(${angle}deg, ${color1}, ${color2})` : color1;
};

export const generateGoalHTML = (settings: GoalSettings): string => {
  return `
<div id="goals-wrapper" class="${settings.layout}-layout mode-${settings.goalDisplayMode}"></div>

<!-- Templates -->
<template id="bar-template">
    <div class="goal-item-container">
        <div class="header-row">
            <div class="goal-text title"></div>
            <div class="goal-text amount"></div>
        </div>
        <div class="progress-bar-track">
            <div class="progress-bar-fill">
                <div class="stripes"></div>
                <div class="shine"></div>
            </div>
        </div>
    </div>
</template>
`;
};

export const generateGoalCSS = (settings: GoalSettings): string => {
  // Base fill is used for Unified mode in CSS
  const baseFill = getBackgroundValue(settings.fillColorIsGradient, settings.fillColor, settings.fillColor2, settings.fillColorAngle);

  return `
@import url('https://fonts.googleapis.com/css2?family=${settings.fontFamily.replace(/ /g, '+')}:wght@400;600;800&display=swap');

:root {
    --font-family: '${settings.fontFamily}', sans-serif;
    --text-color: ${settings.textColor};
    --track-color: ${settings.trackColor};
    /* Unified Fill Background (overridden inline if Custom mode) */
    --fill-background: ${baseFill};
    --border-color: ${settings.borderColor};
    --border-width: ${settings.borderWidth}px;
    --corner-radius: ${settings.cornerRadius}px;
    --bar-height: ${settings.barHeight}px;
}

body, html {
    height: 100%;
    margin: 0;
    overflow: hidden;
    font-family: var(--font-family);
    color: var(--text-color);
}

#goals-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px;
    box-sizing: border-box;
    gap: 20px;
}

.mode-stack {
    justify-content: flex-start; 
    padding-top: 20px;
}

.goal-item-container {
    width: 100%;
    opacity: 1;
    transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
    transform-origin: top center;
}

@keyframes slideUp { from { transform: translateY(0); } to { transform: translateY(-100%); opacity: 0; } }
@keyframes fadeOut { from { opacity: 1; transform: scale(1); } to { opacity: 0; transform: scale(0.9); } }
@keyframes barberpole { 100% { background-position: var(--bar-height) var(--bar-height); } }
@keyframes shineMove { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

.goal-item-container.animating-out { animation: fadeOut 0.5s forwards; }
.goal-item-container.future-goal-1 { opacity: 0.5; transform: scale(0.98); }
.goal-item-container.future-goal-2 { opacity: 0.25; transform: scale(0.96); }
.goal-item-container.future-goal-3 { opacity: 0.1; transform: scale(0.94); }

.goal-text { text-shadow: 1px 1px 2px rgba(0,0,0,0.8); font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; }
.title { font-size: 1.2em; margin-bottom: 4px; display: ${settings.showTitle ? 'block' : 'none'}; }
.amount { font-size: 1em; font-variant-numeric: tabular-nums; }

/* BAR */
.bar-layout .header-row { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 4px; }
.progress-bar-track {
    width: 100%; height: var(--bar-height); background: var(--track-color);
    border: var(--border-width) solid var(--border-color); border-radius: var(--corner-radius);
    overflow: hidden; position: relative; box-shadow: inset 0 2px 4px rgba(0,0,0,0.3);
}
.progress-bar-fill {
    height: 100%; width: 0%; background: var(--fill-background);
    border-radius: max(0px, calc(var(--corner-radius) - var(--border-width))); 
    transition: width 1s cubic-bezier(0.22, 1, 0.36, 1);
    position: relative; overflow: hidden;
}
.stripes {
    position: absolute; inset: 0;
    background-image: linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent);
    background-size: var(--bar-height) var(--bar-height);
    animation: barberpole 1s linear infinite;
    display: ${settings.useStripes ? 'block' : 'none'};
}
.shine {
    position: absolute; inset: 0; opacity: 0.6;
    background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%);
    background-size: 200% 100%; animation: shineMove 3s infinite linear;
}
`;
};

export const generateGoalJS = (settings: GoalSettings): string => {
  return `
let goals = ${JSON.stringify(settings.goals)};
let currentGoalIndex = 0;
let sessionTotal = 0; 
let startAmount = ${settings.startAmount};
const goalType = "${settings.type}";
const showPercentage = ${settings.showPercentage};
const showAmount = ${settings.showAmount};
const layout = "${settings.layout}";
const displayMode = "${settings.goalDisplayMode}";
const goalsToDisplay = ${settings.goalsToDisplay};

// Colors Config
const unifiedColors = ${settings.unifiedColors};
const globalFillIsGradient = ${settings.fillColorIsGradient};
const globalFillColor = "${settings.fillColor}";
const globalFillColor2 = "${settings.fillColor2}";
const globalAngle = ${settings.fillColorAngle};

window.addEventListener('onWidgetLoad', function (obj) {
    const sessionData = obj.detail.session.data;
    const key = goalType + '-total';
    const seTotal = sessionData[key] ? sessionData[key].count : 0;
    sessionTotal = startAmount + seTotal;
    renderGoals();
});

window.addEventListener('onEventReceived', function (obj) {
    if (!goals.length) return;
    const event = obj.detail.event;
    const listener = obj.detail.listener;
    let amount = 0;
    
    if (goalType === 'subscriber' && (listener === 'subscriber-latest' || listener === 'bulk-subscriber-latest')) {
         amount = event.bulkGifted ? event.amount : 1;
    } else if (goalType === 'follower' && listener === 'follower-latest') {
         amount = 1;
    } else if (goalType === 'tip' && listener === 'tip-latest') {
         amount = event.amount;
    } else if (goalType === 'cheer' && listener === 'cheer-latest') {
         amount = event.amount;
    }
    
    if (amount > 0) {
        sessionTotal += amount;
        updateGoalProgress();
    }
});

function renderGoals() {
    const container = document.getElementById('goals-wrapper');
    container.innerHTML = '';
    
    if (currentGoalIndex >= goals.length) {
        container.innerHTML = '<div style="display:flex; flex-direction:column; align-items:center; height:100%; justify-content:center; animation:bounceIn 1s;"><div style="color:var(--text-color); font-weight:900; font-size:2em; text-transform:uppercase;">Goal Completed!</div></div>';
        return;
    }
    
    let goalsToShow = [];
    if (displayMode === 'single') {
        if (goals[currentGoalIndex]) goalsToShow.push({ ...goals[currentGoalIndex], index: currentGoalIndex });
    } else {
        for (let i = 0; i < goalsToDisplay; i++) {
            const idx = currentGoalIndex + i;
            if (goals[idx]) goalsToShow.push({ ...goals[idx], index: idx });
        }
    }
    
    const templateId = 'bar-template';
    const template = document.getElementById(templateId);

    goalsToShow.forEach((goalObj, posIndex) => {
        const clone = template.content.cloneNode(true);
        const el = clone.querySelector('.goal-item-container');
        el.id = 'goal-item-' + goalObj.index;
        el.dataset.index = goalObj.index;
        
        if (posIndex > 0) el.classList.add('future-goal-' + Math.min(posIndex, 3));

        // RESOLVE COLORS
        let c1, c2, isGrad, angle;
        if (unifiedColors) {
            c1 = globalFillColor;
            c2 = globalFillColor2;
            isGrad = globalFillIsGradient;
            angle = globalAngle;
        } else {
            c1 = goalObj.fillColor || globalFillColor;
            c2 = goalObj.fillColor2 || globalFillColor2;
            isGrad = (goalObj.fillColorIsGradient !== undefined) ? goalObj.fillColorIsGradient : globalFillIsGradient;
            angle = goalObj.fillColorAngle || globalAngle;
        }

        let bgVal = isGrad ? \`linear-gradient(\${angle}deg, \${c1}, \${c2})\` : c1;
        el.querySelector('.progress-bar-fill').style.background = bgVal;

        el.querySelector('.title').innerText = goalObj.title;
        container.appendChild(clone);
    });
    
    updateGoalProgress();
}

function updateGoalProgress() {
    document.querySelectorAll('.goal-item-container').forEach(el => {
        const index = parseInt(el.dataset.index);
        const goal = goals[index];
        const prevTarget = index > 0 ? goals[index - 1].targetAmount : startAmount;
        const currentTarget = goal.targetAmount;
        const effectiveCurrent = Math.max(sessionTotal, prevTarget);
        
        let percent = 0;
        if (currentTarget > prevTarget) percent = (effectiveCurrent - prevTarget) / (currentTarget - prevTarget);
        percent = Math.min(1, Math.max(0, percent));
        
        const isActive = index === currentGoalIndex;
        let text = "";
        
        // Visibility Logic: Only show text for active goal
        if (isActive) {
            const displayVal = Math.min(sessionTotal, currentTarget);
            if (showAmount) text += \`\${Math.floor(displayVal)} / \${currentTarget}\`;
            if (showPercentage) {
                if (text) text += " ";
                text += \`(\${Math.floor(percent * 100)}%)\`;
            }
        }
        
        el.querySelector('.amount').innerText = text;
        
        const fill = el.querySelector('.progress-bar-fill');
        if(fill) fill.style.width = \`\${percent * 100}%\`;
        
        if (index === currentGoalIndex && sessionTotal >= currentTarget) {
            handleCompletion(el);
        }
    });
}

function handleCompletion(element) {
    if (element.classList.contains('completed')) return;
    element.classList.add('completed');
    setTimeout(() => {
        element.classList.add('animating-out');
        setTimeout(() => {
            currentGoalIndex++;
            renderGoals();
        }, 500); 
    }, 1500);
}
`;
};

export const generateGoalData = (settings: GoalSettings): string => {
  return JSON.stringify(settings, null, 2);
};
