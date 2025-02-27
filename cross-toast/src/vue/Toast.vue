<template>
  <transition name="toast">
    <div v-if="visible" class="toast-container" :class="[type]">
      <div class="toast-content">{{ message }}</div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue';
import type { ToastProps } from '../types';

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
  },
  emits: ['hide'],
  setup(props, { emit }) {
    const visible = ref(true);

    onMounted(() => {
      setTimeout(() => {
        visible.value = false;
        emit('hide');
      }, props.duration);
    });

    return {
      visible,
    };
  },
});
</script>

<style scoped>
.toast-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  max-width: 300px;
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

.toast-enter-active {
  animation: slideIn 0.3s ease-out;
}

.toast-leave-active {
  animation: fadeOut 0.5s ease-in-out forwards;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
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