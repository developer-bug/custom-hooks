import useFetch from './useFetch';
import { renderHook, act } from '@testing-library/react';
import { mockUser, mockUsers } from '../../mocks/handlers';
import { TEST_BASE_URL } from '../../constants/jest';

interface User {
    id: number;
    name: string;
}

describe.skip('useFetch', () => {
    it('should fetch all users with GET method', async () => {
        const { result } = renderHook(() => useFetch<User[]>(`${TEST_BASE_URL}/users`));

        act(() => {
            result.current.get();
        });

        expect(result.current.loading).toBe(true);

        await act(async () => {
            expect(result.current.data).toEqual(mockUsers);
            expect(result.current.error).toBeNull();
            expect(result.current.loading).toBe(false);
        });
    }, 3000);

    it('should fetch a single user with GET method', async () => {
        const { result } = renderHook(() => useFetch<User>(`${TEST_BASE_URL}/users/1`));

        act(() => {
            result.current.get();
        });

        expect(result.current.loading).toBe(true);

        await act(async () => {
            expect(result.current.loading).toBe(false);
            expect(result.current.error).toBeNull();
            expect(result.current.data).toEqual(mockUsers[0]);
        });
    });

    it('should create a new user with POST method', async () => {
        const { result } = renderHook(() => useFetch<User, User>(`${TEST_BASE_URL}/users`));

        act(() => {
            result.current.post(mockUser);
        });

        expect(result.current.loading).toBe(true);

        await act(async () => {
            expect(result.current.loading).toBe(false);
            expect(result.current.error).toBeNull();
            expect(result.current.data).toEqual(mockUser);
        });
    });

    it('should update an existing user with PUT method', async () => {
        const { result } = renderHook(() => useFetch<User, User>(`${TEST_BASE_URL}/users`));

        act(() => {
            result.current.put(mockUsers[0]);
        });

        expect(result.current.loading).toBe(true);

        await act(async () => {
            expect(result.current.loading).toBe(false);
            expect(result.current.error).toBeNull();
            expect(result.current.data).toEqual(mockUsers[0]);
        });
    });

    it('should delete a user with DELETE method', async () => {
        const { result } = renderHook(() => useFetch<User>(`${TEST_BASE_URL}/users/1`));

        act(() => {
            result.current.delete();
        });

        expect(result.current.loading).toBe(true);

        await act(async () => {
            expect(result.current.loading).toBe(false);
            expect(result.current.error).toBeNull();
            expect(result.current.data).toEqual(mockUsers[0]);
        });
    });
});
