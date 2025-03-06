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
    slideInLeft: 'slideInLeft'
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

  it('applies visible class initially and removes it after duration', async () => {
    vi.useFakeTimers();
    const { container } = render(<ReactToast message="Test message" duration={100} />);
    const toastContainer = container.firstChild as HTMLElement;
    expect(toastContainer).toHaveClass('toastContainer');
    expect(toastContainer).toHaveClass('visible');

    await act(() => {
      vi.advanceTimersByTime(100);
      return Promise.resolve();
    });

    // Should no longer be visible but still in DOM
    expect(toastContainer).not.toHaveClass('visible');
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

    // Initially should be visible with slide in
    expect(toastContainer).toHaveClass('visible');
    expect(toastContent.className).toContain('toastContent');

    // Advance to start exit animation
    await act(() => {
      vi.advanceTimersByTime(100);
    });

    // Should no longer be visible (which triggers fadeOut animation via CSS)
    expect(toastContainer).not.toHaveClass('visible');

    // Advance through exit animation
    await act(() => {
      vi.advanceTimersByTime(300);
    });

    // Component should be unmounted after animation
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

    // Initially should be visible
    expect(toastContainer).toHaveClass('visible');

    // Advance to start exit animation
    await act(() => {
      vi.advanceTimersByTime(100);
    });

    // Should no longer be visible but still mounted
    expect(toastContainer).not.toHaveClass('visible');
    expect(container.firstChild).not.toBeNull();
    expect(onHide).not.toHaveBeenCalled();

    // Complete animation
    await act(() => {
      vi.advanceTimersByTime(500); // Full duration of fadeOut animation
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
});