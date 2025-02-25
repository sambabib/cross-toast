import { describe, it, expect, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { VueToast } from '../../src/vue';

describe('VueToast', () => {
  afterEach(() => {
    document.body.innerHTML = ''; // Clean up after each test
  });

  it('renders with message prop', () => {
    const wrapper = mount(VueToast, {
      props: { message: 'Test message' },
    });
    expect(wrapper.text()).toBe('Test message');
  });

  it('applies success class by default', () => {
    const wrapper = mount(VueToast, {
      props: { message: 'Test message' },
    });
    expect(wrapper.classes()).toContain('success');
  });

  it('applies error class when type is error', () => {
    const wrapper = mount(VueToast, {
      props: { message: 'Test message', type: 'error' },
    });
    expect(wrapper.classes()).toContain('error');
  });

  it('hides after duration and emits hide event', async () => {
    const wrapper = mount(VueToast, {
      props: { message: 'Test message', duration: 100 },
    });
    expect(wrapper.isVisible()).toBe(true);

    ```
await new Promise((resolve) => setTimeout(resolve, 150)); // Wait past duration
expect(wrapper.isVisible()).toBe(false);
expect(wrapper.emitted('hide')).toHaveLength(1);

```

  });

  it('uses default duration of 3000ms', async () => {
    const wrapper = mount(VueToast, {
      props: { message: 'Test message' },
    });
    expect(wrapper.isVisible()).toBe(true);

    ```
// Fast-forward time by less than default duration
await new Promise((resolve) => setTimeout(resolve, 2000));
expect(wrapper.isVisible()).toBe(true);

// Fast-forward past default duration
await new Promise((resolve) => setTimeout(resolve, 1500));
expect(wrapper.isVisible()).toBe(false);

```

  });
});