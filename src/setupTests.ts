import '@testing-library/jest-dom';
import { mswServer } from './mocks/config/mockHttpServer';

beforeAll(() => mswServer.listen());
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());
