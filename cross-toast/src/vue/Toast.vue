<template>
  <transition :name="animationName">
    <div v-if="visible" :class="['toast-container', position, type]">
      <div class="toast-content">{{ message }}</div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
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
  },
  emits: ['hide'],
  setup(props, { emit }) {
    const visible = ref(true);

    const animationName = computed(() => {
      return props.position.includes('left') ? 'toast-left' : 'toast-right';
    });

    onMounted(() => {
      setTimeout(() => {
        visible.value = false;
      }, props.duration);

      // Emit hide after animation completes
      setTimeout(() => {
        emit('hide');
      }, props.duration + 500); // duration + animation time
    });

    return {
      visible,
      animationName,
    };
  },
});
</script>

<style scoped>
.toast-container {
  position: fixed;
  z-index: 1000;
  max-width: 300px;
}

/* Position classes */
.top-right {
  top: 20px;
  right: 20px;
}

.top-left {
  top: 20px;
  left: 20px;
}

.bottom-right {
  bottom: 20px;
  right: 20px;
}

.bottom-left {
  bottom: 20px;
  left: 20px;
}

.toast-content {
  background-color: white;
  color: #333;
  padding: 12px 24px;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-left: 2px solid;
}

.success .toast-content {
  border-color: #4CAF50;
}

.error .toast-content {
  border-color: #f44336;
}

/* Animation classes */
.toast-right-enter-active {
  animation: slideInRight 0.3s ease-out;
}

.toast-right-leave-active {
  animation: fadeOut 0.5s ease-in-out forwards;
}

.toast-left-enter-active {
  animation: slideInLeft 0.3s ease-out;
}

.toast-left-leave-active {
  animation: fadeOut 0.5s ease-in-out forwards;
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
  }

  to {
    transform: translateX(0);
  }
}

@keyframes slideInLeft {
  from {
    transform: translateX(-100%);
  }

  to {
    transform: translateX(0);
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}
</style>