/** @jsx React.createElement */
import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { ReactToast } from '../../react';

// Mock the CSS module
vi.mock('../../react/Toast.module.css', () => ({
  default: {
    toastContainer: 'toastContainer',
    visible: 'visible',
    toastContent: 'toastContent',
    success: 'success',
    error: 'error'
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

    await act(() => {
      vi.advanceTimersByTime(150);
      return Promise.resolve();
    });

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

    // The component should be removed from DOM after the duration
    expect(container.firstChild).toBeNull();
    vi.useRealTimers();
  });
});