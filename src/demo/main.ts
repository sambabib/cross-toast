import React from 'react';
import { createRoot } from 'react-dom/client';
import { createApp, h } from 'vue';
import { ReactToast } from '../react/Toast';
import VueToast from '../vue/Toast.vue';

// Add demo styles
const style = document.createElement('style');
style.textContent = `
  body {
    font-family: "Host Grotesk", -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    margin: 0;
    padding: 0;
    background: #f8f9f9;
  }
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
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
    font-size: 2.5rem;
    letter-spacing: -1px;
    line-height: 0 !important;
    font-weight: bold;
  }
  .toast-header p { 
    color: #666; 
    font-size: 1.2rem;
    letter-spacing: -0.5px;
    line-height: 0;
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
    padding: 16px 32px;
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
    border-radius: 10px;
    background: #fdfefe;
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
    padding: 16px 32px;
    border-radius: 10px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: -0.5px;
  }
  .demo-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    align-items: start;
  }
  .controls {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
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
      <button class="doc-github" onclick="window.location.href='https://github.com/sambabib/cross-toast">Github</button>
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
      <h2>React Toast</h2>
      <div class="theme-buttons">
        <button onclick="window.setTheme('react', 'light')">Light Theme</button>
        <button onclick="window.setTheme('react', 'dark')">Dark Theme</button>
      </div>
      <div class="demo-grid">
        <div class="controls">
          <button onclick="window.showPositionedToast('react', 'top-left')">Top Left</button>
          <button onclick="window.showPositionedToast('react', 'top-right')">Top Right</button>
          <button onclick="window.showPositionedToast('react', 'bottom-left')">Bottom Left</button>
          <button onclick="window.showPositionedToast('react', 'bottom-right')">Bottom Right</button>
        </div>
        <pre class="code-block">import { ReactToast } from '@cross-toast/react';

function App() {
  return (
    <ReactToast
      message="Hello from React!"
      position="top-right"
      type="success"
      theme="light"
    />
  );
}</pre>
      </div>
    </div>

    <div id="vue-section" class="demo-section">
      <h2>Vue Toast</h2>
      <div class="theme-buttons">
        <button onclick="window.setTheme('vue', 'light')">Light Theme</button>
        <button onclick="window.setTheme('vue', 'dark')">Dark Theme</button>
      </div>
      <div class="demo-grid">
        <div class="controls">
          <button onclick="window.showPositionedToast('vue', 'top-left')">Top Left</button>
          <button onclick="window.showPositionedToast('vue', 'top-right')">Top Right</button>
          <button onclick="window.showPositionedToast('vue', 'bottom-left')">Bottom Left</button>
          <button onclick="window.showPositionedToast('vue', 'bottom-right')">Bottom Right</button>
        </div>
        <pre class="code-block">import { VueToast } from '@cross-toast/vue';

export default {
  components: { VueToast },
  template: '
    <VueToast
      message="Hello from Vue!"
      position="top-right"
      type="success"
      theme="light"
    />
  '
};</pre>
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

  // Update sections
  document.querySelectorAll('.demo-section').forEach(section => {
    section.classList.remove('active');
    if (section.id === `${framework}-section`) {
      section.classList.add('active');
    }
  });
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
function showPositionedToast(framework: 'react' | 'vue', position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right') {
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
