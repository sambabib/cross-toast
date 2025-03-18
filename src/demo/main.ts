import React from 'react';
import { createRoot } from 'react-dom/client';
import { createApp, h } from 'vue';
import { ReactToast } from '../react/Toast';
import VueToast from '../vue/Toast.vue';

// Add demo styles
const style = document.createElement('style');
style.textContent = `
  * {
    box-sizing: border-box;
  }

  body {
    font-family: "Host Grotesk", -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    margin: 0;
    padding: 0;
    background: #f8f9f9;
    -webkit-font-smoothing: antialiased;
  }
  .container {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: 1rem;
  }

  @media (min-width: 768px) {
    .container {
      padding: 2rem;
    }
  }
  .toast-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .toast-header h1 { 
    color: #333; 
    font-size: clamp(2rem, 5vw, 2.5rem);
    letter-spacing: -1px;
    line-height: 1.2;
    font-weight: bold;
    margin: 0 0 1rem;
  }
  .toast-header p { 
    color: #666; 
    font-size: clamp(1rem, 3vw, 1.2rem);
    letter-spacing: -0.5px;
    line-height: 1.4;
    margin: 0;
    max-width: 600px;
    padding: 0 1rem;
    font-weight: 600;
  }
  .doc-section {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: center;
    gap: 2rem;
    margin-bottom: 2rem;
    height: fit-content;
    padding: 2rem;
  }
  .predemo-tabs {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    margin: 4rem 0;
    text-align: center;
  }
  .predemo-tabs h2 {
    font-size: 1.8rem;
    letter-spacing: -1px;
    color: #333;
    margin: 0;
    font-weight: bold;
  }
  .steps {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
    max-width: 500px;
  }
  .step {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }
  .step-number {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #333;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
  .step p {
    margin: 0;
    font-size: 1.1rem;
    color: #666;
    font-weight: 600;
    letter-spacing: -0.5px;
  }
  .step code {
    font-family: monospace;
    background: #f1f1f1;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-size: 0.9rem;
    color: #333;
  }
  .doc-toast {
    background: #333;
    color: white;
    font-size: 14px;
  }
  .doc-github {
    background: #fdfefe;
    border: 1px solid #eee;
    border-radius: 10px;
    color: #333;
    padding: 12px 48px;
    text-decoration: none;
    font-size: 14px;
    font-weight: 600;
  }
  .demo-tabs {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    margin-bottom: 2rem;
    align-items: center;
    justify-content: center;
  }
  .tab-buttons {
    background: #efefef;
    max-width: 400px;
    padding: .4rem .35rem;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .tab-button {
    background: none;
    border: none;
    padding: .4rem 4rem;
    color: #666;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    border-radius: 10px;
  }
  .tab-button.active {
    background: #fdfefe;
    color: #333;
    padding: .8rem 4rem;
    transition: background 0.3s ease;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  }
  .demo-section {
    margin-bottom: 2rem;
    padding: 2rem;
    opacity: 0;
    visibility: hidden;
    height: 0;
    overflow: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
  }
  .demo-section.active {
    opacity: 1;
    visibility: visible;
    height: auto;
    overflow: visible;
  }
  .demo-section h2 { 
    color: #333;
    margin-bottom: 2rem;
    font-size: 1.5rem;
  }
  button {
    border: none;
    padding: 12px 48px;
    border-radius: 10px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: -0.5px;
  }
  .demo-section {
    margin-bottom: 2rem;
  }

  .demo-section h2 {
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
    color: #49311B;
  }

  .example-container {
    background: #333;
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .example-code {
    font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, monospace;
    color: #E6D5C9;
    font-size: 0.9rem;
    line-height: 1.5;
    margin: 0;
  }

  .example-code .highlight {
    color: #F4C3A3;
  }

  .position-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.75rem;
    margin-top: 1.5rem;
  }

  .position-button {
    background: #FFFFFF;
    border: 1px solid #E6E6E6;
    border-radius: 8px;
    padding: 0.75rem;
    font-size: 0.875rem;
    color: #49311B;
    transition: all 0.2s ease;
  }

  .position-button:hover {
    background: #F9F5F2;
  }

  .position-button.active {
    background: #333;
    color: #FFFFFF;
    border-color: #333;
  }

  @media (max-width: 768px) {
    .position-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 480px) {
    .example-container {
      padding: 1rem;
    }

    .example-code {
      font-size: 0.8rem;
    }

    .position-button {
      padding: 0.5rem;
      font-size: 0.75rem;
    }
  }
  .controls button {
    background: #fdfefe;
    color: #333;
    border: 1px solid #eee;
  }
  .controls button:hover,
  .controls button.active {
    background: #333;
    color: white;
    border-color: #333;
  }
  .theme-buttons {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    justify-content: center;
  }
  .code-block {
    background: #f8f9fa;
    padding: 1.5rem;
    border-radius: 10px;
    font-family: monospace;
    font-size: 14px;
    line-height: 1.5;
    color: #333;
    white-space: pre;
    overflow-x: auto;
  }
`;
document.head.appendChild(style);

