# Cross-Toast

[![npm version](https://img.shields.io/npm/v/cross-toast.svg)](https://www.npmjs.com/package/cross-toast)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/cross-toast)](https://bundlephobia.com/package/cross-toast)
[![License](https://img.shields.io/npm/l/cross-toast.svg)](https://github.com/sambabib/cross-toast/blob/main/LICENSE)

A lightweight, customizable toast notification library that works seamlessly across React and Vue.

## Features

-  **Framework Support** - Works with both React and Vue
-  **Customizable Positioning** - Place toasts in any corner of the screen
-  **Beautiful Animations** - Smooth enter/exit transitions with consistent behavior across frameworks
-  **Toast Types** - Success, Error, and Info types with customizable styling
-  **Theme Support** - Light, dark, and auto themes available
-  **Lightweight** - < 5KB minified and gzipped
-  **Zero Dependencies** - No bloat, just what you need
-  **TypeScript Support** - Full type definitions included

## Demo

Check out the [live demo](https://cross-toast-demo.vercel.app) to see Cross-Toast in action.

![Cross-Toast Demo](https://github.com/sambabib/cross-toast/raw/main/docs/images/demo.gif)

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

Cross Toast provides a simple, intuitive API for displaying toast notifications in your React applications.

#### Basic Usage

The simplest way to use Cross Toast is with the toast function API:

```tsx
import { toast } from 'cross-toast/react';

function App() {
  const showToast = () => {
    // Show a success toast with default options
    toast.success('Operation successful!');
    
    // Or show an error toast
    toast.error('Something went wrong!');
    
    // Or an info toast
    toast.info('This is an informational message');
  };

  return <button onClick={showToast}>Show Toast</button>;
}
```

#### With Custom Options

You can customize the toast by providing additional options:

```tsx
import { toast } from 'cross-toast/react';

function App() {
  const showCustomToast = () => {
    toast.success('Operation successful!', {
      position: 'top-right',      // 'top-right', 'top-left', 'bottom-right', 'bottom-left'
      duration: 5000,             // Duration in milliseconds
      theme: 'dark',              // 'light', 'dark', or 'auto'
    });
  };

  return <button onClick={showCustomToast}>Show Custom Toast</button>;
}
```

#### Advanced Usage

For more control, you can use the `show` method directly:

```tsx
import { toast } from 'cross-toast/react';
import type { ToastProps } from 'cross-toast/react';

function App() {
  const showAdvancedToast = () => {
    const id = toast.show({
      message: 'This is a fully customized toast',
      type: 'success',             // 'success', 'error', or 'info'
      position: 'bottom-left',
      duration: 4000,
      theme: 'auto',
      onHide: () => console.log('Toast was hidden')
    });
    
    // You can dismiss the toast programmatically
    // setTimeout(() => toast.dismiss(id), 2000);
  };
  
  const dismissAllToasts = () => {
    toast.dismissAll();
  };

  return (
    <div>
      <button onClick={showAdvancedToast}>Show Advanced Toast</button>
      <button onClick={dismissAllToasts}>Dismiss All Toasts</button>
    </div>
  );
}
```

#### Using the Component Directly (Alternative)

If you need more control over the rendering process, you can still use the `ReactToast` component directly:

```tsx
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

Cross Toast provides an equivalent API for Vue applications.

#### Basic Usage

The simplest way to use Cross Toast is with the toast function API:

```vue
<template>
  <button @click="showToast">Show Toast</button>
</template>

<script>
import { toast } from 'cross-toast/vue';

export default {
  methods: {
    showToast() {
      // Show a success toast with default options
      toast.success('Operation successful!');
      
      // Or show an error toast
      toast.error('Something went wrong!');
      
      // Or an info toast
      toast.info('This is an informational message');
    }
  }
}
</script>
```

#### With Custom Options

You can customize the toast by providing additional options:

```vue
<template>
  <button @click="showCustomToast">Show Custom Toast</button>
</template>

<script>
import { toast } from 'cross-toast/vue';

export default {
  methods: {
    showCustomToast() {
      toast.success('Operation successful!', {
        position: 'top-right',      // 'top-right', 'top-left', 'bottom-right', 'bottom-left'
        duration: 5000,             // Duration in milliseconds
        theme: 'dark',              // 'light', 'dark', or 'auto'
      });
    }
  }
}
</script>
```

#### Advanced Usage

For more control, you can use the `show` method directly:

```vue
<template>
  <div>
    <button @click="showAdvancedToast">Show Advanced Toast</button>
    <button @click="dismissAllToasts">Dismiss All Toasts</button>
  </div>
</template>

<script>
import { toast } from 'cross-toast/vue';

export default {
  methods: {
    showAdvancedToast() {
      const id = toast.show({
        message: 'This is a fully customized toast',
        type: 'success',             // 'success', 'error', or 'info'
        position: 'bottom-left',
        duration: 4000,
        theme: 'auto',
        onHide: () => console.log('Toast was hidden')
      });
      
      // You can dismiss the toast programmatically
      // setTimeout(() => toast.dismiss(id), 2000);
    },
    
    dismissAllToasts() {
      toast.dismissAll();
    }
  }
}
</script>
```

#### Using the Component Directly (Alternative)

If you need more control over the rendering process, you can still use the `VueToast` component directly:

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

Cross-Toast comes with default styling that you can customize by overriding the CSS variables or classes.

### CSS Variables

You can customize the appearance by overriding these CSS variables:

```css
:root {
  --toast-bg: #ffffff;
  --toast-text: #333333;
  --toast-shadow: rgba(0, 0, 0, 0.1);
  --toast-success: #4caf50;
  --toast-error: #f44336;
  --toast-info: #2196f3;
  --toast-border-radius: 10px;
}
```

### Custom Class Overrides

You can also target specific classes for more detailed customization:

```css
/* Override container styles */
.toast-container {
  max-width: 400px;
  padding: 12px;
}

/* Override success type */
.toast-content.success {
  background-image: linear-gradient(to right, #00c853, #00e676);
  color: white;
}

/* Override error type */
.toast-content.error {
  background-image: linear-gradient(to right, #d50000, #ff1744);
  color: white;
}

/* Override info type */
.toast-content.info {
  background-image: linear-gradient(to right, #0091ea, #00b0ff);
  color: white;
}
```

## TypeScript Support

Cross-Toast comes with full TypeScript definitions. The main types available are:

```typescript
// Toast position options
type ToastPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

// Toast type options
type ToastType = 'success' | 'error' | 'info';

// Toast theme options
type ToastTheme = 'light' | 'dark' | 'auto';

// Toast base properties
interface ToastProps {
  message: string;
  type?: ToastType;
  position?: ToastPosition;
  duration?: number;
  theme?: ToastTheme;
  onHide?: () => void;
}

// Toast API interface
interface ToastAPI {
  show: (props: ToastProps, theme?: ToastTheme) => string;
  success: (message: string, options?: Partial<Omit<ToastProps, 'message' | 'type'>>) => string;
  error: (message: string, options?: Partial<Omit<ToastProps, 'message' | 'type'>>) => string;
  info: (message: string, options?: Partial<Omit<ToastProps, 'message' | 'type'>>) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}
```

Usage example:

```typescript
import { toast, ToastProps } from 'cross-toast/react';

const customToast: ToastProps = {
  message: 'Typed toast notification',
  type: 'success',
  position: 'top-right',
  duration: 5000,
  theme: 'dark',
  onHide: () => console.log('Toast hidden')
};

toast.show(customToast);
```

## API Reference

### Toast Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `message` | string | required | The message to display in the toast |
| `type` | string | `'success'` | Toast type: `'success'`, `'error'`, or `'info'` |
| `position` | string | `'bottom-right'` | Position on screen: `'top-left'`, `'top-right'`, `'bottom-left'`, `'bottom-right'` |
| `duration` | number | `3000` | Duration in ms before the toast disappears |
| `theme` | string | `'auto'` | Theme to use: `'light'`, `'dark'`, or `'auto'` (follows system preference) |
| `onHide` | function | `undefined` | Callback function when toast is hidden |

### Toast API Methods

| Method | Parameters | Return | Description |
|--------|------------|--------|-------------|
| `show` | `props: ToastProps, theme?: ToastTheme` | `string` (toast ID) | Shows a toast with custom properties |
| `success` | `message: string, options?: Partial<ToastProps>` | `string` (toast ID) | Shows a success toast |
| `error` | `message: string, options?: Partial<ToastProps>` | `string` (toast ID) | Shows an error toast |
| `info` | `message: string, options?: Partial<ToastProps>` | `string` (toast ID) | Shows an info toast |
| `dismiss` | `id: string` | `void` | Dismisses a specific toast by ID |
| `dismissAll` | none | `void` | Dismisses all active toasts |

## Accessibility

Cross-Toast implements accessibility features to ensure a good experience for all users:

- Toast notifications use appropriate ARIA roles and attributes
- High contrast themes ensure readability
- Keyboard focus management for interactive elements
- Screen reader friendly notifications

## Browser Support

Cross-Toast supports all modern browsers:

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## Troubleshooting

### Common Issues

#### Toasts not showing up

If toasts aren't appearing, check:
- You're importing from the correct path (`cross-toast/react` or `cross-toast/vue`)
- You have the correct CSS imported or included
- There are no CSS conflicts with existing styles in your application

#### Z-index Issues

If toasts appear behind other elements:
```css
.toast-container {
  z-index: 9999; /* Increase this value */
}
```

#### Animation Issues

If animations aren't working:
- Ensure you haven't disabled animations in your browser
- Check for CSS conflicts that might be overriding the animation properties


## License

MIT 
