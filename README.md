# Cross-Toast

[![npm version](https://img.shields.io/npm/v/cross-toast.svg)](https://www.npmjs.com/package/cross-toast)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/cross-toast)](https://bundlephobia.com/package/cross-toast)
[![License](https://img.shields.io/npm/l/cross-toast.svg)](https://github.com/sambabib/cross-toast/blob/main/LICENSE)

A lightweight, customizable toast notification library that works seamlessly across Vue, React, and vanilla JavaScript.

## Features

-  **Framework Agnostic** - Works with Vue, React, or vanilla JavaScript
-  **Customizable Positioning** - Place toasts in any corner of the screen
-  **Beautiful Animations** - Smooth enter/exit transitions with consistent behavior across frameworks
-  **Toast Types** - Success and Error types with customizable styling
-  **Theme Support** - Light, dark, and auto themes available
-  **Lightweight** - < 5KB minified and gzipped
-  **Zero Dependencies** - No bloat, just what you need

## Installation

```bash
# npm
npm install cross-toast

# yarn
yarn add cross-toast

# pnpm
pnpm add cross-toast
```

## Quick Start

### React

```jsx
import { ReactToast } from 'cross-toast/react';
import { createRoot } from 'react-dom/client';

function App() {
  const showToast = () => {
    // Create a mount element
    const toastElement = document.createElement('div');
    document.body.appendChild(toastElement);
    
    // Render the toast component
    const root = createRoot(toastElement);
    root.render(
      <ReactToast
        message="Operation successful!"
        type="success"
        position="top-right"
        theme="light"
        duration={3000}
        onHide={() => {
          root.unmount();
          toastElement.remove();
        }}
      />
    );
  };

  return <button onClick={showToast}>Show Toast</button>;
}

```

### Vue

```vue
<template>
  <button @click="showToast">Show Toast</button>
</template>

<script>
import { createApp, h } from 'vue';
import { VueToast } from 'cross-toast/vue';

export default {
  methods: {
    showToast() {
      // Create a mount element
      const mountEl = document.createElement('div');
      document.body.appendChild(mountEl);
      
      // Create and mount the Vue app with the toast
      const app = createApp({
        render() {
          return h(VueToast, {
            message: 'Action completed!',
            type: 'success',
            position: 'bottom-left',
            theme: 'light',
            duration: 5000,
            onHide: () => {
              app.unmount();
              mountEl.remove();
            }
          });
        }
      });
      
      app.mount(mountEl);
    }
  }
}
</script>

### Vanilla JavaScript

```js
import { createToast } from 'cross-toast';

// Basic usage
createToast('Hello World!');

// With options
createToast({
  message: 'Operation successful!',
  type: 'success',
  position: 'top-right',
  theme: 'auto',
  duration: 3000
});

```

## How It Works

Cross-Toast renders toast notifications that automatically position themselves based on the `position` prop. Each toast:

1. Appears with a smooth entrance animation from the edge of the screen
2. Stays visible for the specified duration
3. Disappears with a smooth exit animation back to the edge
4. Calls the `onHide` callback when it's removed

The toast component handles its own lifecycle and cleanup, so you don't need to worry about managing DOM elements or timers.

### Animation System

Cross-Toast uses CSS transitions for smooth and consistent animations:

- **Entrance Animation**: Toasts slide in from the edge of the screen (left or right depending on position)
- **Exit Animation**: Toasts slide out in the reverse direction when dismissed
- **Timing**: All animations use a consistent 300ms duration with a natural easing curve
- **Framework Consistency**: Both React and Vue implementations share the same animation behavior

### Positioning System

Toasts can be positioned in any of the four corners of the screen:

- `top-left`: Appears in the top-left corner, slides in from the left
- `top-right`: Appears in the top-right corner, slides in from the right
- `bottom-left`: Appears in the bottom-left corner, slides in from the left
- `bottom-right`: Appears in the bottom-right corner, slides in from the right (default)

Each position has its own entrance and exit animation direction to provide a natural feel.

## Theming

Cross-Toast supports three theme options:

- `light`: Light theme with light backgrounds and dark text
- `dark`: Dark theme with dark backgrounds and light text
- `auto`: Automatically follows the user's system preference (default)

## Styling

Cross-Toast comes with default styling that you can customize by overriding the CSS variables or classes:

```css
/* Example of customizing toast styles using CSS variables */
:root {
  --toast-bg: #ffffff;
  --toast-text: #333333;
  --toast-shadow: rgba(0, 0, 0, 0.1);
  --toast-success: #4caf50;
  --toast-error: #f44336;
}

/* Or by overriding specific classes */
.toast-container {
  /* Your custom container styles */
}

.toast-content.success {
  /* Custom success toast styles */
}

.toast-content.error {
  /* Custom error toast styles */
}
```

## API Reference

### Toast Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `message` | string | required | The message to display in the toast |
| `type` | string | `'success'` | Toast type: `'success'` or `'error'` |
| `position` | string | `'bottom-right'` | Position on screen: `'top-left'`, `'top-right'`, `'bottom-left'`, `'bottom-right'` |
| `duration` | number | `3000` | Duration in ms before the toast disappears |
| `theme` | string | `'auto'` | Theme to use: `'light'`, `'dark'`, or `'auto'` (follows system preference) |
| `onHide` | function | `undefined` | Callback function when toast is hidden |

## Browser Support

Cross-Toast supports all modern browsers (Chrome, Firefox, Safari, Edge).

## License

MIT 