// Create demo UI
const container = document.createElement('div');
container.innerHTML = `
  <div class="container">
    <div class="toast-header">
      <h1>Cross Toast</h1>
      <p> Lightweight, Beautiful, Framework agnostic toast.</p>
    </div>

    <div class="doc-section">
      <button class="doc-toast" onclick="window.showQuickToast()">Try Cross Toast</button>
      <button class="doc-github" onclick="window.location.href='https://github.com/sambabib/cross-toast" target="_blank">Github</button>
    </div>

    <div class="predemo-tabs">
      <h2>How to Use</h2>
      <div class="steps">
        <div class="step">
          <span class="step-number">1</span>
          <p>Install the package for your framework</p>
          <code>npm install @cross-toast/react</code>
        </div>
        <div class="step">
          <span class="step-number">2</span>
          <p>Import and use in your component</p>
          <code>import { ReactToast } from '@cross-toast/react'</code>
        </div>
        <div class="step">
          <span class="step-number">3</span>
          <p>Customize and show your toast!</p>
          <code>&lt;ReactToast message="Hello World!" /&gt;</code>
        </div>
      </div>
    </div>
    
    <div class="demo-tabs">
      <div class="tab-buttons">
        <button class="tab-button active" onclick="window.switchTab('react')">React</button>
        <button class="tab-button" onclick="window.switchTab('vue')">Vue</button>
      </div>
    </div>

    <div id="react-section" class="demo-section active">
      <h2>Change Position</h2>
      <div class="example-container">
        <pre class="example-code">&lt;Toaster
          position=<span class="highlight">"bottom-right"</span>
          reverseOrder=<span class="highlight">false</span>
        /&gt;</pre>
      </div>
      <div class="position-grid">
        <button class="position-button" data-position="top-left" onclick="window.showPositionedToast('react', 'top-left')">top-left</button>
        <button class="position-button" data-position="top-right" onclick="window.showPositionedToast('react', 'top-right')">top-right</button>
        <button class="position-button" data-position="bottom-left" onclick="window.showPositionedToast('react', 'bottom-left')">bottom-left</button>
        <button class="position-button active" data-position="bottom-right" onclick="window.showPositionedToast('react', 'bottom-right')">bottom-right</button>
      </div>
    </div>

    <div id="vue-section" class="demo-section">
      <h2>Change Position</h2>
      <div class="example-container">
        <pre class="example-code">&lt;Toaster
          position=<span class="highlight">"bottom-right"</span>
          reverseOrder=<span class="highlight">false</span>
        /&gt;</pre>
      </div>
      <div class="position-grid">
        <button class="position-button" data-position="top-left" onclick="window.showPositionedToast('vue', 'top-left')">top-left</button>
        <button class="position-button" data-position="top-right" onclick="window.showPositionedToast('vue', 'top-right')">top-right</button>
        <button class="position-button" data-position="bottom-left" onclick="window.showPositionedToast('vue', 'bottom-left')">bottom-left</button>
        <button class="position-button active" data-position="bottom-right" onclick="window.showPositionedToast('vue', 'bottom-right')">bottom-right</button>
      </div>
    </div>
  </div>
`;
document.body.appendChild(container);

// Setup React toast demo
const reactRoot = document.createElement('div');
reactRoot.id = 'react-root';
document.body.appendChild(reactRoot);
const reactRootInstance = createRoot(reactRoot);



// State management for themes
const themes: Record<'react' | 'vue', 'light' | 'dark'> = {
  react: 'light',
  vue: 'light'
};

// Quick toast function for the Toast Me button
function showQuickToast() {
  reactRootInstance.render(
    React.createElement(ReactToast, {
      message: 'Thanks for trying Cross Toast! 🎉',
      position: 'bottom-right',
      type: 'success',
      theme: 'light',
      onHide: () => reactRootInstance.render(null),
    })
  );
}

