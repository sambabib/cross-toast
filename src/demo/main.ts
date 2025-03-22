import { ToastType } from '../types.js';
import { toast as reactToast } from '../react/index.js';
import { toast as vueToast } from '../vue/index.js';

// Add demo styles
const style = document.createElement('style');
style.textContent = `
  :root {
    --bg-primary: #f8f9f9;
    --text-primary: #333;
    --text-secondary: #666;
    --border-color: #e0e0e0;
    --highlight-color: #F4C3A3;
    --code-bg: #333;
    --code-text: #E6D5C9;
    --button-hover: #F9F5F2;
    --transition-duration: 0.3s;
    --bg-primary-rgb: 248, 249, 249;
  }

  :root[data-theme="dark"] {
    --bg-primary: #1a1a1a;
    --text-primary: #ffffff;
    --text-secondary: #a0a0a0;
    --border-color: #404040;
    --highlight-color: #F4C3A3;
    --code-bg: #2d2d2d;
    --code-text: #E6D5C9;
    --button-hover: #2d2d2d;
    --bg-primary-rgb: 26, 26, 26;
  }

  * {
    box-sizing: border-box;
    transition: background-color var(--transition-duration) ease,
                color var(--transition-duration) ease,
                border-color var(--transition-duration) ease;
  }

  body {
    font-family: "Poppins", system-ui;
    margin: 0;
    padding: 0;
    background: var(--bg-primary);
    color: var(--text-primary);
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
    font-size: clamp(1rem, 2vw, 1.1rem);
    color: var(--text-primary);
    text-decoration: none;
    transition: opacity 0.3s ease;
  }
  
  .nav-brand:hover {
    opacity: 0.8;
  }
  
  .nav-brand-icon {
    font-size: clamp(1.1rem, 2.5vw, 1.25rem);
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
    max-width: 550px;
    margin: 0 auto;
    padding: 1rem;
    padding-top: 5rem; /* Space for fixed header */
    padding-bottom: 4rem; /* Space for fixed footer */
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
    color: var(--text-primary); 
    font-size: clamp(2rem, 5vw, 2.4rem);
    line-height: 1.2;
    font-weight: bold;
    margin: 0 0 1rem;
    max-width: 450px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .toast-header p { 
    color: var(--text-secondary); 
    width: 40vw;
    font-size: clamp(.8rem, 2vw, .9rem);
    line-height: 1.4;
    margin: 0;
    max-width: 400px;
    padding: 0 1rem;
    font-weight: 600;
  }
  
  .doc-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin: 2rem auto;
    padding: 1rem;
    max-width: 500px;
    width: 100%;
  }
  
  .doc-github,
  .try-toast-btn {
    width: 100%;
    max-width: 300px;
    text-align: center;
    padding: 10px clamp(16px, 3vw, 24px);
    font-size: clamp(0.675rem, 1.5vw, 0.8rem);
    border-radius: 10px;
    font-weight: 600;
    transition: all 0.3s ease;
  }
  
  .doc-github {
    border: 1px solid var(--border-color);
    background-color: transparent;
    color: var(--text-primary);
    position: relative;
    overflow: hidden;
    z-index: 1;
    text-decoration: none;
    transition: all 0.3s ease;
  }
  
  .doc-github:hover {
    border-color: var(--text-primary);
  }
  
  .try-toast-btn {
    background-color: var(--text-primary);
    color: var(--bg-primary);
    border: 1px solid var(--text-primary);
  }
  
  .try-toast-btn:hover {
    opacity: 0.9;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .tab-button,
  .position-button,
  .control-button {
    padding: 10px clamp(20px, 3vw, 28px);
  }

  @media (min-width: 768px) {
    .doc-section {
      flex-direction: row-reverse;
      max-width: 500px;
      padding: 1.5rem;
      margin: 2rem auto;
    }

    .doc-github,
    .try-toast-btn {
      width: 100%;
      max-width: none;
    }
  }

  @media (max-width: 480px) {
    .doc-section {
      max-width: 300px;
      padding: 1rem 0.5rem;
      margin: 1rem auto;
      width: 90%;
    }

    .doc-github,
    .try-toast-btn,
    .tab-button,
    .position-button,
    .control-button {
      padding: 10px clamp(16px, 2vw, 20px);
      font-size: 0.875rem;
    }
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
    color: var(--text-primary);
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
    font-size: clamp(.8rem, 2vw, .9rem);
    color: var(--text-secondary);
    font-weight: 600;
  }
  
  .step code {
    font-family: monospace;
    background: var(--code-bg);
    padding: clamp(0.35rem, 1vw, 0.5rem) clamp(0.75rem, 1.5vw, 1rem);
    border-radius: 6px;
    font-size: clamp(0.65rem, 1.2vw, 0.7rem);
    color: var(--code-text);
    position: relative;
    cursor: pointer;
    transition: background-color 0.2s ease;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
  }

  .step code:hover {
    background: #333;
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
 
  .demo-tabs {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    margin-bottom: 2rem;
    align-items: center;
    justify-content: center;
  }
  
  .tab-buttons {
    background: var(--button-hover);
    max-width: 400px;
    padding: .25rem .35rem;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border: 1px solid var(--border-color);
  }
  
  .tab-button {
    background: none;
    border: none;
    padding: clamp(0.25rem, 1vw, 0.4rem) clamp(2rem, 4vw, 4rem);
    color: var(--text-secondary);
    cursor: pointer;
    font-size: clamp(0.75rem, 1.5vw, 14px);
    font-weight: 600;
    border-radius: 10px;
    white-space: nowrap;
  }
  
  .tab-button.active {
    background: var(--bg-primary);
    color: var(--text-primary);
    padding: .4rem 4rem;
    transition: background 0.3s ease;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
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
    background: var(--code-bg);
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .example-code {
    font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, monospace;
    color: var(--code-text);
    font-size: clamp(0.8rem, 1.5vw, 0.9rem);
    line-height: 1.5;
    margin: 0;
    position: relative;
    cursor: pointer;
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
    white-space: pre-wrap;
    word-wrap: break-word;
    overflow-x: auto;
  }

  .example-code:hover {
    color: var(--highlight-color);
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
    color: var(--highlight-color);
  }

  .position-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
    margin-top: 1.5rem;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
  }

  .position-button {
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: clamp(0.5rem, 1.5vw, 0.75rem);
    font-size: clamp(0.75rem, 1.5vw, 0.875rem);
    color: var(--text-primary);
    transition: all 0.2s ease;
    width: 100%;
  }

  .position-button:hover {
    background: var(--button-hover);
  }

  .position-button.active {
    background: var(--text-primary);
    color: var(--bg-primary);
    border-color: var(--text-primary);
  }

  @media (max-width: 768px) {
    .position-grid {
      max-width: 300px;
      gap: 0.5rem;
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
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    padding: 1rem 0;
    color: var(--text-secondary);
    font-size: 0.8rem;
    font-weight: 500;
    background: var(--bg-primary);
    border-top: 1px solid var(--border-color);
    z-index: 100;
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
    background: transparent;
    border-radius: 6px;
    cursor: pointer;
    color: var(--text-primary);
    font-size: 0.875rem;
    font-weight: 600;
  }

  .dropdown-selected {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    background: var(--bg-primary);
    border-radius: 6px;
    cursor: pointer;
    color: var(--text-primary);
    font-size: 0.875rem;
    font-weight: 600;
    border: 2px solid var(--border-color);
    transition: all 0.2s ease;
    letter-spacing: 0.5px;
    text-transform: capitalize;
  }

  .dropdown-selected:hover {
    background: var(--button-hover);
  }

  .dropdown-selected:after {
    content: '';
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid var(--text-secondary);
    margin-left: 8px;
    transition: transform 0.2s ease;
  }

  .dropdown-options {
    position: absolute;
    top: calc(100% + 5px);
    left: 0;
    width: 100%;
    background: var(--bg-primary);
    border-radius: 6px;
    box-shadow: 0 3px 10px rgba(0,0,0,0.1);
    border: 1px solid var(--border-color);
    display: none;
    flex-direction: column;
    z-index: 10;
    overflow: hidden;
    padding: 4px;
    gap: 6px;
  }

  .dropdown-option {
    position: relative;
    padding: 10px 12px;
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 0.875rem;
    color: var(--text-secondary);
    transition: all 0.2s ease;
    letter-spacing: 0.5px;
    text-transform: capitalize;
    border-radius: 4px;
  }

  .dropdown-option.selected {
    background: var(--text-primary);
    color: var(--bg-primary);
    border-radius: 10px;
  }

  /* Update nav controls dropdown to match */
  .nav-controls .dropdown-option.selected {
    border-radius: 10px;
  }

  /* Mobile specific styles */
  @media (max-width: 768px) {
    .nav-header {
      padding: 0.5rem 1rem;
      backdrop-filter: blur(8px);
      background: rgba(var(--bg-primary-rgb), 0.8);
    }
    .nav-brand {
      font-size: 1rem;
    }
    .nav-controls {
      gap: 1rem;
    }
    .container {
      padding: 1rem;
      padding-top: 4.5rem;
      padding-bottom: 3.5rem;
    }
    .toast-header h1 {
      font-size: clamp(1.5rem, 4vw, 2rem);
    }
    .toast-header p {
      width: 90%;
      max-width: 400px;
    }
    .step {
      gap: 0.25rem;
    }
    .step-number {
      width: 24px;
      height: 24px;
    }
    .step p {
      font-size: clamp(0.75rem, 2vw, 1rem);
    }
    .demo-controls {
      padding: 1rem;
      flex-direction: column;
      gap: 1rem;
    }
    .control-group {
      min-width: 100%;
    }
    .footer {
      padding: 1rem 0;
    }
  }

  @media (max-width: 480px) {
    .nav-controls {
      gap: 0.75rem;
    }

    .nav-header {
      padding: 0.5rem;
    }

    .container {
      padding: 0.75rem;
      padding-top: 4rem;
      padding-bottom: 3rem;
    }

    .doc-section {
      padding: 0.75rem;
    }

    .position-grid {
      max-width: 250px;
    }

    .tab-buttons {
      max-width: 250px;
    }

    .tab-button {
      padding: 0.25rem 1.5rem;
    }

    .toast-header p {
      width: 95%;
    }

    .example-container {
      padding: 0.75rem;
    }

    .step code::after {
      font-size: 0.7rem;
    }
  }

  /* When dropdown is open, rotate the arrow */
  .open + .dropdown-selected:after,
  .dropdown-selected.open:after {
    transform: rotate(180deg);
  }

  /* Hide duplicate dropdown in demo controls */
  .demo-controls {
    display: none;
  }
  
  /* Update nav controls styling to accommodate dropdown */
  .nav-controls {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }
  
  /* Make dropdown in nav header more compact and stylish */
  .nav-controls .custom-dropdown {
    width: auto;
    min-width: 120px;
  }
  
  .nav-controls .dropdown-selected {
    font-size: 0.75rem;
    padding: 6px 10px;
    background: var(--bg-primary);
    border: 2px solid var(--border-color);
    color: var(--text-primary);
    letter-spacing: 0.5px;
    text-transform: capitalize;
  }
  
  .nav-controls .dropdown-options {
    min-width: 120px;
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    padding: 4px;
  }
  
  .nav-controls .dropdown-option {
    font-size: 0.75rem;
    padding: 6px 10px;
    color: var(--text-secondary);
    letter-spacing: 0.5px;
    text-transform: capitalize;
    border-radius: 4px;
  }

  .nav-controls .dropdown-option:hover {
    background: var(--button-hover);
    color: var(--text-primary);
  }

  .nav-controls .dropdown-option.selected {
    background: var(--text-primary);
    color: var(--bg-primary);
  }

  .dropdown-options.open {
    display: flex;
    border: 1px solid var(--border-color);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }

  @media (max-width: 480px) {
    .toast-header h1 {
      max-width: 320px;
      padding: 0 1rem;
    }

    .toast-header p {
      width: 80vw;
      max-width: 280px;
    }

    .doc-section {
      max-width: 300px;
      padding: 1rem 0.5rem;
    }

    .step code {
      max-width: 280px;
      font-size: clamp(0.6rem, 1.1vw, 0.65rem);
      padding: clamp(0.3rem, 0.8vw, 0.4rem) clamp(0.6rem, 1.2vw, 0.8rem);
    }

    .example-code {
      max-width: 300px;
      font-size: clamp(0.7rem, 1.3vw, 0.8rem);
      padding: 0 1rem;
    }
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
    <div class="custom-dropdown" id="type-dropdown">
      <div class="dropdown-selected" onclick="window.toggleDropdown()">success</div>
      <div class="dropdown-options">
        <div class="dropdown-option success selected" onclick="window.selectToastType('success')">success</div>
        <div class="dropdown-option error" onclick="window.selectToastType('error')">error</div>
        <div class="dropdown-option info" onclick="window.selectToastType('info')">info</div>
      </div>
    </div>
  </div>
`;
document.body.appendChild(navHeader);

