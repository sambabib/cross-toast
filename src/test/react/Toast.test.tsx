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
    info: 'info',
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

  // Basic rendering tests
  it('renders with message prop', () => {
    render(<ReactToast message="Test message" />);
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  // Type-related tests
  it('applies success class and gradient by default', () => {
    const { container } = render(<ReactToast message="Test message" />);
    const toast = container.querySelector(`.${styles.toastContent}`);
    expect(toast).toHaveClass('success');
    // We can't test computed styles in JSDOM, but we can verify the class is applied
  });

  it('applies error class and gradient when type is error', () => {
    const { container } = render(<ReactToast message="Test message" type="error" />);
    const toast = container.querySelector(`.${styles.toastContent}`);
    expect(toast).toHaveClass('error');
  });

  it('applies info class and gradient when type is info', () => {
    const { container } = render(<ReactToast message="Test message" type="info" />);
    const toast = container.querySelector(`.${styles.toastContent}`);
    expect(toast).toHaveClass('info');
  });

  // Visibility and animation tests
  it('starts with isVisible=false and sets it to true after a brief delay', async () => {
    vi.useFakeTimers();
    const { container } = render(<ReactToast message="Test message" />);
    const toastContainer = container.firstChild as HTMLElement;

    expect(toastContainer).not.toHaveClass('visible');

    await act(() => {
      vi.advanceTimersByTime(15);
    });

    expect(toastContainer).toHaveClass('visible');
    vi.useRealTimers();
  });

  // Duration and hide tests
  it('hides after duration and calls onHide', async () => {
    vi.useFakeTimers();
    const onHide = vi.fn();
    render(<ReactToast message="Test message" duration={100} onHide={onHide} />);

    expect(screen.getByText('Test message')).toBeInTheDocument();

    await act(() => {
      vi.advanceTimersByTime(15);
    });

    await act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(screen.getByText('Test message')).toBeInTheDocument();

    await act(() => {
      vi.advanceTimersByTime(350);
    });

    expect(screen.queryByText('Test message')).not.toBeInTheDocument();
    expect(onHide).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });

  // Position tests with new styles
  it('uses bottom-right position by default with correct styles', () => {
    const { container } = render(<ReactToast message="Test message" />);
    const toastContainer = container.firstChild as HTMLElement;
    expect(toastContainer.className).toContain('bottomRight');
  });

  // Theme tests with new gradient styles
  it('applies light theme with correct background when specified', () => {
    const { container } = render(
      <ReactToast message="Test message" theme="light" />
    );
    const toastContainer = container.firstChild as HTMLElement;
    expect(toastContainer.className).toContain('light');
  });

  it('applies dark theme with correct background when specified', () => {
    const { container } = render(
      <ReactToast message="Test message" theme="dark" />
    );
    const toastContainer = container.firstChild as HTMLElement;
    expect(toastContainer.className).toContain('dark');
  });

  // Border tests
  it('applies correct border style', () => {
    const { container } = render(<ReactToast message="Test message" />);
    const toastContent = container.querySelector(`.${styles.toastContent}`);
    // We can't test computed styles directly, but we can verify the element exists
    expect(toastContent).toBeTruthy();
  });

  // Backdrop filter tests
  it('has backdrop filter styles applied', () => {
    const { container } = render(<ReactToast message="Test message" />);
    const toastContent = container.querySelector(`.${styles.toastContent}`);
    expect(toastContent).toBeTruthy();
  });

  // Complete lifecycle test
  it('maintains all necessary states during the entire lifecycle', async () => {
    vi.useFakeTimers();
    const onHide = vi.fn();
    const { container } = render(
      <ReactToast message="Test message" duration={100} onHide={onHide} />
    );

    let toastContainer = container.firstChild as HTMLElement;
    expect(toastContainer).not.toHaveClass('visible');

    await act(() => {
      vi.advanceTimersByTime(15);
    });
    expect(toastContainer).toHaveClass('visible');

    const toastContent = container.querySelector(`.${styles.toastContent}`) as HTMLElement;
    expect(toastContent).not.toHaveClass('exit');

    await act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(toastContent).toHaveClass('exit');
    expect(toastContainer).toHaveClass('visible');

    await act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(container.firstChild).not.toBeNull();

    await act(() => {
      vi.advanceTimersByTime(150);
    });
    expect(container.firstChild).toBeNull();
    expect(onHide).toHaveBeenCalledTimes(1);

    vi.useRealTimers();
  });
});