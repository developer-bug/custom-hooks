import { http, HttpResponse } from 'msw';

export const TEST_BASE_URL = 'http://localhost:3003';

export const mockUsers = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
    { id: 3, name: 'Mike' },
]
export const mockUser = { id: 4, name: 'John Doe' }

export const handlers = [
    http.get(`${TEST_BASE_URL}/users`, () => {
        return HttpResponse.json(mockUsers, { status: 200 });
    }),
    http.get(`${TEST_BASE_URL}/users/:id`, ({ params }) => {
        const { id } = params;
        return HttpResponse.json(mockUsers.find(user => user.id === parseInt(id.toString())), { status: 200 });
    }),
    http.post(`${TEST_BASE_URL}/users`, async ({ request }) => {
        const newUser = await request.json();
        return HttpResponse.json(newUser, { status: 201 });
    }),
    http.put(`${TEST_BASE_URL}/users`, async ({ request }) => {
        const updatedUser = await request.json();
        return HttpResponse.json(updatedUser, { status: 200 });
    }),
    http.delete(`${TEST_BASE_URL}/users/:id`, ({ params }) => {
        const { id } = params;
        return HttpResponse.json(mockUsers.filter(user => user.id === parseInt(id.toString()))[0], { status: 200 });
    }),
]
