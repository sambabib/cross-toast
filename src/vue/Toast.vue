<template>
  <transition :name="animationName" @after-leave="onAfterLeave">
    <div v-if="show" :class="['toast-container', position, type, theme]">
      <div class="toast-content">{{ message }}</div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed, onBeforeUnmount } from 'vue';
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
    let timer: null | ReturnType<typeof setTimeout> = null;

    const animationName = computed(() => {
      return props.position.includes('left') ? 'toast-left' : 'toast-right';
    });

    const onAfterLeave = () => {
      emit('hide');
    };

    onMounted(() => {
      timer = setTimeout(() => {
        show.value = false;
      }, props.duration);
    });

    onBeforeUnmount(() => {
      if (timer) clearTimeout(timer);
    });

    return {
      show,
      animationName,
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

.toast-content {
  background-color: var(--toast-bg);
  color: var(--toast-text);
  padding: 12px 24px;
  border-radius: 4px;
  box-shadow: 0 4px 6px var(--toast-shadow);
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-left: 4px solid;
  font-size: 14px;
  will-change: transform, opacity;
}

/* Types */
.success .toast-content { border-color: var(--toast-success); }
.error .toast-content { border-color: var(--toast-error); }

/* Right-side animations */
.toast-right-enter-active .toast-content {
  animation: slideInRight 300ms cubic-bezier(0.2, 0, 0, 1) forwards;
}

.toast-right-leave-active .toast-content {
  animation: slideOutRight 500ms cubic-bezier(0.4, 0, 1, 1) forwards;
}

/* Left-side animations */
.toast-left-enter-active .toast-content {
  animation: slideInLeft 300ms cubic-bezier(0.2, 0, 0, 1) forwards;
}

.toast-left-leave-active .toast-content {
  animation: slideOutLeft 500ms cubic-bezier(0.4, 0, 1, 1) forwards;
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideOutRight {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(10%);
    opacity: 0;
  }
}

@keyframes slideInLeft {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideOutLeft {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(-10%);
    opacity: 0;
  }
}
</style>