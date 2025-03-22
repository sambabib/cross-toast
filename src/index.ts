// Export components for library usage
export { ReactToast } from './react/Toast.js';
export { default as VueToast } from './vue/Toast.vue';
export * from './types.js';

// Load demo in development mode only
if (import.meta.env.DEV) {
  import('./demo/main.js');
}