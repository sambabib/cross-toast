/** @jsx React.createElement */
import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { ReactToast } from '../../react';
import styles from '../../react/Toast.module.css';

// Mock the CSS module
vi.mock('../../react/Toast.module.css', () => ({
  default: {
    toastContainer: 'toastContainer',
    toastContent: 'toastContent',
    success: 'success',
    error: 'error',
    visible: 'visible',
    topRight: 'topRight',
    topLeft: 'topLeft',
    bottomRight: 'bottomRight',
    bottomLeft: 'bottomLeft',
    exit: 'exit',
    light: 'light',
    dark: 'dark'
  }
}));

describe('ReactToast', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    vi.clearAllTimers();
  });

  it('renders with message prop', () => {
    render(<ReactToast message="Test message" />);
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('applies success class by default', () => {
    render(<ReactToast message="Test message" />);
    const toast = screen.getByText('Test message');
    expect(toast).toHaveClass('success', { exact: false });
  });

  it('applies error class when type is error', () => {
    render(<ReactToast message="Test message" type="error" />);
    const toast = screen.getByText('Test message');
    expect(toast).toHaveClass('error', { exact: false });
  });

  it('starts with isVisible=false and sets it to true after a brief delay', async () => {
    vi.useFakeTimers();
    const { container } = render(<ReactToast message="Test message" />);
    const toastContainer = container.firstChild as HTMLElement;

    // Initially not visible
    expect(toastContainer).not.toHaveClass('visible');

    // After the delay, should be visible
    await act(() => {
      vi.advanceTimersByTime(15); // Just past the 10ms delay
    });

    expect(toastContainer).toHaveClass('visible');
    vi.useRealTimers();
  });

  it('hides after duration and calls onHide', async () => {
    vi.useFakeTimers();
    const onHide = vi.fn();
    render(<ReactToast message="Test message" duration={100} onHide={onHide} />);

    // Make sure it's rendered initially
    expect(screen.getByText('Test message')).toBeInTheDocument();

    // Wait for the visibility state to be true
    await act(() => {
      vi.advanceTimersByTime(15);
    });

    // Advance past duration
    await act(() => {
      vi.advanceTimersByTime(100);
    });

    // Exit animation starts, component should still be in document with exit class
    expect(screen.getByText('Test message')).toBeInTheDocument();

    // Advance through exit animation 
    await act(() => {
      vi.advanceTimersByTime(350); // Match our exit animation duration
    });

    // Now it should be removed and onHide called
    expect(screen.queryByText('Test message')).not.toBeInTheDocument();
    expect(onHide).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });

  it('uses default duration of 3000ms', async () => {
    vi.useFakeTimers();
    render(<ReactToast message="Test message" />);

    // Initial visibility delay
    await act(() => {
      vi.advanceTimersByTime(15);
    });

    expect(screen.getByText('Test message')).toBeInTheDocument();

    await act(async () => {
      vi.advanceTimersByTime(2990); // Just before duration ends
    });
    expect(screen.getByText('Test message')).toBeInTheDocument();

    await act(async () => {
      vi.advanceTimersByTime(10); // Reach the full duration
    });

    // Exit animation starts, but it's still in the document
    expect(screen.getByText('Test message')).toBeInTheDocument();

    // Complete the exit animation duration
    await act(async () => {
      vi.advanceTimersByTime(350);
    });

    // Now it should be removed
    expect(screen.queryByText('Test message')).not.toBeInTheDocument();
    vi.useRealTimers();
  });

  it('applies exit class during exit animation', async () => {
    vi.useFakeTimers();
    const { container } = render(<ReactToast message="Test message" duration={100} />);

    // Initial visibility delay
    await act(() => {
      vi.advanceTimersByTime(15);
    });

    const toastContent = container.querySelector(`.${styles.toastContent}`) as HTMLElement;

    // Initially should not have exit class
    expect(toastContent).not.toHaveClass('exit');

    // Advance to start exit animation
    await act(() => {
      vi.advanceTimersByTime(100);
    });

    // Now should have exit class
    expect(toastContent).toHaveClass('exit');

    // Advance through exit animation
    await act(() => {
      vi.advanceTimersByTime(350);
    });

    // Component should be unmounted after animation
    expect(container.firstChild).toBeNull();
    vi.useRealTimers();
  });

  it('cleans up timers when unmounted', () => {
    vi.useFakeTimers();
    const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');

    const { unmount } = render(<ReactToast message="Test message" />);

    unmount();

    // Should clear both the duration timer and the entry animation timer
    expect(clearTimeoutSpy).toHaveBeenCalledTimes(2);
    clearTimeoutSpy.mockRestore();
    vi.useRealTimers();
  });

  // Position-related tests
  it('uses bottom-right position by default', () => {
    const { container } = render(<ReactToast message="Test message" />);
    const toastContainer = container.firstChild as HTMLElement;
    expect(toastContainer.className).toContain('bottomRight');
  });

  it('applies correct class for top-right position', () => {
    const { container } = render(
      <ReactToast message="Test message" position="top-right" />
    );
    const toastContainer = container.firstChild as HTMLElement;
    expect(toastContainer.className).toContain('topRight');
  });

  it('applies correct class for top-left position', () => {
    const { container } = render(
      <ReactToast message="Test message" position="top-left" />
    );
    const toastContainer = container.firstChild as HTMLElement;
    expect(toastContainer.className).toContain('topLeft');
  });

  it('applies correct class for bottom-left position', () => {
    const { container } = render(
      <ReactToast message="Test message" position="bottom-left" />
    );
    const toastContainer = container.firstChild as HTMLElement;
    expect(toastContainer.className).toContain('bottomLeft');
  });

  // Theme tests
  it('applies light theme when specified', () => {
    const { container } = render(
      <ReactToast message="Test message" theme="light" />
    );
    const toastContainer = container.firstChild as HTMLElement;
    expect(toastContainer.className).toContain('light');
  });

  it('applies dark theme when specified', () => {
    const { container } = render(
      <ReactToast message="Test message" theme="dark" />
    );
    const toastContainer = container.firstChild as HTMLElement;
    expect(toastContainer.className).toContain('dark');
  });

  it('does not apply theme class when theme is auto', () => {
    const { container } = render(
      <ReactToast message="Test message" theme="auto" />
    );
    const toastContainer = container.firstChild as HTMLElement;
    expect(toastContainer.className).not.toContain('light');
    expect(toastContainer.className).not.toContain('dark');
  });

  it('maintains all necessary states during the entire lifecycle', async () => {
    vi.useFakeTimers();
    const onHide = vi.fn();
    const { container } = render(
      <ReactToast message="Test message" duration={100} onHide={onHide} />
    );

    // 1. Initial state: mounted but not visible yet
    let toastContainer = container.firstChild as HTMLElement;
    expect(toastContainer).not.toHaveClass('visible');

    // 2. After brief delay: visible state is applied
    await act(() => {
      vi.advanceTimersByTime(15);
    });
    expect(toastContainer).toHaveClass('visible');

    // 3. During visible state: no exit class
    const toastContent = container.querySelector(`.${styles.toastContent}`) as HTMLElement;
    expect(toastContent).not.toHaveClass('exit');

    // 4. After duration: exit class added to start animation
    await act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(toastContent).toHaveClass('exit');
    expect(toastContainer).toHaveClass('visible'); // Still visible during exit

    // 5. During exit animation: still in DOM
    await act(() => {
      vi.advanceTimersByTime(200); // Partway through exit
    });
    expect(container.firstChild).not.toBeNull();

    // 6. After exit animation: removed from DOM
    await act(() => {
      vi.advanceTimersByTime(150); // Complete exit
    });
    expect(container.firstChild).toBeNull();
    expect(onHide).toHaveBeenCalledTimes(1);

    vi.useRealTimers();
  });
});