import React from 'react';
import { createRoot } from 'react-dom/client';
import { createApp, h } from 'vue';
import { ReactToast } from '../react/Toast';
import VueToast from '../vue/Toast.vue';
import type { ToastPosition, ToastType } from '../types';

// Add demo styles
const style = document.createElement('style');
style.textContent = `
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    margin: 0;
    padding: 20px;
    background-color: #f5f5f5;
  }
  .container {
    max-width: 800px;
    margin: 0 auto;
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  h1 { color: #333; margin-bottom: 2rem; }
  .demo-section {
    margin-bottom: 2rem;
    padding: 1rem;
    border: 1px solid #eee;
    border-radius: 4px;
  }
  .demo-section h2 { color: #666; }
  button {
    background: #4CAF50;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    margin: 4px;
  }
  button:hover { background: #45a049; }
  .controls {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    margin-bottom: 1rem;
  }
  select {
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ddd;
  }
`;
document.head.appendChild(style);

// Create demo UI
const container = document.createElement('div');
container.innerHTML = `
  <div class="container">
    <h1>Cross-Toast Demo</h1>
    
    <div class="demo-section">
      <h2>React Toast</h2>
      <div class="controls">
        <select id="react-position">
          <option value="top-right">Top Right</option>
          <option value="top-left">Top Left</option>
          <option value="bottom-right">Bottom Right</option>
          <option value="bottom-left">Bottom Left</option>
        </select>
        <select id="react-type">
          <option value="success">Success</option>
          <option value="error">Error</option>
        </select>
        <select id="react-theme">
          <option value="auto">Auto Theme</option>
          <option value="light">Light Theme</option>
          <option value="dark">Dark Theme</option>
        </select>
      </div>
      <button onclick="window.showReactToast()">Show React Toast</button>
    </div>

    <div class="demo-section">
      <h2>Vue Toast</h2>
      <div class="controls">
        <select id="vue-position">
          <option value="top-right">Top Right</option>
          <option value="top-left">Top Left</option>
          <option value="bottom-right">Bottom Right</option>
          <option value="bottom-left">Bottom Left</option>
        </select>
        <select id="vue-type">
          <option value="success">Success</option>
          <option value="error">Error</option>
        </select>
        <select id="vue-theme">
          <option value="auto">Auto Theme</option>
          <option value="light">Light Theme</option>
          <option value="dark">Dark Theme</option>
        </select>
      </div>
      <button onclick="window.showVueToast()">Show Vue Toast</button>
    </div>
  </div>
`;
document.body.appendChild(container);

// Setup React toast demo
const reactRoot = document.createElement('div');
reactRoot.id = 'react-root';
document.body.appendChild(reactRoot);
const reactRootInstance = createRoot(reactRoot);

function showReactToast() {
  const position = (document.getElementById('react-position') as HTMLSelectElement).value as ToastPosition;
  const type = (document.getElementById('react-type') as HTMLSelectElement).value as ToastType;
  const theme = (document.getElementById('react-theme') as HTMLSelectElement).value as 'light' | 'dark' | 'auto';

  reactRootInstance.render(
    React.createElement(ReactToast, {
      message: `This is a ${type} toast message!`,
      position,
      type,
      theme,
      onHide: () => reactRootInstance.render(null),
    })
  );
}

// Setup Vue toast demo
function showVueToast() {
  const position = (document.getElementById('vue-position') as HTMLSelectElement).value as ToastPosition;
  const type = (document.getElementById('vue-type') as HTMLSelectElement).value as ToastType;
  const theme = (document.getElementById('vue-theme') as HTMLSelectElement).value as 'light' | 'dark' | 'auto';

  const mountEl = document.createElement('div');
  document.body.appendChild(mountEl);

  const app = createApp({
    render() {
      return h(VueToast, {
        message: `This is a ${type} toast message!`,
        position,
        type,
        theme,
        duration: 3000,
        onHide: () => {
          app.unmount();
          mountEl.remove();
        }
      });
    }
  });

  app.mount(mountEl);
}

// Expose functions to window
window.showReactToast = showReactToast;
window.showVueToast = showVueToast;

// TypeScript declarations
declare global {
  interface Window {
    showReactToast: typeof showReactToast;
    showVueToast: typeof showVueToast;
  }
}
