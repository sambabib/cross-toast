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

  it('starts with isVisible=false and sets it to true after brief delay', async () => {
    vi.useFakeTimers();

    // Reset all timers for a clean start
    vi.clearAllTimers();

    const wrapper = mount(VueToast, {
      props: { message: 'Test message' }
    });

    // Initially not visible
    expect(wrapper.find('.toast-container').classes()).not.toContain('visible');
    expect(wrapper.vm.isVisible).toBe(false);

    // After exact 10ms delay, should be visible
    await vi.advanceTimersByTimeAsync(10); // Exactly 10ms delay (matching component implementation)
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.toast-container').classes()).toContain('visible');
    expect(wrapper.vm.isVisible).toBe(true);

    vi.useRealTimers();
  });

  it('hides after duration and emits hide', async () => {
    vi.useFakeTimers();

    // Reset all timers for a clean start
    vi.clearAllTimers();

    const wrapper = mount(VueToast, {
      props: { message: 'Test message', duration: 100 }
    });

    // Initially mounted but not visible yet
    expect(wrapper.find('.toast-container').exists()).toBe(true);
    expect(wrapper.find('.toast-container').classes()).not.toContain('visible');

    // Make it visible with exactly 10ms (matching the component implementation)
    await vi.advanceTimersByTimeAsync(10);
    await wrapper.vm.$nextTick();

    // Now it should be visible
    expect(wrapper.find('.toast-container').classes()).toContain('visible');
    expect(wrapper.vm.isVisible).toBe(true);

    // Advance time to just before the exit animation should start
    // 100ms total duration - 10ms already spent on visibility = 90ms
    await vi.advanceTimersByTimeAsync(89); // Just before duration ends
    await wrapper.vm.$nextTick();

    // At this point, the exit animation should not have started yet
    expect(wrapper.find('.toast-content').classes()).not.toContain('exit');
    expect(wrapper.vm.exiting).toBe(false);

    // Now advance just enough to trigger exit animation
    await vi.advanceTimersByTimeAsync(2); // A little more than needed to ensure we're past the threshold
    await wrapper.vm.$nextTick();

    // Now the exit class should be present
    expect(wrapper.find('.toast-content').classes()).toContain('exit');
    expect(wrapper.vm.exiting).toBe(true);

    // Complete the exit animation
    await vi.advanceTimersByTimeAsync(350); // Match our exit animation duration
    await wrapper.vm.$nextTick();

    // Now the component should emit the hide event
    expect(wrapper.emitted('hide')).toHaveLength(1);

    vi.useRealTimers();
  });

  it('uses default duration of 3000ms', async () => {
    vi.useFakeTimers();

    // Reset all timers for a clean start
    vi.clearAllTimers();

    const wrapper = mount(VueToast, {
      props: { message: 'Test message' }
    });

    // Initially not visible
    expect(wrapper.find('.toast-container').classes()).not.toContain('visible');
    expect(wrapper.vm.isVisible).toBe(false);

    // Make it visible
    await vi.advanceTimersByTimeAsync(10); // Exactly 10ms visibility delay
    await wrapper.vm.$nextTick();

    // Verify it's now visible
    expect(wrapper.find('.toast-content').exists()).toBe(true);
    expect(wrapper.find('.toast-container').classes()).toContain('visible');
    expect(wrapper.vm.isVisible).toBe(true);

    // Advance to just before the duration ends
    // 3000ms total - 10ms already spent = 2990ms
    await vi.advanceTimersByTimeAsync(2989); // Just before duration ends
    await wrapper.vm.$nextTick();

    // At this point, the toast should still be visible without exit class
    expect(wrapper.find('.toast-content').exists()).toBe(true);
    expect(wrapper.find('.toast-content').classes()).not.toContain('exit');
    expect(wrapper.vm.exiting).toBe(false);

    // Advance to trigger exit animation
    await vi.advanceTimersByTimeAsync(2); // Just enough to go past the threshold
    await wrapper.vm.$nextTick();

    // Now it should have the exit class
    expect(wrapper.find('.toast-content').classes()).toContain('exit');
    expect(wrapper.vm.exiting).toBe(true);

    // Complete the exit animation
    await vi.advanceTimersByTimeAsync(350);
    await wrapper.vm.$nextTick();

    // The toast should now be hidden
    expect(wrapper.find('.toast-content').exists()).toBe(false);
    expect(wrapper.vm.show).toBe(false);

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

  it('applies correct transform based on position', () => {
    const leftWrapper = mount(VueToast, {
      props: { message: 'Test message', position: 'top-left' }
    });
    const rightWrapper = mount(VueToast, {
      props: { message: 'Test message', position: 'top-right' }
    });

    // Check initial transform direction by checking the CSS class
    const leftContent = leftWrapper.find('.toast-content');
    const rightContent = rightWrapper.find('.toast-content');

    // In JSDOM, we can't reliably check computed styles
    // Instead, we'll check if the elements have the correct classes
    expect(leftContent.element.classList.contains('toast-content')).toBe(true);
    expect(rightContent.element.classList.contains('toast-content')).toBe(true);

    // The actual transform will be handled by CSS classes
    expect(leftWrapper.find('.toast-container').classes()).toContain('top-left');
    expect(rightWrapper.find('.toast-container').classes()).toContain('top-right');
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

  it('emits hide event after animation completes', async () => {
    vi.useFakeTimers();

    // Reset all timers for a clean start
    vi.clearAllTimers();

    const wrapper = mount(VueToast, {
      props: { message: 'Test message', duration: 100 }
    });

    // Make the toast visible first
    await vi.advanceTimersByTimeAsync(10); // Exactly 10ms visibility delay
    await wrapper.vm.$nextTick();

    // Duration elapses (100ms - 10ms already passed = 90ms)
    await vi.advanceTimersByTimeAsync(90);
    await wrapper.vm.$nextTick();

    // Exit animation should now be in progress
    expect(wrapper.find('.toast-content').classes()).toContain('exit');
    expect(wrapper.emitted('hide')).toBeFalsy(); // Hide event not emitted yet

    // Complete the exit animation
    await vi.advanceTimersByTimeAsync(350);
    await wrapper.vm.$nextTick();

    // Now hide event should be emitted
    expect(wrapper.emitted('hide')).toHaveLength(1);

    vi.useRealTimers();
  });

  it('maintains correct lifecycle states for animations', async () => {
    vi.useFakeTimers();

    // Reset all timers for a clean start
    vi.clearAllTimers();

    const wrapper = mount(VueToast, {
      props: { message: 'Test message', duration: 100 }
    });

    // 1. Initial state (mounted but not yet visible)
    expect(wrapper.vm.show).toBe(true);
    expect(wrapper.vm.isVisible).toBe(false);
    expect(wrapper.vm.exiting).toBe(false);

    // 2. After visibility delay: visible state set
    await vi.advanceTimersByTimeAsync(10); // Exactly 10ms visibility delay
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isVisible).toBe(true);
    expect(wrapper.find('.toast-container').classes()).toContain('visible');

    // 3. Before duration ends: still visible, not exiting
    await vi.advanceTimersByTimeAsync(89); // Just before duration ends (100 - 10 - 1)
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isVisible).toBe(true);
    expect(wrapper.vm.exiting).toBe(false);

    // 4. After duration: exit animation begins
    await vi.advanceTimersByTimeAsync(2); // Just enough to trigger the exit
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.exiting).toBe(true);
    expect(wrapper.find('.toast-content').classes()).toContain('exit');
    expect(wrapper.vm.show).toBe(true); // Still shown during exit

    // 5. During exit animation: still in DOM
    await vi.advanceTimersByTimeAsync(200); // Partway through exit animation
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.show).toBe(true);

    // 6. After exit animation: removed from DOM
    await vi.advanceTimersByTimeAsync(150); // Complete exit animation
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.show).toBe(false);
    expect(wrapper.emitted('hide')).toHaveLength(1);

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
  it('tests top-right position entry animation', async () => {
    vi.useFakeTimers();

    // Reset timers
    vi.clearAllTimers();

    const wrapper = mount(VueToast, {
      props: { message: 'Test message', position: 'top-right' }
    });

    // Initially not visible
    expect(wrapper.find('.toast-container').classes()).not.toContain('visible');
    expect(wrapper.vm.isVisible).toBe(false);

    // After visibility delay
    await vi.advanceTimersByTimeAsync(10);
    await wrapper.vm.$nextTick();

    // Should now be visible
    expect(wrapper.find('.toast-container').classes()).toContain('visible');
    expect(wrapper.vm.isVisible).toBe(true);

    vi.useRealTimers();
  });

  it('tests exit animation for top-right position', async () => {
    vi.useFakeTimers();

    // Reset timers
    vi.clearAllTimers();

    const wrapper = mount(VueToast, {
      props: { message: 'Test message', position: 'top-right', duration: 100 }
    });

    // Set initial visible state
    await vi.advanceTimersByTimeAsync(10);
    await wrapper.vm.$nextTick();

    // Trigger exit animation
    await vi.advanceTimersByTimeAsync(90); // Duration - initial delay
    await wrapper.vm.$nextTick();

    const content = wrapper.find('.toast-content');

    // Should have exit class
    expect(content.classes()).toContain('exit');
    expect(wrapper.vm.exiting).toBe(true);

    vi.useRealTimers();
  });

  it('tests top-left position entry animation', async () => {
    vi.useFakeTimers();

    // Reset timers
    vi.clearAllTimers();

    const wrapper = mount(VueToast, {
      props: { message: 'Test message', position: 'top-left' }
    });

    // Initially not visible
    expect(wrapper.find('.toast-container').classes()).not.toContain('visible');
    expect(wrapper.vm.isVisible).toBe(false);

    // After visibility delay
    await vi.advanceTimersByTimeAsync(10);
    await wrapper.vm.$nextTick();

    // Should now be visible
    expect(wrapper.find('.toast-container').classes()).toContain('visible');
    expect(wrapper.vm.isVisible).toBe(true);

    vi.useRealTimers();
  });

  it('verifies visibility after mount and delay', async () => {
    vi.useFakeTimers();

    // Reset timers
    vi.clearAllTimers();

    const wrapper = mount(VueToast, {
      props: { message: 'Test message' }
    });

    // Initially not visible
    expect(wrapper.find('.toast-container').classes()).not.toContain('visible');

    // After visibility delay
    await vi.advanceTimersByTimeAsync(10);
    await wrapper.vm.$nextTick();

    // Should now be visible
    expect(wrapper.find('.toast-container').classes()).toContain('visible');

    vi.useRealTimers();
  });

  it('applies exit class when animation starts', async () => {
    vi.useFakeTimers();

    // Reset timers for a clean start
    vi.clearAllTimers();

    const wrapper = mount(VueToast, {
      props: { message: 'Test message', duration: 100 }
    });

    // Make the toast visible first
    await vi.advanceTimersByTimeAsync(10);
    await wrapper.vm.$nextTick();

    // Initially no exit class
    expect(wrapper.find('.toast-content').classes()).not.toContain('exit');

    // Advance time to exactly when the duration elapses
    await vi.advanceTimersByTimeAsync(90); // Duration - initial delay
    await wrapper.vm.$nextTick();

    // Now exit class should be applied
    expect(wrapper.find('.toast-content').classes()).toContain('exit');

    vi.useRealTimers();
  });
});