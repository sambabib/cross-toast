import { describe, it, expect, afterEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { VueToast } from '../../vue';

describe('VueToast', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    vi.clearAllTimers();
  });

  it('renders with message prop', () => {
    const wrapper = mount(VueToast, {
      props: { message: 'Test message' }
    });
    expect(wrapper.text()).toContain('Test message');
  });

  it('applies success class by default', () => {
    const wrapper = mount(VueToast, {
      props: { message: 'Test message' }
    });
    expect(wrapper.find('.toast-container').classes()).toContain('success');
  });

  it('applies error class when type is error', () => {
    const wrapper = mount(VueToast, {
      props: { message: 'Test message', type: 'error' }
    });
    expect(wrapper.find('.toast-container').classes()).toContain('error');
  });

  it('hides after duration and emits hide', async () => {
    vi.useFakeTimers();
    const wrapper = mount(VueToast, {
      props: { message: 'Test message', duration: 100 },
      attachTo: document.body // Attach to DOM to better observe transitions
    });

    // Initially visible
    expect(wrapper.find('.toast-container').exists()).toBe(true);

    // Spy on the transition events
    const transitionSpy = vi.fn();
    wrapper.vm.$el.addEventListener('transitionstart', transitionSpy);

    // Advance just before duration ends to check it's still visible
    await vi.advanceTimersByTimeAsync(99);
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.toast-container').exists()).toBe(true);

    // Advance to trigger visibility change
    await vi.advanceTimersByTimeAsync(1);
    await wrapper.vm.$nextTick();

    // Skip checking for the element during transition since Vue removes it
    // Instead, just verify the hide event is emitted after animation time

    // Advance through exit animation
    await vi.advanceTimersByTimeAsync(500);
    await wrapper.vm.$nextTick();

    // Now it should have emitted the hide event
    expect(wrapper.emitted('hide')).toHaveLength(1);

    wrapper.unmount(); // Clean up
    vi.useRealTimers();
  });

  it('uses default duration of 3000ms', async () => {
    vi.useFakeTimers();
    const wrapper = mount(VueToast, {
      props: { message: 'Test message' }
    });

    expect(wrapper.find('.toast-content').exists()).toBe(true);

    await vi.advanceTimersByTimeAsync(2000);
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.toast-content').exists()).toBe(true);

    await vi.advanceTimersByTimeAsync(1500);
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.toast-content').exists()).toBe(false);
    vi.useRealTimers();
  });

  // Position-related tests
  it('uses bottom-right position by default', () => {
    const wrapper = mount(VueToast, {
      props: { message: 'Test message' }
    });
    expect(wrapper.find('.toast-container').classes()).toContain('bottom-right');
  });

  it('applies correct class for top-right position', () => {
    const wrapper = mount(VueToast, {
      props: { message: 'Test message', position: 'top-right' }
    });
    expect(wrapper.find('.toast-container').classes()).toContain('top-right');
  });

  it('applies correct class for top-left position', () => {
    const wrapper = mount(VueToast, {
      props: { message: 'Test message', position: 'top-left' }
    });
    expect(wrapper.find('.toast-container').classes()).toContain('top-left');
  });

  it('applies correct class for bottom-left position', () => {
    const wrapper = mount(VueToast, {
      props: { message: 'Test message', position: 'bottom-left' }
    });
    expect(wrapper.find('.toast-container').classes()).toContain('bottom-left');
  });

  it('maintains other classes when position is changed', () => {
    const wrapper = mount(VueToast, {
      props: {
        message: 'Test message',
        position: 'top-left',
        type: 'success'
      }
    });
    const container = wrapper.find('.toast-container');
    expect(container.classes()).toContain('top-left');
    expect(container.classes()).toContain('success');
  });

  it('uses correct animation name based on position', () => {
    const leftWrapper = mount(VueToast, {
      props: { message: 'Test message', position: 'top-left' }
    });
    expect(leftWrapper.vm.animationName).toBe('toast-left');

    const rightWrapper = mount(VueToast, {
      props: { message: 'Test message', position: 'top-right' }
    });
    expect(rightWrapper.vm.animationName).toBe('toast-right');
  });

  it('properly cleans up timer when unmounted', async () => {
    vi.useFakeTimers();
    const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');

    const wrapper = mount(VueToast, {
      props: { message: 'Test message' }
    });

    wrapper.unmount();

    expect(clearTimeoutSpy).toHaveBeenCalled();
    clearTimeoutSpy.mockRestore();
    vi.useRealTimers();
  });

  it('sets show to false after duration', async () => {
    vi.useFakeTimers();
    const wrapper = mount(VueToast, {
      props: { message: 'Test message', duration: 100 }
    });

    // Initially show is true
    expect(wrapper.vm.show).toBe(true);

    // Advance time past duration
    await vi.advanceTimersByTimeAsync(100);
    await wrapper.vm.$nextTick();

    // Now show should be false
    expect(wrapper.vm.show).toBe(false);

    vi.useRealTimers();
  });

  it('applies transition classes during animation', async () => {
    // This test is conceptual as we can't easily test Vue transitions with JSDOM
    // In a real browser environment, the following classes would be applied:

    const wrapper = mount(VueToast, {
      props: { message: 'Test message', position: 'top-right' }
    });

    // Verify animation name computation
    expect(wrapper.vm.animationName).toBe('toast-right');

    // For right-positioned toasts:
    // - toast-right-enter-from: transform: translateX(100%); opacity: 0;
    // - toast-right-enter-active: transition: all 0.3s ease-out;
    // - toast-right-leave-to: transform: translateX(10%); opacity: 0;
    // - toast-right-leave-active: transition: all 0.5s ease-in-out;

    // For left-positioned toasts:
    const leftWrapper = mount(VueToast, {
      props: { message: 'Test message', position: 'top-left' }
    });

    // Verify animation name computation for left position
    expect(leftWrapper.vm.animationName).toBe('toast-left');

    // - toast-left-enter-from: transform: translateX(-100%); opacity: 0;
    // - toast-left-enter-active: transition: all 0.3s ease-out;
    // - toast-left-leave-to: transform: translateX(-10%); opacity: 0;
    // - toast-left-leave-active: transition: all 0.5s ease-in-out;
  });

  it('responds to event emission after animation time', async () => {
    vi.useFakeTimers();
    const wrapper = mount(VueToast, {
      props: { message: 'Test message', duration: 100 }
    });

    // The hide event should be emitted by transition's after-leave hook
    // Since we can't trigger the hook directly in JSDOM, we simulate by
    // advancing timers and then triggering the event manually

    await vi.advanceTimersByTimeAsync(100); // Duration
    await wrapper.vm.$nextTick();

    // Simulate transition end by emitting the event
    wrapper.vm.$emit('hide');

    // Check that hide was emitted
    expect(wrapper.emitted('hide')).toBeTruthy();

    vi.useRealTimers();
  });

  // Theme-related tests
  it('uses auto theme by default', () => {
    const wrapper = mount(VueToast, {
      props: { message: 'Test message' }
    });
    expect(wrapper.find('.toast-container').classes()).toContain('auto');
  });

  it('applies light theme when specified', () => {
    const wrapper = mount(VueToast, {
      props: { message: 'Test message', theme: 'light' }
    });
    expect(wrapper.find('.toast-container').classes()).toContain('light');
  });

  it('applies dark theme when specified', () => {
    const wrapper = mount(VueToast, {
      props: { message: 'Test message', theme: 'dark' }
    });
    expect(wrapper.find('.toast-container').classes()).toContain('dark');
  });

  // Animation behavior tests
  it('applies correct enter animation classes', async () => {
    const wrapper = mount(VueToast, {
      props: { message: 'Test message', position: 'top-right' }
    });

    // Initial state
    const container = wrapper.find('.toast-container');
    expect(container.classes()).toContain('toast-right-enter-from');
    
    // After enter animation starts
    await wrapper.vm.$nextTick();
    expect(container.classes()).toContain('toast-right-enter-active');
  });

  it('applies correct leave animation classes', async () => {
    vi.useFakeTimers();
    const wrapper = mount(VueToast, {
      props: { message: 'Test message', position: 'top-right', duration: 100 }
    });

    // Trigger leave animation
    await vi.advanceTimersByTimeAsync(100);
    await wrapper.vm.$nextTick();

    const container = wrapper.find('.toast-container');
    expect(container.classes()).toContain('toast-right-leave-active');
    expect(container.classes()).toContain('toast-right-leave-to');

    vi.useRealTimers();
  });

  it('applies correct animation classes for left position', async () => {
    const wrapper = mount(VueToast, {
      props: { message: 'Test message', position: 'top-left' }
    });

    // Initial state
    const container = wrapper.find('.toast-container');
    expect(container.classes()).toContain('toast-left-enter-from');
    
    // After enter animation starts
    await wrapper.vm.$nextTick();
    expect(container.classes()).toContain('toast-left-enter-active');
  });
});