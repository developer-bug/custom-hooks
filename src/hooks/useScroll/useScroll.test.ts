import { renderHook, act } from '@testing-library/react-hooks';
import useScroll from './useScroll';

describe('useScroll', () => {
    beforeAll(() => {
        // Mocking window.scrollX and window.scrollY
        Object.defineProperty(window, 'scrollX', { writable: true, value: 0 });
        Object.defineProperty(window, 'scrollY', { writable: true, value: 0 });
    });

    it('should return initial scroll position of 0 for window', () => {
        const { result } = renderHook(() => useScroll());
        expect(result.current.scrollX).toBe(0);
        expect(result.current.scrollY).toBe(0);
    });

    // TODO: work on testing scroll position updates for an element
    it.skip('should update scroll position when window is scrolled', () => {
        const { result } = renderHook(() => useScroll());

        act(() => {
            window.scrollX = 100;
            window.scrollY = 200;
            window.dispatchEvent(new Event('scroll'));
        });

        expect(result.current.scrollX).toBe(100);
        expect(result.current.scrollY).toBe(200);
    });

    it('should return initial scroll position of 0 for an element', () => {
        const element = document.createElement('div');
        const { result } = renderHook(() => useScroll(element));

        expect(result.current.scrollX).toBe(0);
        expect(result.current.scrollY).toBe(0);
    });

    it('should update scroll position when an element is scrolled', () => {
        const element = document.createElement('div');
        Object.defineProperty(element, 'scrollLeft', { writable: true, value: 0 });
        Object.defineProperty(element, 'scrollTop', { writable: true, value: 0 });

        const { result } = renderHook(() => useScroll(element));

        act(() => {
            element.scrollLeft = 50;
            element.scrollTop = 75;
            element.dispatchEvent(new Event('scroll'));
        });

        expect(result.current.scrollX).toBe(50);
        expect(result.current.scrollY).toBe(75);
    });
});
