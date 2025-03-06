# Cross-Toast

[![npm version](https://img.shields.io/npm/v/cross-toast.svg)](https://www.npmjs.com/package/cross-toast)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/cross-toast)](https://bundlephobia.com/package/cross-toast)
[![License](https://img.shields.io/npm/l/cross-toast.svg)](https://github.com/sambabib/cross-toast/blob/main/LICENSE)

A lightweight, customizable toast notification library that works seamlessly across Vue, React, and vanilla JavaScript.

## Features

- 🦄 **Framework Agnostic** - Works with Vue, React, or vanilla JavaScript
- 🎯 **Customizable Positioning** - Place toasts in any corner of the screen
- ✨ **Beautiful Animations** - Smooth enter/exit transitions
- 🎨 **Toast Types** - Success and Error types with customizable styling
- 🪶 **Lightweight** - < 5KB minified and gzipped
- 🔧 **Zero Dependencies** - No bloat, just what you need

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

// Basic usage
ReactToast({
  message: 'Operation successful!',
  type: 'success',
  position: 'top-right',
  duration: 3000,
  onHide: () => console.log('Toast hidden')
});
```

### Vue

```vue
<template>
  <button @click="showToast">Show Toast</button>
</template>

<script>
import { VueToast } from 'cross-toast/vue';

export default {
  methods: {
    showToast() {
      VueToast({
        message: 'Action completed!',
        type: 'success',
        position: 'bottom-left',
        duration: 5000
      });
    }
  }
}
</script>
```

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
  duration: 3000
});
```

## API Reference

### Toast Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `message` | string | required | The message to display in the toast |
| `type` | string | `'success'` | Toast type: `'success'` or `'error'` |
| `position` | string | `'bottom-right'` | Position on screen: `'top-left'`, `'top-right'`, `'bottom-left'`, `'bottom-right'` |
| `duration` | number | `3000` | Duration in ms before the toast disappears |
| `onHide` | function | `undefined` | Callback function when toast is hidden |

## How It Works

Cross-Toast renders toast notifications that automatically position themselves based on the `position` prop. Each toast:

1. Appears with a smooth entrance animation
2. Stays visible for the specified duration
3. Disappears with a fade-out animation
4. Calls the `onHide` callback when it's removed

The toast component handles its own lifecycle and cleanup, so you don't need to worry about managing DOM elements or timers.

### Positioning System

Toasts can be positioned in any of the four corners of the screen:

- `top-left`: Appears in the top-left corner
- `top-right`: Appears in the top-right corner
- `bottom-left`: Appears in the bottom-left corner
- `bottom-right`: Appears in the bottom-right corner (default)

Each position has its own entrance animation direction to provide a natural feel.

## Styling

Cross-Toast comes with default styling that you can customize by overriding the CSS classes:

```css
/* Example of customizing toast styles */
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

## Browser Support

Cross-Toast supports all modern browsers (Chrome, Firefox, Safari, Edge).

## License

MIT © [Emmanuel Akala]