// Create demo UI
const container = document.createElement('div');
container.innerHTML = `
  <div class="container">
    <main>
      <article>
        <header class="toast-header">
          <h1>Beautiful toast notifications for modern web apps.</h1>
          <p>You don't have to make your own.</p>
        </header>

        <section class="doc-section" aria-label="Quick actions">
          <a href="https://github.com/sambabib/cross-toast" target="_blank" class="doc-github">View Documentation</a>
          <button class="try-toast-btn" onclick="window.tryToastDemo()">Try Cross Toast</button>
        </section>

        <section class="predemo-tabs" aria-label="Features">
          <h2>Clean<br>
          Lightweight<br>
          Nearly framework agnostic</h2>
          <div class="steps" id="framework-steps">
            <!-- Will be populated by updateStepperContent -->
          </div>
        </section>

        <section class="demo-tabs" aria-label="Demo">
          <div class="tab-buttons">
            <button class="tab-button active" onclick="window.switchTab('react')">React</button>
            <button class="tab-button" onclick="window.switchTab('vue')">Vue</button>
          </div>
        </section>
      </article>
    </main>

    <footer class="footer">
      Made with <span>❤️</span> by samuraikitts
    </footer>
  </div>
`;
document.body.appendChild(container);

// Setup React toast demo
const reactRoot = document.createElement('div');
reactRoot.id = 'react-root';
document.body.appendChild(reactRoot);

