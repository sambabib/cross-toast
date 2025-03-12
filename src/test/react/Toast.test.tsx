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
    slideIn: 'slideIn',
    fadeOut: 'fadeOut',
    slideInLeft: 'slideInLeft',
    exit: 'exit'
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

  it('hides after duration and calls onHide', async () => {
    vi.useFakeTimers();
    const onHide = vi.fn();
    render(<ReactToast message="Test message" duration={100} onHide={onHide} />);

    expect(screen.getByText('Test message')).toBeInTheDocument();

    // Advance past duration
    await act(() => {
      vi.advanceTimersByTime(100);
    });

    // Should still be in document but not visible
    expect(screen.getByText('Test message')).toBeInTheDocument();

    // Advance through exit animation
    await act(() => {
      vi.advanceTimersByTime(500);
    });

    // Now it should be removed and onHide called
    expect(screen.queryByText('Test message')).not.toBeInTheDocument();
    expect(onHide).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });

  it('uses default duration of 3000ms', async () => {
    vi.useFakeTimers();
    render(<ReactToast message="Test message" />);

    expect(screen.getByText('Test message')).toBeInTheDocument();

    await act(async () => {
      vi.advanceTimersByTime(2000);
    });
    expect(screen.getByText('Test message')).toBeInTheDocument();

    await act(async () => {
      vi.advanceTimersByTime(1500);
    });
    expect(screen.queryByText('Test message')).not.toBeInTheDocument();
    vi.useRealTimers();
  });

  it('applies visible class initially and starts exit animation after duration', async () => {
    vi.useFakeTimers();
    const { container } = render(<ReactToast message="Test message" duration={100} />);
    const toastContainer = container.firstChild as HTMLElement;
    const toastContent = container.querySelector(`.${styles.toastContent}`) as HTMLElement;

    expect(toastContainer).toHaveClass('toastContainer');
    expect(toastContainer).toHaveClass('visible');

    await act(() => {
      vi.advanceTimersByTime(100);
      return Promise.resolve();
    });

    // In the new implementation, visible class remains but exit class is added to start animation
    expect(toastContainer).toHaveClass('visible');
    expect(toastContent).toHaveClass('exit');
    expect(container.firstChild).not.toBeNull();

    // Advance through exit animation
    await act(() => {
      vi.advanceTimersByTime(500);
    });

    // Now the component should be removed
    expect(container.firstChild).toBeNull();
    vi.useRealTimers();
  });

  it('applies correct animation classes during exit', async () => {
    vi.useFakeTimers();
    const { container } = render(<ReactToast message="Test message" duration={100} />);
    const toastContainer = container.firstChild as HTMLElement;
    const toastContent = container.querySelector(`.${styles.toastContent}`) as HTMLElement;

    // Initially should be visible without exit class
    expect(toastContainer).toHaveClass('visible');
    expect(toastContent).not.toHaveClass('exit');

    // Advance to start exit animation
    await act(() => {
      vi.advanceTimersByTime(100);
    });

    // Should have exit class to trigger animation
    expect(toastContainer).toHaveClass('visible');
    expect(toastContent).toHaveClass('exit');

    // Advance through exit animation
    await act(() => {
      vi.advanceTimersByTime(300); 
    });

    // Component should still be in DOM during animation
    expect(container.firstChild).not.toBeNull();

    // Complete animation
    await act(() => {
      vi.advanceTimersByTime(100);
    });

    // Now component should be unmounted
    expect(container.firstChild).toBeNull();
    vi.useRealTimers();
  });

  it('waits for animation to complete before unmounting', async () => {
    vi.useFakeTimers();
    const onHide = vi.fn();
    const { container } = render(
      <ReactToast message="Test message" duration={100} onHide={onHide} />
    );
    const toastContainer = container.firstChild as HTMLElement;
    const toastContent = container.querySelector(`.${styles.toastContent}`) as HTMLElement;

    // Initially should be visible
    expect(toastContainer).toHaveClass('visible');
    expect(toastContent).not.toHaveClass('exit');

    // Advance to start exit animation
    await act(() => {
      vi.advanceTimersByTime(100);
    });

    // Should still be visible but with exit class added, and still mounted
    expect(toastContainer).toHaveClass('visible');
    expect(toastContent).toHaveClass('exit');
    expect(container.firstChild).not.toBeNull();
    expect(onHide).not.toHaveBeenCalled();

    // Complete animation
    await act(() => {
      vi.advanceTimersByTime(300); 
    });

    // Now it should be unmounted and onHide called
    expect(container.firstChild).toBeNull();
    expect(onHide).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });

  // New position-related tests
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

  it('maintains other classes when position is changed', () => {
    const { container } = render(
      <ReactToast message="Test message" position="top-left" type="success" />
    );
    const toastContent = container.querySelector('.toastContent') as HTMLElement;
    const toastContainer = container.firstChild as HTMLElement;

    expect(toastContainer.className).toContain('topLeft');
    expect(toastContainer.className).toContain('visible');
    expect(toastContent.className).toContain('success');
  });

  it('applies exit class during exit animation', async () => {
    vi.useFakeTimers();
    const { container } = render(<ReactToast message="Test message" duration={100} />);
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
      vi.advanceTimersByTime(500);
    });

    // Component should be unmounted after animation
    expect(container.firstChild).toBeNull();
    vi.useRealTimers();
  });

  it('cleans up timer when unmounted', () => {
    vi.useFakeTimers();
    const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');

    const { unmount } = render(<ReactToast message="Test message" />);

    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalled();
    clearTimeoutSpy.mockRestore();
    vi.useRealTimers();
  });

  it('has two-phase unmounting with exit animation', async () => {
    vi.useFakeTimers();
    const { container } = render(<ReactToast message="Test message" duration={100} />);

    // Initially visible
    expect(container.firstChild).not.toBeNull();

    // Phase 1: Start exit animation
    await act(() => {
      vi.advanceTimersByTime(100);
    });

    // Should still be in DOM but with exit class
    expect(container.firstChild).not.toBeNull();
    expect(container.querySelector(`.${styles.toastContent}`)).toHaveClass('exit');

    // Phase 2: Complete exit animation and unmount
    await act(() => {
      vi.advanceTimersByTime(500);
    });

    // Now it should be removed
    expect(container.firstChild).toBeNull();
    vi.useRealTimers();
  });

  it('applies correct animation classes for right-side positions', () => {
    const { container } = render(<ReactToast message="Test message" position="top-right" />);
    const toastContent = container.querySelector(`.${styles.toastContent}`) as HTMLElement;
    
    expect(toastContent.style.transform).toBe('translateX(100%)');
  });

  it('applies correct animation classes for left-side positions', () => {
    const { container } = render(<ReactToast message="Test message" position="top-left" />);
    const toastContent = container.querySelector(`.${styles.toastContent}`) as HTMLElement;
    
    expect(toastContent.style.transform).toBe('translateX(-100%)');
  });
});