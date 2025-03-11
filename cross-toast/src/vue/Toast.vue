<template>
  <transition :name="animationName">
    <div v-if="show" :class="['toast-container', position, type]">
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
  },
  emits: ['hide'],
  setup(props, { emit }) {
    const show = ref(true);
    let timer: null | ReturnType<typeof setTimeout> = null;

    const animationName = computed(() => {
      return props.position.includes('left') ? 'toast-left' : 'toast-right';
    });

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
  font-size: 14px;
}

.success .toast-content {
  border-color: #4CAF50;
}

.error .toast-content {
  border-color: #f44336;
}

/* Improved Animation classes */
.toast-right-enter-active {
  transition: all 0.3s ease-out;
}

.toast-right-leave-active {
  transition: all 0.5s ease-in-out;
}

.toast-right-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.toast-right-leave-to {
  transform: translateX(10%);
  opacity: 0;
}

.toast-left-enter-active {
  transition: all 0.3s ease-out;
}

.toast-left-leave-active {
  transition: all 0.5s ease-in-out;
}

.toast-left-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}

.toast-left-leave-to {
  transform: translateX(-10%);
  opacity: 0;
}
</style>