// Framework and theme state
let currentFramework: 'react' | 'vue' = 'react'; // Default
const themes: Record<'react' | 'vue', 'light' | 'dark'> = { react: 'light', vue: 'light' };
// Use a single global toast type instead of per-framework types
let currentToastType: ToastType = 'success';

// Initialize the default framework view
switchTab('react');

// Helper function to get the appropriate toast API based on the current framework
function getToast(): typeof reactToast {
  return currentFramework === 'react' ? reactToast : vueToast;
}

// Quick toast function for the Toast Me button
function showQuickToast(): void {
  getToast().success("Thanks for trying Cross Toast! 🎉", {
    position: 'bottom-right',
    theme: themes[currentFramework]
  });
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

  // Update stepper content based on selected framework
  updateStepperContent(framework);

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
      <div class="example-container">
        <pre class="example-code" data-copy="import { toast } from 'cross-toast/react';

function App() {
  const showCustomToast = () => {
    toast.success('Operation successful!', {
      position: 'top-right',
      duration: 5000,
      theme: 'dark',
    });
  };
}">import { toast } from 'cross-toast/react';

function App() {
  const showCustomToast = () => {
    toast.success('Operation successful!', {
      position: <span class="highlight">'top-right'</span>,
      duration: <span class="highlight">5000</span>,
      theme: <span class="highlight">'dark'</span>,
    });
  };
}</pre>
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
      <div class="example-container">
        <pre class="example-code" data-copy="import { toast } from 'cross-toast/vue';

export default {
  methods: {
    showCustomToast() {
      toast.success('Operation successful!', {
        position: 'top-right',
        duration: 5000,
        theme: 'dark',
      });
    }
  }
}">import { toast } from 'cross-toast/vue';

export default {
  methods: {
    showCustomToast() {
      toast.success('Operation successful!', {
        position: <span class="highlight">'top-right'</span>,
        duration: <span class="highlight">5000</span>,
        theme: <span class="highlight">'dark'</span>,
      });
    }
  }
}</pre>
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
  const currentType = currentToastType;
  const dropdown = document.getElementById('type-dropdown');
  const selected = dropdown?.querySelector('.dropdown-selected');

  if (selected) {
    // Just set the text content to the type (CSS will handle uppercase)
    selected.textContent = currentType;
  }

  // Update dropdown options for the selected type
  const allOptions = document.querySelectorAll('.dropdown-option');
  allOptions.forEach(option => {
    option.classList.remove('selected');
    if (option instanceof HTMLElement && option.textContent?.toLowerCase() === currentType.toLowerCase()) {
      option.classList.add('selected');
    }
  });
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

// Toggle theme between light and dark
function toggleTheme(): void {
  const framework = currentFramework;
  const newTheme = themes[framework] === 'light' ? 'dark' : 'light';
  setTheme(framework, newTheme);

  // Update theme for framework
  themes[framework] = newTheme;

  // Update document theme
  document.documentElement.setAttribute('data-theme', newTheme);

  // Update theme slider
  const themeSlider = document.getElementById('theme-slider');
  const thumb = themeSlider?.querySelector('.theme-slider-thumb');

  if (thumb) {
    thumb.className = 'theme-slider-thumb ' + newTheme;
  }

  // Show toast notification about theme change with the currently selected type
  const message = `Switched to ${newTheme} theme! 🌓`;
  const type = currentToastType;
  const toast = getToast();

  switch (type) {
    case 'success':
      toast.success(message, {
        theme: newTheme,
        position: 'bottom-right'
      });
      break;
    case 'error':
      toast.error(message, {
        theme: newTheme,
        position: 'bottom-right'
      });
      break;
    case 'info':
      toast.info(message, {
        theme: newTheme,
        position: 'bottom-right'
      });
      break;
    default:
      toast.show({
        message,
        position: 'bottom-right',
        type,
        theme: newTheme
      });
  }
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

  // Show the toast notification using the new API
  const message = `${framework.charAt(0).toUpperCase() + framework.slice(1)} toast in ${position} position! 🎯`;

  const type = currentToastType;
  const toast = framework === 'react' ? reactToast : vueToast;

  switch (type) {
    case 'success':
      toast.success(message, {
        position,
        theme: themes[framework]
      });
      break;
    case 'error':
      toast.error(message, {
        position,
        theme: themes[framework]
      });
      break;
    case 'info':
      toast.info(message, {
        position,
        theme: themes[framework]
      });
      break;
    default:
      toast.show({
        message,
        position,
        type,
        theme: themes[framework]
      });
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
  initializeCodeCopyHandlers,
  tryToastDemo
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
    tryToastDemo: typeof tryToastDemo;
  }
}

// Update setToastType function
function setToastType(type: ToastType) {
  currentToastType = type;
  const buttons = document.querySelectorAll(`.type-buttons button`);
  buttons.forEach(button => {
    button.classList.remove('active');
    if (button.textContent?.toLowerCase() === type) {
      button.classList.add('active');
    }
  });
}

// Add new functions for theme slider and dropdown
function toggleDropdown() {
  const dropdown = document.getElementById('type-dropdown');
  const options = dropdown?.querySelector('.dropdown-options');
  const selected = dropdown?.querySelector('.dropdown-selected');

  if (options && selected) {
    options.classList.toggle('open');
    selected.classList.toggle('open');
  }
}

function selectToastType(type: ToastType) {
  currentToastType = type;

  // Update dropdown UI
  const dropdown = document.getElementById('type-dropdown');
  const selected = dropdown?.querySelector('.dropdown-selected');
  const options = dropdown?.querySelector('.dropdown-options');

  if (selected && options) {
    // Just set the text content to the type (CSS will handle uppercase)
    selected.textContent = type;

    // Remove any type classes and add only the needed classes
    selected.className = 'dropdown-selected';

    // Close dropdown
    options.classList.remove('open');
    selected.classList.remove('open');
  }

  // Update selected state for the dropdown options
  const allOptions = document.querySelectorAll('.dropdown-option');
  allOptions.forEach(option => {
    option.classList.remove('selected');
    if (option instanceof HTMLElement && option.textContent?.toLowerCase() === type.toLowerCase()) {
      option.classList.add('selected');
    }
  });
}

// Add window click handler to close dropdown when clicking outside
document.addEventListener('click', function (event) {
  const dropdown = document.getElementById('type-dropdown');
  const options = dropdown?.querySelector('.dropdown-options');
  const selected = dropdown?.querySelector('.dropdown-selected');

  // Check if click is outside the dropdown
  if (dropdown && options && selected && !dropdown.contains(event.target as Node)) {
    options.classList.remove('open');
    selected.classList.remove('open');
  }
}, true);

// Copy text to clipboard
function copyToClipboard(text: string, element?: HTMLElement): void {
  // Create a textarea element to copy from
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';  // Avoid scrolling to bottom
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand('copy');

    // Show visual feedback
    if (element) {
      // Add success class for visual feedback
      element.classList.add('copy-success');

      // Update tooltip if it exists
      const tooltip = element.querySelector('.copy-tooltip');
      if (tooltip) {
        tooltip.textContent = 'Copied!';
      }

      // Reset after animation
      setTimeout(() => {
        element.classList.remove('copy-success');
        if (tooltip) {
          tooltip.textContent = 'Click to copy';
        }
      }, 2000);
    }

    // Show toast notification
    if (successful) {
      getToast().success("Copied to clipboard! 📋", {
        position: 'bottom-right',
        theme: themes[currentFramework]
      });
    } else {
      getToast().error("Failed to copy to clipboard 😞", {
        position: 'bottom-right',
        theme: themes[currentFramework]
      });
    }
  } catch (err) {
    console.error('Unable to copy to clipboard', err);

    // Show error toast
    getToast().error("Failed to copy to clipboard 😞", {
      position: 'bottom-right',
      theme: themes[currentFramework]
    });
  }

  // Clean up
  document.body.removeChild(textArea);
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

// Function to update the stepper content based on the selected framework
function updateStepperContent(framework: 'react' | 'vue') {
  const stepsContainer = document.getElementById('framework-steps');
  if (!stepsContainer) return;

  let stepsHTML = '';

  if (framework === 'react') {
    stepsHTML = `
      <div class="step">
        <span class="step-number">1</span>
        <p>Install the package for your framework</p>
        <code data-copy="npm install @cross-toast/react"><span>npm install @cross-toast/react</span><span class="copy-tooltip">Click to copy</span></code>
      </div>
      <div class="step">
        <span class="step-number">2</span>
        <p>Import and use in your component</p>
        <code data-copy="import { toast } from '@cross-toast/react';"><span>import { toast } from '@cross-toast/react';</span><span class="copy-tooltip">Click to copy</span></code>
      </div>
      <div class="step">
        <span class="step-number">3</span>
        <p>Show a toast with one line</p>
        <code data-copy="toast.success('Operation successful!');"><span>toast.success('Operation successful!');</span><span class="copy-tooltip">Click to copy</span></code>
      </div>
    `;
  } else {
    stepsHTML = `
      <div class="step">
        <span class="step-number">1</span>
        <p>Install the package for your framework</p>
        <code data-copy="npm install @cross-toast/vue"><span>npm install @cross-toast/vue</span><span class="copy-tooltip">Click to copy</span></code>
      </div>
      <div class="step">
        <span class="step-number">2</span>
        <p>Import the toast in your component</p>
        <code data-copy="import { toast } from '@cross-toast/vue';"><span>import { toast } from '@cross-toast/vue';</span><span class="copy-tooltip">Click to copy</span></code>
      </div>
      <div class="step">
        <span class="step-number">3</span>
        <p>Show a toast in your methods</p>
        <code data-copy="toast.success('Action completed!', { position: 'bottom-left' });"><span>toast.success('Action completed!', { position: 'bottom-left' });</span><span class="copy-tooltip">Click to copy</span></code>
      </div>
    `;
  }

  stepsContainer.innerHTML = stepsHTML;

  // Re-initialize code copy handlers for the updated stepper
  document.querySelectorAll('.step code').forEach(codeElement => {
    codeElement.addEventListener('click', function (this: HTMLElement) {
      const textToCopy = this.getAttribute('data-copy') || this.textContent || '';
      copyToClipboard(textToCopy, this);
    });
  });
}

// Function to demo toast with current type
function tryToastDemo(): void {
  const type = currentToastType;
  const toast = getToast();
  const message = `This is a toasty ${type} toast! 🎯`;

  switch (type) {
    case 'success':
      toast.success(message, {
        position: 'bottom-right',
        theme: themes[currentFramework]
      });
      break;
    case 'error':
      toast.error(message, {
        position: 'bottom-right',
        theme: themes[currentFramework]
      });
      break;
    case 'info':
      toast.info(message, {
        position: 'bottom-right',
        theme: themes[currentFramework]
      });
      break;
    default:
      toast.show({
        message,
        position: 'bottom-right',
        type,
        theme: themes[currentFramework]
      });
  }
}

// Initialize UI once document is loaded
document.addEventListener('DOMContentLoaded', function () {
  // Set initial theme based on current framework
  document.documentElement.setAttribute('data-theme', themes[currentFramework]);

  // Set initial UI state for the current framework
  updateUIForCurrentFramework(currentFramework);

  // Initialize stepper content for the default framework
  updateStepperContent(currentFramework);

  // Ensure the correct framework tab is rendered on initial load
  switchTab(currentFramework);

  // Close dropdown when clicking on dropdown options (to avoid bubbling)
  document.querySelectorAll('.dropdown-option').forEach(option => {
    option.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  });

  // Initialize code copy handlers
  initializeCodeCopyHandlers();
});

document.head.innerHTML += `
  <!-- Primary Meta Tags -->
  <title>Cross-Toast - Beautiful Toast Notifications for React and Vue</title>
  <meta name="title" content="Cross-Toast - Beautiful Toast Notifications for React and Vue">
  <meta name="description" content="A lightweight, customizable toast notification library with beautiful animations and theme support for React and Vue applications.">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://sambabib.github.io/cross-toast/>
  <meta property="og:title" content="Cross-Toast - Beautiful Toast Notifications for React and Vue">
  <meta property="og:description" content="A lightweight, customizable toast notification library with beautiful animations and theme support for React and Vue applications.">

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="https://sambabib.github.io/cross-toast/">
  <meta property="twitter:title" content="Cross-Toast - Beautiful Toast Notifications for React and Vue">
  <meta property="twitter:description" content="A lightweight, customizable toast notification library with beautiful animations and theme support for React and Vue applications.">

  <!-- Additional SEO Tags -->
  <meta name="keywords" content="toast notifications, react toast, vue toast, javascript notifications, ui components, web development">
  <meta name="robots" content="index, follow">
  <meta name="language" content="English">
  <meta name="author" content="Cross-Toast">
  <link rel="canonical" href="https://sambabib.github.io/cross-toast/">
`;
