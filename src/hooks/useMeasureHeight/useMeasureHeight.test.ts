import useMeasureHeight from "./useMeasureHeight";
import { renderHook, act } from '@testing-library/react';

// Mock the offsetHeight property.
const setOffsetHeight = (element: HTMLElement, height: number) => {
    Object.defineProperty(element, 'offsetHeight', { value: height, writable: true });
}

describe('useMeasureHeight Hook', () => {
    it('should return initial height as 0', () => {
        const elementRef = { current: null } as React.RefObject<HTMLElement>;
        const { result } = renderHook(() => useMeasureHeight(elementRef));

        expect(result.current).toBe(0);
    });

    it('should set height when element is provided', () => {
        const element = document.createElement('div');
        setOffsetHeight(element, 100);

        const elementRef = { current: element } as React.RefObject<HTMLElement>;
        const { result } = renderHook(() => useMeasureHeight(elementRef));

        expect(result.current).toBe(100);
    });

    // TODO: Work on this test case to verify height updates after element resizes.
    it.skip('should update height when element height changes', () => {
        const element = document.createElement('div');
        setOffsetHeight(element, 100);

        const elementRef = { current: element } as React.RefObject<HTMLElement>;
        const { result, rerender } = renderHook(() => useMeasureHeight(elementRef));

        // Initial height check
        expect(result.current).toBe(100);

        // Update height to simulate a resize
        setOffsetHeight(element, 150);

        act(() => {
            // Rerender to capture updated height
            rerender();
        });

        // Check if height has been updated
        expect(result.current).toBe(150);
    });
});
