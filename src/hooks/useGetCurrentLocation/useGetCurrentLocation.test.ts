import { act, renderHook } from '@testing-library/react'
import useGetCurrentLocation from "./useGetCurrentLocation";

describe('useGetCurrentLocation', () => {
    const mockGeolocation = {
        getCurrentPosition: jest.fn(),
    }

    const mockError = {
        message: 'User denied Geolocation',
    }

    const mockPosition = {
        coords: {
            latitude: 51.1,
            longitude: -0.1,
        },
    };

    beforeEach(() => {
        // @ts-ignore
        global.navigator.geolocation = mockGeolocation
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return an error when geolocation is not supported', () => {
        // @ts-ignore
        delete global.navigator.geolocation;
        const { result } = renderHook(() => useGetCurrentLocation());

        expect(result.current.status).toBe('Geolocation is not supported by your browser.');
        expect(result.current.currentLocation).toBeUndefined();
    });

    it.skip('should set the location and status on success', async () => {
        mockGeolocation.getCurrentPosition.mockImplementationOnce(
            (successCallback: (position: typeof mockPosition) => void) => {
                successCallback(mockPosition);
            }
        );
        const { result } = renderHook(() => useGetCurrentLocation());

        await act(async () => {
            expect(result.current.status).toBe('ok');
            expect(result.current.currentLocation).toEqual({
                lat: mockPosition.coords.latitude,
                lng: mockPosition.coords.longitude,
            });
        });
    });

    it.skip('should set an error status if geolocation fails', async () => {
        mockGeolocation.getCurrentPosition.mockImplementationOnce(
            (_, errorCallback: (error: typeof mockError) => void) => {
                errorCallback(mockError);
            }
        );

        const { result } = renderHook(() => useGetCurrentLocation());

        await act(async () => {
            expect(result.current.status).toBe(`Error getting geolocation: ${mockError.message}`);
            expect(result.current.currentLocation).toBeUndefined();
        });
    });
});
