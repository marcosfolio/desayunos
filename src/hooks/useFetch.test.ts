import { renderHook, waitFor, cleanup } from '@testing-library/react';
import { useFetch } from './useFetch';

describe('useFetch', () => {
    beforeEach(() => {
        global.fetch = jest.fn();
    });

    afterEach(() => {
        cleanup();
        jest.resetAllMocks();
    });

    it('should fetch data successfully', async () => {
        const mockData = { test: 'data' };
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockData,
        });

        const { result } = renderHook(() =>
            useFetch<typeof mockData>('test-url')
        );

        expect(result.current.loading).toBe(true);
        expect(result.current.error).toBe(null);
        expect(result.current.data).toBe(null);

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.error).toBe(null);
        expect(result.current.data).toEqual(mockData);
    });

    it('should handle errors', async () => {
        const error = new Error('Failed to fetch');
        (global.fetch as jest.Mock).mockRejectedValueOnce(error);

        const { result } = renderHook(() =>
            useFetch<any>('test-url')
        );

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.error).toEqual(error);
        expect(result.current.data).toBe(null);
    });
}); 