// Switch between framework tabs
function switchTab(framework: 'react' | 'vue') {
  // Update tab buttons
  document.querySelectorAll('.tab-button').forEach(btn => {
    btn.classList.remove('active');
    if (btn instanceof HTMLElement && btn.textContent?.toLowerCase().includes(framework)) {
      btn.classList.add('active');
    }
  });

  // Remove all demo sections from DOM
  document.querySelectorAll('.demo-section').forEach(section => {
    section.remove();
  });

  // Add back only the active section
  const activeSection = document.createElement('div');
  activeSection.id = `${framework}-section`;
  activeSection.className = 'demo-section active';

  if (framework === 'react') {
    activeSection.innerHTML = `
      <h2>Change Position</h2>
      <div class="example-container">
        <pre class="example-code">&lt;Toaster
          position=<span class="highlight">"bottom-right"</span>
          reverseOrder=<span class="highlight">false</span>
        /&gt;</pre>
      </div>
      <div class="position-grid">
        <button class="position-button" data-position="top-left" onclick="window.showPositionedToast('react', 'top-left')">top-left</button>
        <button class="position-button" data-position="top-right" onclick="window.showPositionedToast('react', 'top-right')">top-right</button>
        <button class="position-button" data-position="bottom-left" onclick="window.showPositionedToast('react', 'bottom-left')">bottom-left</button>
        <button class="position-button active" data-position="bottom-right" onclick="window.showPositionedToast('react', 'bottom-right')">bottom-right</button>
      </div>
    `;
  } else {
    activeSection.innerHTML = `
      <h2>Change Position</h2>
      <div class="example-container">
        <pre class="example-code">&lt;Toaster
          position=<span class="highlight">"bottom-right"</span>
          reverseOrder=<span class="highlight">false</span>
        /&gt;</pre>
      </div>
      <div class="position-grid">
        <button class="position-button" data-position="top-left" onclick="window.showPositionedToast('vue', 'top-left')">top-left</button>
        <button class="position-button" data-position="top-right" onclick="window.showPositionedToast('vue', 'top-right')">top-right</button>
        <button class="position-button" data-position="bottom-left" onclick="window.showPositionedToast('vue', 'bottom-left')">bottom-left</button>
        <button class="position-button active" data-position="bottom-right" onclick="window.showPositionedToast('vue', 'bottom-right')">bottom-right</button>
      </div>
    `;
  }

  // Insert the active section after the demo-tabs div
  const demoTabs = document.querySelector('.demo-tabs');
  if (demoTabs) {
    demoTabs.after(activeSection);
  }
}

// Set theme for a framework
function setTheme(framework: 'react' | 'vue', theme: 'light' | 'dark') {
  themes[framework] = theme;

  // Update theme buttons
  const section = document.getElementById(`${framework}-section`);
  section?.querySelectorAll('.theme-buttons button').forEach(btn => {
    btn.classList.remove('active');
    if (btn instanceof HTMLElement && btn.textContent?.toLowerCase().includes(theme)) {
      btn.classList.add('active');
    }
  });
}

// Show positioned toast for each framework
function showPositionedToast(framework: 'react' | 'vue', position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'): void {
  // Update active button state
  const section = document.getElementById(`${framework}-section`);
  if (section) {
    // Remove active class from all buttons
    section.querySelectorAll('.position-button').forEach(btn => {
      btn.classList.remove('active');
    });

    // Add active class to clicked button
    const activeButton = section.querySelector(`[data-position="${position}"]`);
    if (activeButton) {
      activeButton.classList.add('active');
    }

    // Update example code
    const exampleCode = section.querySelector('.example-code');
    if (exampleCode) {
      exampleCode.innerHTML = `&lt;Toaster\n  position=<span class="highlight">"${position}"</span>\n  reverseOrder=<span class="highlight">false</span>\n/&gt;`;
    }
  }

  // Show the toast notification
  const message = `${framework.charAt(0).toUpperCase() + framework.slice(1)} toast in ${position} position! 🎯`;

  if (framework === 'react') {
    reactRootInstance.render(
      React.createElement(ReactToast, {
        message,
        position,
        type: 'success',
        theme: themes.react,
        onHide: () => reactRootInstance.render(null),
      })
    );
  } else if (framework === 'vue') {
    const mountEl = document.createElement('div');
    document.body.appendChild(mountEl);

    const app = createApp({
      render: () => h(VueToast, {
        message,
        position,
        type: 'success',
        theme: themes.vue,
        onHide: () => app.unmount()
      })
    });

    app.mount(mountEl);
  }
}

// Expose functions to window
Object.assign(window, {
  showQuickToast,
  switchTab,
  setTheme,
  showPositionedToast
});

// TypeScript declarations
declare global {
  interface Window {
    showQuickToast: typeof showQuickToast;
    switchTab: typeof switchTab;
    setTheme: typeof setTheme;
    showPositionedToast: typeof showPositionedToast;
  }
}
