import React from 'react';
import { createRoot } from 'react-dom/client';
import { createApp, h } from 'vue';
import { ReactToast } from '../react/Toast';
import VueToast from '../vue/Toast.vue';
import { ToastType } from '../types';

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
  
  /* Nav header */
  .nav-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: transparent;
    padding: 0.75rem 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 100;
  }
  
  .nav-brand {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 700;
    font-size: 1.1rem;
    color: #333;
    text-decoration: none;
    transition: opacity 0.3s ease;
  }
  
  .nav-brand:hover {
    opacity: 0.8;
  }
  
  .nav-brand-icon {
    font-size: 1.25rem;
    transition: transform 0.3s ease;
  }
  
  .nav-brand:hover .nav-brand-icon {
    animation: pulse 1s ease infinite;
  }
  
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
  
  .nav-controls {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  .nav-framework-selector {
    display: flex;
    align-items: center;
    gap: 1rem;
    background: #f5f5f5;
    border-radius: 6px;
    padding: 0.25rem;
  }

  .nav-framework-option {
    padding: 0.25rem 0.75rem;
    border-radius: 4px;
    font-size: 0.8rem;
    font-weight: 600;
    color: #666;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .nav-framework-option.active {
    background: #ffffff;
    color: #333;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }
  
  .nav-switch {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .nav-switch-label {
    font-size: 0.8rem;
    color: #666;
    font-weight: 500;
  }
  
  .container {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: 1rem;
    padding-top: 5rem; /* Space for fixed header */
  }

  @media (min-width: 768px) {
    .container {
      padding: 2rem;
      padding-top: 6rem; /* Space for fixed header */
    }
  }
  
  .toast-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-top: 2rem;
  }
  
  .toast-header h1 { 
    color: #333; 
    font-size: clamp(1.8rem, 5vw, 2rem);
    line-height: 1.2;
    font-weight: bold;
    margin: 0 0 1rem;
  }
  
  .toast-header p { 
    color: #666; 
    width: 40vw;
    font-size: clamp(1rem, 2vw, 1.2rem);
    line-height: 1.4;
    margin: 0;
    max-width: 600px;
    padding: 0 1rem;
    font-weight: 600;
  }
  
  .doc-section {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    margin-bottom: 2rem;
    height: fit-content;
    padding: 1.5rem;
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
    font-size: clamp(1rem, 5vw, 1.8rem);
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
    width: 28px;
    height: 28px;
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
    font-size: clamp(.8rem, 2vw, 1.1rem);
    color: #666;
    font-weight: 600;
  }
  
  .step code {
    font-family: monospace;
    background: #f1f1f1;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-size: 0.7rem;
    color: #333;
    position: relative;
    cursor: pointer;
    transition: background-color 0.2s ease;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .step code:hover {
    background: #e8e8e8;
  }

  .step code::after {
    content: "📋";
    margin-left: 8px;
    font-size: 0.75rem;
    opacity: 0.6;
  }

  .step code.copied {
    background: #e0f7e0;
  }

  .step code.copied::after {
    content: "✓";
    color: #4CAF50;
    opacity: 1;
  }

  .copy-tooltip {
    position: absolute;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    top: -28px;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s ease, visibility 0.2s ease;
    pointer-events: none;
  }

  .step code:hover .copy-tooltip {
    opacity: 1;
    visibility: visible;
  }
 
  .doc-github {
    border: 1px solid #333;
    border-radius: 10px;
    padding: 13px 60px;
    text-decoration: none;
    font-size: 14px;
    font-weight: 600;
    background-color: transparent;
    color: #333;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    z-index: 1;
  }
  
  .doc-github:hover {
    color: #fff;
    border-color: #333;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .doc-github::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background-color: #333;
    transition: all 0.3s ease;
    z-index: -1;
  }
  
  .doc-github:hover::before {
    width: 100%;
  }
  
  a {
    text-decoration: none;
    color: #333;
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
    position: relative;
    cursor: pointer;
  }

  .example-code:hover {
    color: #F4C3A3;
  }
  
  .example-code::after {
    content: "📋";
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 14px;
    opacity: 0.7;
    transition: opacity 0.2s ease;
  }
  
  .example-code:hover::after {
    opacity: 1;
  }
  
  .example-code.copied::after {
    content: "✓";
    color: #4CAF50;
    opacity: 1;
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
    gap: 0.5rem;
    border-radius: 8px;
    width: 100%;
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
  .demo-controls {
    display: flex;
    gap: 2rem;
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: #f5f5f5;
    border-radius: 10px;
    justify-content: center;
  }

  .control-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
    min-width: 180px;
  }

  .control-group label {
    font-size: 0.875rem;
    color: #666;
    font-weight: 600;
    margin-bottom: 0.25rem;
  }

  .theme-buttons,
  .type-buttons {
    display: flex;
    gap: 0.5rem;
    width: 100%;
    justify-content: center;
  }

  .control-button {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    border: none;
    background: none;
    color: #666;
    cursor: pointer;
    border-radius: 6px;
    transition: all 0.2s ease;
    flex: 1;
    text-align: center;
  }

  .control-button:hover {
    background: rgba(0, 0, 0, 0.05);
  }

  .control-button.active {
    background: #333;
    color: white;
  }

  .footer {
    text-align: center;
    padding: 2rem 0;
    color: #666;
    font-size: 0.9rem;
    font-weight: 500;
  }

  .footer span {
    color: #ff4b4b;
  }

  /* Theme slider */
  .theme-slider {
    position: relative;
    width: 60px;
    height: 26px;
    background: #e0e0e0;
    border-radius: 13px;
    display: flex;
    align-items: center;
    padding: 3px;
    cursor: pointer;
    box-shadow: inset 0 1px 3px rgba(0,0,0,0.1);
    transition: background-color 0.3s ease;
  }

  .theme-slider:hover {
    background: #d6d6d6;
  }

  .theme-slider::before {
    content: '☀️';
    position: absolute;
    left: 8px;
    top: 4px;
    font-size: 14px;
    z-index: 2;
    opacity: 0.7;
  }

  .theme-slider::after {
    content: '🌙';
    position: absolute;
    right: 8px;
    top: 4px;
    font-size: 14px;
    z-index: 2;
    opacity: 0.7;
  }

  .theme-slider-thumb {
    position: absolute;
    width: 20px;
    height: 20px;
    background: #ffffff;
    border-radius: 50%;
    transition: transform 0.3s ease, background-color 0.3s ease;
    box-shadow: 0 1px 3px rgba(0,0,0,0.15);
    z-index: 3;
    left: 3px;
  }

  .theme-slider-thumb.dark {
    transform: translateX(calc(100% - 20px));
    background: #333;
  }

  .theme-slider-track {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 13px;
    overflow: hidden;
    pointer-events: none;
  }

  .theme-slider-labels {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    pointer-events: none;
  }

  .theme-slider-label {
    flex: 1;
    text-align: center;
    font-size: 10px;
    line-height: 26px;
    color: #888;
    opacity: 0.7;
    font-weight: 600;
  }

  /* Custom dropdown */
  .custom-dropdown {
    position: relative;
    width: 100%;
  }

  .dropdown-selected {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    background: #f0f0f0;
    border-radius: 6px;
    cursor: pointer;
    color: #333;
    font-size: 0.875rem;
    font-weight: 600;
  }

  .dropdown-selected:after {
    content: '';
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #666;
    margin-left: 8px;
  }

  .dropdown-options {
    position: absolute;
    top: calc(100% + 5px);
    left: 0;
    width: 100%;
    background: #fff;
    border-radius: 6px;
    box-shadow: 0 3px 10px rgba(0,0,0,0.1);
    display: none;
    flex-direction: column;
    z-index: 10;
    overflow: hidden;
  }

  .dropdown-options.open {
    display: flex;
  }

  .dropdown-option {
    padding: 8px 12px;
    cursor: pointer;
    font-size: 0.875rem;
    transition: background 0.2s ease;
    color: #666;
  }

  .dropdown-option:hover {
    background: #f5f5f5;
  }

  .dropdown-option.success {
    border-left: 3px solid var(--toast-success-light);
  }

  .dropdown-option.error {
    border-left: 3px solid var(--toast-error-light);
  }

  .dropdown-option.info {
    border-left: 3px solid var(--toast-info-light);
  }

  /* Update footer */
  .footer {
    text-align: center;
    padding: 2rem 0;
    color: #666;
    font-size: 0.9rem;
    font-weight: 500;
    margin-top: 2rem;
  }

  .footer span {
    color: #ff4b4b;
  }
`;
document.head.appendChild(style);

// Create nav header
const navHeader = document.createElement('div');
navHeader.className = 'nav-header';
navHeader.innerHTML = `
  <a href="#" class="nav-brand">
    <span class="nav-brand-icon">🍞</span>
  </a>
  <div class="nav-controls">
    <div class="nav-switch">
      <div class="theme-slider" id="theme-slider" onclick="window.toggleTheme(window.currentFramework)">
        <div class="theme-slider-thumb light"></div>
        <div class="theme-slider-track"></div>
      </div>
    </div>
  </div>
`;
document.body.appendChild(navHeader);

// Create demo UI
const container = document.createElement('div');
container.innerHTML = `
  <div class="container">
    <div class="toast-header">
      <h1>Cross Toast</h1>
      <p> Lightweight, Beautiful, Framework agnostic toast.</p>
    </div>

    <div class="doc-section">
      <a href="https://github.com/sambabib/cross-toast" target="_blank" class="doc-github">View Github Doc</a>
    </div>

    <div class="predemo-tabs">
      <h2>Usage</h2>
      <div class="steps">
        <div class="step">
          <span class="step-number">1</span>
          <p>Install the package for your framework</p>
          <code data-copy="npm install @cross-toast/react"><span>npm install @cross-toast/react</span><span class="copy-tooltip">Click to copy</span></code>
        </div>
        <div class="step">
          <span class="step-number">2</span>
          <p>Import and use in your component</p>
          <code data-copy="import { ReactToast } from '@cross-toast/react'"><span>import { ReactToast } from '@cross-toast/react'</span><span class="copy-tooltip">Click to copy</span></code>
        </div>
        <div class="step">
          <span class="step-number">3</span>
          <p>Customize and show your toast!</p>
          <code data-copy="<ReactToast message=\"Hello World!\" />"><span>&lt;ReactToast message="Hello World!" /&gt;</span><span class="copy-tooltip">Click to copy</span></code>
        </div>
      </div>
    </div>
    
    <div class="demo-tabs">
      <div class="tab-buttons">
        <button class="tab-button active" onclick="window.switchTab('react')">React</button>
        <button class="tab-button" onclick="window.switchTab('vue')">Vue</button>
      </div>
    </div>

    <div class="demo-controls">
      <div class="control-group">
        <label>Type</label>
        <div class="custom-dropdown" id="type-dropdown">
          <div class="dropdown-selected" onclick="window.toggleDropdown()">Success</div>
          <div class="dropdown-options">
            <div class="dropdown-option success" onclick="window.selectToastType(window.currentFramework, 'success')">Success</div>
            <div class="dropdown-option error" onclick="window.selectToastType(window.currentFramework, 'error')">Error</div>
            <div class="dropdown-option info" onclick="window.selectToastType(window.currentFramework, 'info')">Info</div>
          </div>
        </div>
      </div>
    </div>

    <div id="react-section" class="demo-section active">
      <h2>Change Position</h2>
      <div class="example-container">
        <pre class="example-code" data-copy="<Toaster
  position=&quot;bottom-right&quot;
  reverseOrder=false
/>">&lt;Toaster
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
        <pre class="example-code" data-copy="<Toaster
  position=&quot;bottom-right&quot;
  reverseOrder=false
/>">&lt;Toaster
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

    <footer class="footer">
      Made with <span>❤️</span> by sambabib
    </footer>
  </div>
`;
document.body.appendChild(container);

// Setup React toast demo
const reactRoot = document.createElement('div');
reactRoot.id = 'react-root';
document.body.appendChild(reactRoot);
const reactRootInstance = createRoot(reactRoot);

// State management
let currentFramework: 'react' | 'vue' = 'react';
const toastTypes: Record<'react' | 'vue', ToastType> = { react: 'success', vue: 'success' };
const themes: Record<'react' | 'vue', 'light' | 'dark' | 'auto'> = { react: 'light', vue: 'light' };

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
  currentFramework = framework;

  // Update tab buttons
  document.querySelectorAll('.tab-button').forEach(btn => {
    btn.classList.remove('active');
    if (btn instanceof HTMLElement && btn.textContent?.toLowerCase().includes(framework)) {
      btn.classList.add('active');
    }
  });

  // Update nav framework selector
  document.querySelectorAll('.nav-framework-option').forEach(option => {
    option.classList.remove('active');
    if (option instanceof HTMLElement && option.textContent?.toLowerCase().includes(framework)) {
      option.classList.add('active');
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
        <pre class="example-code" data-copy="<Toaster
  position=&quot;bottom-right&quot;
  reverseOrder=false
/>">&lt;Toaster
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
        <pre class="example-code" data-copy="<Toaster
  position=&quot;bottom-right&quot;
  reverseOrder=false
/>">&lt;Toaster
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

  // Update UI controls to match the current framework settings
  updateUIForCurrentFramework(framework);

  // Initialize code copy handlers for new elements
  initializeCodeCopyHandlers();
}

// Helper to update UI controls based on the current framework's settings
function updateUIForCurrentFramework(framework: 'react' | 'vue') {
  // Update theme slider
  const currentTheme = themes[framework];
  const themeSlider = document.getElementById('theme-slider');
  const thumb = themeSlider?.querySelector('.theme-slider-thumb');

  if (thumb) {
    thumb.className = 'theme-slider-thumb ' + currentTheme;
  }

  // Update type dropdown
  const currentType = toastTypes[framework];
  const dropdown = document.getElementById('type-dropdown');
  const selected = dropdown?.querySelector('.dropdown-selected');

  if (selected) {
    selected.textContent = currentType.charAt(0).toUpperCase() + currentType.slice(1);
  }
}

// Set theme for a framework
function setTheme(framework: 'react' | 'vue', theme: 'light' | 'dark') {
  themes[framework] = theme;

  // Update theme buttons
  const themeButtons = document.querySelectorAll('.theme-buttons .control-button');
  themeButtons.forEach(btn => {
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

      // Update data-copy attribute
      if (exampleCode instanceof HTMLElement) {
        exampleCode.setAttribute('data-copy', `<Toaster\n  position="${position}"\n  reverseOrder=false\n/>`);

        // Re-attach click handler
        exampleCode.addEventListener('click', function (this: HTMLElement) {
          const textToCopy = this.getAttribute('data-copy') || '';
          copyToClipboard(textToCopy, this);
        });
      }
    }
  }

  // Show the toast notification
  const message = `${framework.charAt(0).toUpperCase() + framework.slice(1)} toast in ${position} position! 🎯`;

  if (framework === 'react') {
    reactRootInstance.render(
      React.createElement(ReactToast, {
        message,
        position,
        type: toastTypes.react,
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
        type: toastTypes.vue,
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
  showPositionedToast,
  setToastType,
  currentFramework,
  toggleTheme,
  toggleDropdown,
  selectToastType,
  updateUIForCurrentFramework,
  copyToClipboard,
  initializeCodeCopyHandlers
});

// TypeScript declarations
declare global {
  interface Window {
    showQuickToast: typeof showQuickToast;
    switchTab: typeof switchTab;
    setTheme: typeof setTheme;
    showPositionedToast: typeof showPositionedToast;
    setToastType: typeof setToastType;
    currentFramework: 'react' | 'vue';
    toggleTheme: typeof toggleTheme;
    toggleDropdown: typeof toggleDropdown;
    selectToastType: typeof selectToastType;
    updateUIForCurrentFramework: typeof updateUIForCurrentFramework;
    copyToClipboard: typeof copyToClipboard;
    initializeCodeCopyHandlers: typeof initializeCodeCopyHandlers;
  }
}

// Update setToastType function
function setToastType(framework: 'react' | 'vue', type: ToastType) {
  toastTypes[framework] = type;
  const buttons = document.querySelectorAll(`.type-buttons button`);
  buttons.forEach(button => {
    button.classList.remove('active');
    if (button.textContent?.toLowerCase() === type) {
      button.classList.add('active');
    }
  });
}

// Add new functions for theme slider and dropdown
function toggleTheme(framework: 'react' | 'vue') {
  const currentTheme = themes[framework];
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  themes[framework] = newTheme;

  // Update slider UI
  const themeSlider = document.getElementById('theme-slider');
  const thumb = themeSlider?.querySelector('.theme-slider-thumb');

  if (thumb) {
    thumb.className = 'theme-slider-thumb ' + newTheme;
  }

  // Show a toast notification about the theme change
  // Always use React toast (as specified)
  if (newTheme === 'dark') {
    reactRootInstance.render(
      React.createElement(ReactToast, {
        message: 'Welcome to Cross Toast 🌙',
        position: 'bottom-right',
        type: 'success',
        theme: 'dark',
        onHide: () => reactRootInstance.render(null),
      })
    );
  } else {
    reactRootInstance.render(
      React.createElement(ReactToast, {
        message: 'Welcome to Cross Toast ☀️',
        position: 'bottom-right',
        type: 'success',
        theme: 'light',
        onHide: () => reactRootInstance.render(null),
      })
    );
  }
}

function toggleDropdown() {
  const dropdown = document.getElementById('type-dropdown');
  const options = dropdown?.querySelector('.dropdown-options');

  if (options) {
    options.classList.toggle('open');
  }
}

function selectToastType(framework: 'react' | 'vue', type: ToastType) {
  toastTypes[framework] = type;

  // Update dropdown UI
  const dropdown = document.getElementById('type-dropdown');
  const selected = dropdown?.querySelector('.dropdown-selected');
  const options = dropdown?.querySelector('.dropdown-options');

  if (selected && options) {
    selected.textContent = type.charAt(0).toUpperCase() + type.slice(1);
    options.classList.remove('open');
  }
}

// Add window click handler to close dropdown when clicking outside
document.addEventListener('click', function (event) {
  const dropdown = document.getElementById('type-dropdown');
  const options = dropdown?.querySelector('.dropdown-options');

  // Check if click is outside the dropdown
  if (dropdown && options && !dropdown.contains(event.target as Node)) {
    options.classList.remove('open');
  }
}, true);

// Function to copy code to clipboard
function copyToClipboard(text: string, element: HTMLElement) {
  navigator.clipboard.writeText(text).then(() => {
    // Show success state
    element.classList.add('copied');

    // Update tooltip
    const tooltip = element.querySelector('.copy-tooltip');
    if (tooltip) {
      tooltip.textContent = 'Copied!';
    }

    // Reset after 2 seconds
    setTimeout(() => {
      element.classList.remove('copied');
      if (tooltip) {
        tooltip.textContent = 'Click to copy';
      }
    }, 2000);
  }).catch(err => {
    console.error('Could not copy text: ', err);

    // Show error in tooltip
    const tooltip = element.querySelector('.copy-tooltip');
    if (tooltip) {
      tooltip.textContent = 'Failed to copy';
    }

    // Reset after 2 seconds
    setTimeout(() => {
      if (tooltip) {
        tooltip.textContent = 'Click to copy';
      }
    }, 2000);
  });
}

// Function to initialize click handlers for code elements
function initializeCodeCopyHandlers() {
  // For step code elements
  document.querySelectorAll('.step code').forEach(codeElement => {
    codeElement.addEventListener('click', function (this: HTMLElement) {
      const textToCopy = this.getAttribute('data-copy') || this.textContent || '';
      copyToClipboard(textToCopy, this);
    });
  });

  // For example code elements
  document.querySelectorAll('.example-code').forEach(codeElement => {
    codeElement.addEventListener('click', function (this: HTMLElement) {
      const textToCopy = this.getAttribute('data-copy') || '';
      copyToClipboard(textToCopy, this);
    });
  });
}

// Initialize UI once document is loaded
document.addEventListener('DOMContentLoaded', function () {
  // Set initial UI state for the current framework
  updateUIForCurrentFramework(currentFramework);

  // Close dropdown when clicking on dropdown options (to avoid bubbling)
  document.querySelectorAll('.dropdown-option').forEach(option => {
    option.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  });

  // Initialize code copy handlers
  initializeCodeCopyHandlers();
});
