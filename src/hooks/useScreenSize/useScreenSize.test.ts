import { renderHook, act } from '@testing-library/react';
import useScreenSize from './useScreenSize';

describe('useScreenSize', () => {
    beforeAll(() => {
        // Mock `window.matchMedia`
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: jest.fn().mockImplementation((query) => ({
                matches: query === '(max-width: 450px)',
                media: query,
                onchange: null,
                addEventListener: jest.fn((_, callback) => {
                    callback({ matches: query === '(max-width: 450px)' });
                }),
                removeEventListener: jest.fn(),
            })),
        });
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    it('should return true for default query when screen width matches', () => {
        const { result } = renderHook(() => useScreenSize());
        expect(result.current).toBe(true);
    });

    it('should return false when screen width does not match', () => {
        const { result } = renderHook(() => useScreenSize('(min-width: 768px)'));
        expect(result.current).toBe(false);
    });

    // TODO: Work on testing for updating the hook when screen size changes
    it.skip('should update when screen size changes', () => {
        const { result } = renderHook(() => useScreenSize('(max-width: 450px)'));

        act(() => {
            window.matchMedia('(max-width: 450px)').addEventListener('change', (event: any) => {
                expect(event.matches).toBe(false);
            });
        });

        expect(result.current).toBe(true);  // Initial state check
    });
});
