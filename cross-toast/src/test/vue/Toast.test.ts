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
      props: { message: 'Test message' },
    });
    expect(wrapper.text()).toContain('Test message');
  });

  it('applies success class by default', () => {
    const wrapper = mount(VueToast, {
      props: { message: 'Test message' },
    });
    expect(wrapper.find('.toast-container').classes()).toContain('success');
  });

  it('applies error class when type is error', () => {
    const wrapper = mount(VueToast, {
      props: { message: 'Test message', type: 'error' },
    });
    expect(wrapper.find('.toast-container').classes()).toContain('error');
  });

  it('hides after duration and emits hide event', async () => {
    vi.useFakeTimers();
    const wrapper = mount(VueToast, {
      props: { message: 'Test message', duration: 100 },
    });

    expect(wrapper.find('.toast-container').exists()).toBe(true);

    await vi.advanceTimersByTimeAsync(100);
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.toast-container').exists()).toBe(false);
    expect(wrapper.emitted('hide')).toHaveLength(1);
    vi.useRealTimers();
  });

  it('uses default duration of 3000ms', async () => {
    vi.useFakeTimers();
    const wrapper = mount(VueToast, {
      props: { message: 'Test message' },
    });

    expect(wrapper.find('.toast-container').exists()).toBe(true);

    await vi.advanceTimersByTimeAsync(2000);
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.toast-container').exists()).toBe(true);

    await vi.advanceTimersByTimeAsync(1500);
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.toast-container').exists()).toBe(false);
    vi.useRealTimers();
  });
});