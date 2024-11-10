import { act, renderHook } from '@testing-library/react-hooks'
import useForm, { FormErrors } from './useForm';

describe('useForm Hook', () => {
    const initialValues = { username: '', email: '', password: '' };
    const mockFormUser = { username: 'john', email: 'john@example.com', password: 'password123' };
    const mockFormSubmitEvent = { preventDefault: jest.fn() } as unknown as React.FormEvent
    const mockOnSubmit = jest.fn();

    const validate = (values: typeof initialValues) => {
        const errors: FormErrors = {};
        if (!values.username) errors.username = 'Username is required';
        if (!values.email) errors.email = 'Email is required';
        if (!values.password) errors.password = 'Password is required';
        return errors;
    }

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should initialize form with initial values and no errors.', () => {
        const { result } = renderHook(() => useForm({ initialValues, onSubmit: mockOnSubmit }));

        expect(result.current.values).toEqual(initialValues);
        expect(result.current.errors).toEqual({});
        expect(result.current.isSubmitting).toBe(false);
    });

    it('should update form values on handleChange.', () => {
        const { result, waitForNextUpdate } = renderHook(() => useForm({ initialValues, onSubmit: mockOnSubmit }));

        act(() => {
            result.current.handleChange({
                target: { name: 'username', value: 'john' }
            } as React.ChangeEvent<HTMLInputElement>);
        });

        expect(result.current.values.username).toBe('john');
    });

    it('should validate and set errors on handleBlur', () => {
        const { result, waitForNextUpdate } = renderHook(() => useForm({ initialValues, onSubmit: mockOnSubmit, validate }));

        act(() => {
            result.current.handleBlur();
        });

        expect(result.current.errors).toEqual({
            username: 'Username is required',
            email: 'Email is required',
            password: 'Password is required'
        });
    });

    it('should not submit form when errors exist', () => {
        const { result, waitForNextUpdate } = renderHook(() => useForm({ initialValues, onSubmit: mockOnSubmit, validate }));

        act(() => {
            result.current.handleSubmit(mockFormSubmitEvent);
        });

        expect(mockOnSubmit).not.toHaveBeenCalled();
        expect(result.current.errors).toEqual({
            username: 'Username is required',
            email: 'Email is required',
            password: 'Password is required'
        });
        expect(result.current.isSubmitting).toBe(false);
    });

    it('should submit form when errors are resolved', () => {
        const { result, waitForNextUpdate } = renderHook(() => useForm({ initialValues: mockFormUser, onSubmit: mockOnSubmit, validate }));

        act(() => {
            result.current.handleSubmit(mockFormSubmitEvent);
        });

        expect(mockOnSubmit).toHaveBeenCalledWith(mockFormUser);
        expect(result.current.errors).toEqual({});
        expect(result.current.isSubmitting).toBe(false);
    });

    it('should reset form values and errors', () => {
        const { result, waitForNextUpdate } = renderHook(() => useForm({ initialValues, onSubmit: mockOnSubmit, validate }));

        act(() => {
            result.current.handleChange({
                target: { name: 'username', value: 'john' }
            } as React.ChangeEvent<HTMLInputElement>);
        });

        expect(result.current.values.username).toBe('john');

        act(() => {
            result.current.resetForm();
        });

        expect(result.current.values).toEqual(initialValues);
        expect(result.current.errors).toEqual({});
    });
});
