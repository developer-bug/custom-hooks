import useDebounce from './useDebounce';
import { describe, expect, it } from '@jest/globals';
import { renderHook, act } from '@testing-library/react-hooks';

jest.useFakeTimers();

describe('useDebounce Hook', () => {
    it('should return the initial value immediately', () => {
        const { result } = renderHook(() => useDebounce('initial', 500));
        expect(result.current).toBe('initial');
    });

    it('should debounced the value after the delay', () => {
        const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
            initialProps: { value: 'initial', delay: 500 },
        });

        expect(result.current).toBe('initial');

        // Update the value and rerender the hook
        rerender({ value: 'updated', delay: 500 });

        // Fast-forward time by less than the delay
        act(() => {
            jest.advanceTimersByTime(400);
        });

        // Now the value should have updated
        expect(result.current).toBe('initial');

        // Fast-forward time by the remaining delay
        act(() => {
            jest.advanceTimersByTime(100);
        });

        // Now the value should have updated
        expect(result.current).toBe('updated');
    });

    it('should reset timer if value changes before delay', () => {
        const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
            initialProps: { value: 'initial', delay: 500 },
        });

        expect(result.current).toBe('initial');

        // Update the value to a new one and rerender
        rerender({ value: 'first update', delay: 500 });

        act(() => {
            jest.advanceTimersByTime(300);
        });

        // Update the value again before the delay completes
        rerender({ value: 'second update', delay: 500 });

        // The value should not have updated yet
        expect(result.current).toBe('initial');

        // Fast-forward time past the debounce delay
        act(() => {
            jest.advanceTimersByTime(500);
        });

        // Now the value should reflect the latest update
        expect(result.current).toBe('second update');
    });
});
