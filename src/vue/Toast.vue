<template>
  <div v-if="show" :class="['toast-container', position, type, theme, isVisible ? 'visible' : '']">
    <div :class="['toast-content', exiting ? 'exit' : '']">{{ message }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue';
import type { ToastProps, ToastPosition } from '../types';

export default defineComponent({
  name: 'VueToast',
  props: {
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String as () => ToastProps['type'],
      default: 'success',
    },
    duration: {
      type: Number,
      default: 3000,
    },
    position: {
      type: String as () => ToastPosition,
      default: 'bottom-right',
    },
    theme: {
      type: String as () => 'light' | 'dark' | 'auto',
      default: 'auto',
    },
  },
  emits: ['hide'],
  setup(props, { emit }) {
    const show = ref(true);
    const isVisible = ref(false);
    const exiting = ref(false);
    let timer: null | ReturnType<typeof setTimeout> = null;

    const onAfterLeave = () => {
      emit('hide');
    };

    onMounted(() => {
      // Set a small delay before adding the visible class to ensure the initial state is rendered
      setTimeout(() => {
        isVisible.value = true;
      }, 10);

      timer = setTimeout(() => {
        // Start exit animation
        exiting.value = true;
        
        // After animation completes, hide the toast
        setTimeout(() => {
          show.value = false;
          onAfterLeave();
        }, 350); // Match CSS transition duration for exit animation
      }, props.duration);
    });

    onBeforeUnmount(() => {
      if (timer) clearTimeout(timer);
    });

    return {
      show,
      isVisible,
      exiting,
      onAfterLeave,
    };
  },
});
</script>

<style scoped>
:root {
  /* Light theme (default) */
  --toast-bg-light: white;
  --toast-text-light: #333;
  --toast-shadow-light: rgba(0, 0, 0, 0.1);
  --toast-success-light: #4CAF50;
  --toast-error-light: #f44336;
  
  /* Dark theme */
  --toast-bg-dark: #333;
  --toast-text-dark: #f0f0f0;
  --toast-shadow-dark: rgba(0, 0, 0, 0.3);
  --toast-success-dark: #5CDF60;
  --toast-error-dark: #ff6b6b;
}

.toast-container {
  position: fixed;
  z-index: 1000;
  max-width: 300px;
  --toast-bg: var(--toast-bg-light);
  --toast-text: var(--toast-text-light);
  --toast-shadow: var(--toast-shadow-light);
  --toast-success: var(--toast-success-light);
  --toast-error: var(--toast-error-light);
}

/* Theme classes */
.dark {
  --toast-bg: var(--toast-bg-dark);
  --toast-text: var(--toast-text-dark);
  --toast-shadow: var(--toast-shadow-dark);
  --toast-success: var(--toast-success-dark);
  --toast-error: var(--toast-error-dark);
}

.auto {
  --toast-bg: var(--toast-bg-light);
  --toast-text: var(--toast-text-light);
  --toast-shadow: var(--toast-shadow-light);
  --toast-success: var(--toast-success-light);
  --toast-error: var(--toast-error-light);
}

@media (prefers-color-scheme: dark) {
  .auto {
    --toast-bg: var(--toast-bg-dark);
    --toast-text: var(--toast-text-dark);
    --toast-shadow: var(--toast-shadow-dark);
    --toast-success: var(--toast-success-dark);
    --toast-error: var(--toast-error-dark);
  }
}

/* Positions */
.top-right { top: 20px; right: 20px; }
.top-left { top: 20px; left: 20px; }
.bottom-right { bottom: 20px; right: 20px; }
.bottom-left { bottom: 20px; left: 20px; }

/* Toast content base styles */
.toast-content {
  background-color: var(--toast-bg);
  color: var(--toast-text);
  padding: 12px 24px;
  border-radius: 25px;
  box-shadow: 0 4px 6px var(--toast-shadow);
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-left: 1px solid;
  border-bottom: 1px solid;
  font-size: 12px;
  opacity: 0;
  will-change: transform, opacity;
  /* Default transition for all toasts - smooth buttery curve */
  transition: transform 450ms cubic-bezier(0.25, 0.1, 0.25, 1.0),
              opacity 250ms ease-in-out;
}

/* Types */
.success .toast-content { border-color: var(--toast-success); }
.error .toast-content { border-color: var(--toast-error); }

/* Initial positions for entry animations */
.top-right .toast-content {
  transform: translateX(120%);
}

.bottom-right .toast-content {
  transform: translateX(120%);
}

.top-left .toast-content {
  transform: translateX(-120%);
}

.bottom-left .toast-content {
  transform: translateX(-120%);
}

/* Active state */
.toast-container.visible .toast-content {
  opacity: 1;
  transform: translateX(0);
}

/* Exit animations */
.top-right .toast-content.exit {
  opacity: 0;
  transform: translateY(-100%);
  transition: transform 350ms cubic-bezier(0.25, 0.1, 0.25, 1.0),
              opacity 250ms ease-in-out;
}

.bottom-right .toast-content.exit {
  opacity: 0;
  transform: translateY(100%);
  transition: transform 350ms cubic-bezier(0.25, 0.1, 0.25, 1.0),
              opacity 250ms ease-in-out;
}

.top-left .toast-content.exit {
  opacity: 0;
  transform: translateY(-100%);
  transition: transform 350ms cubic-bezier(0.25, 0.1, 0.25, 1.0),
              opacity 250ms ease-in-out;
}

.bottom-left .toast-content.exit {
  opacity: 0;
  transform: translateY(100%);
  transition: transform 350ms cubic-bezier(0.25, 0.1, 0.25, 1.0),
              opacity 250ms ease-in-out;
}
</style>