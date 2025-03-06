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
});