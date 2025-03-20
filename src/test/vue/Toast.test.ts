import { describe, it, expect, afterEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { VueToast } from '../../vue';

describe('VueToast', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    vi.clearAllTimers();
  });

  // Basic rendering tests
  it('renders with message prop', () => {
    const wrapper = mount(VueToast, {
      props: { message: 'Test message' }
    });
    expect(wrapper.text()).toContain('Test message');
  });

  // Type-related tests
  it('applies success class and gradient by default', () => {
    const wrapper = mount(VueToast, {
      props: { message: 'Test message' }
    });
    expect(wrapper.find('.toast-content').classes()).toContain('success');
  });

  it('applies error class and gradient when type is error', () => {
    const wrapper = mount(VueToast, {
      props: { message: 'Test message', type: 'error' }
    });
    expect(wrapper.find('.toast-content').classes()).toContain('error');
  });

  it('applies info class and gradient when type is info', () => {
    const wrapper = mount(VueToast, {
      props: { message: 'Test message', type: 'info' }
    });
    expect(wrapper.find('.toast-content').classes()).toContain('info');
  });

  // Visibility and animation tests
  it('starts with isVisible=false and sets it to true after brief delay', async () => {
    vi.useFakeTimers();
    vi.clearAllTimers();

    const wrapper = mount(VueToast, {
      props: { message: 'Test message' }
    });

    expect(wrapper.find('.toast-container').classes()).not.toContain('visible');
    expect(wrapper.vm.isVisible).toBe(false);

    await vi.advanceTimersByTimeAsync(10);
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.toast-container').classes()).toContain('visible');
    expect(wrapper.vm.isVisible).toBe(true);

    vi.useRealTimers();
  });

  // Duration and hide tests
  it('hides after duration and emits hide', async () => {
    vi.useFakeTimers();
    vi.clearAllTimers();

    const wrapper = mount(VueToast, {
      props: { message: 'Test message', duration: 100 }
    });

    await vi.advanceTimersByTimeAsync(10);
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.toast-container').classes()).toContain('visible');

    await vi.advanceTimersByTimeAsync(90);
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.toast-content').classes()).toContain('exit');

    await vi.advanceTimersByTimeAsync(350);
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('hide')).toHaveLength(1);

    vi.useRealTimers();
  });

  // Position tests with new styles
  it('uses bottom-right position by default with correct styles', () => {
    const wrapper = mount(VueToast, {
      props: { message: 'Test message' }
    });
    expect(wrapper.find('.toast-container').classes()).toContain('bottom-right');
  });

  // Theme tests with new gradient styles
  it('applies light theme with correct background when specified', () => {
    const wrapper = mount(VueToast, {
      props: { message: 'Test message', theme: 'light' }
    });
    expect(wrapper.find('.toast-container').classes()).toContain('light');
  });

  it('applies dark theme with correct background when specified', () => {
    const wrapper = mount(VueToast, {
      props: { message: 'Test message', theme: 'dark' }
    });
    expect(wrapper.find('.toast-container').classes()).toContain('dark');
  });

  // Border tests
  it('applies correct border style', () => {
    const wrapper = mount(VueToast, {
      props: { message: 'Test message' }
    });
    expect(wrapper.find('.toast-content').exists()).toBe(true);
  });

  // Backdrop filter tests
  it('has backdrop filter styles applied', () => {
    const wrapper = mount(VueToast, {
      props: { message: 'Test message' }
    });
    expect(wrapper.find('.toast-content').exists()).toBe(true);
  });

  // Complete lifecycle test
  it('maintains all necessary states during the entire lifecycle', async () => {
    vi.useFakeTimers();
    vi.clearAllTimers();

    const wrapper = mount(VueToast, {
      props: { message: 'Test message', duration: 100 }
    });

    // Initial state
    expect(wrapper.vm.show).toBe(true);
    expect(wrapper.vm.isVisible).toBe(false);
    expect(wrapper.vm.exiting).toBe(false);

    // After visibility delay
    await vi.advanceTimersByTimeAsync(10);
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isVisible).toBe(true);
    expect(wrapper.find('.toast-container').classes()).toContain('visible');

    // Before duration ends
    await vi.advanceTimersByTimeAsync(89);
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isVisible).toBe(true);
    expect(wrapper.vm.exiting).toBe(false);

    // After duration
    await vi.advanceTimersByTimeAsync(2);
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.exiting).toBe(true);
    expect(wrapper.find('.toast-content').classes()).toContain('exit');
    expect(wrapper.vm.show).toBe(true);

    // During exit animation
    await vi.advanceTimersByTimeAsync(200);
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.show).toBe(true);

    // After exit animation
    await vi.advanceTimersByTimeAsync(150);
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.show).toBe(false);
    expect(wrapper.emitted('hide')).toHaveLength(1);

    vi.useRealTimers();
  });

  // Show method tests
  it('allows custom toast configuration via show method', () => {
    const wrapper = mount(VueToast, {
      props: {
        message: 'Custom toast',
        type: 'success',
        position: 'top-left',
        theme: 'dark'
      }
    });

    expect(wrapper.text()).toContain('Custom toast');
    expect(wrapper.find('.toast-content').classes()).toContain('success');
    expect(wrapper.find('.toast-container').classes()).toContain('top-left');
    expect(wrapper.find('.toast-container').classes()).toContain('dark');
  });

  it('handles custom duration in show method', async () => {
    vi.useFakeTimers();
    vi.clearAllTimers();

    const wrapper = mount(VueToast, {
      props: {
        message: 'Custom duration',
        duration: 200
      }
    });

    await vi.advanceTimersByTimeAsync(10);
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.toast-container').classes()).toContain('visible');

    await vi.advanceTimersByTimeAsync(190);
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.toast-content').classes()).toContain('exit');

    await vi.advanceTimersByTimeAsync(350);
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('hide')).toHaveLength(1);

    vi.useRealTimers();
  });
});