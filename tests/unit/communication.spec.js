
import { handleSuccess } from '../../src/communication/communication.js';

describe('handleSuccess function', () => {
    test('should return data if response status is 200 and data is valid', () => {
        const response = {
        status: 200,
        data: { example: 'data' }
        };
        const result = handleSuccess(response);
        expect(result).toEqual({ example: 'data' });
    });

    test('should return null if response status is not 200', () => {
        const response = {
        status: 404,
        statusText: 'Not Found'
        };
        const result = handleSuccess(response);
        expect(result).toBeNull();
    });

    test('should return null if response data is not an object', () => {
        const response = {
        status: 200,
        data: 'invalid data'
        };
        const result = handleSuccess(response);
        expect(result).toBeNull();
    });

    test('should log "Data fetched successfully" if data is valid', () => {
        const response = {
        status: 200,
        data: { example: 'valid data' }
        };
        const consoleSpy = jest.spyOn(console, 'log');
        handleSuccess(response);
        expect(consoleSpy).toHaveBeenCalledWith('Data fetched successfully');
        consoleSpy.mockRestore();
    });

    test('should log error message if data is invalid', () => {
        const response = {
        status: 404,
        statusText: 'Not Found'
        };
        const consoleSpy = jest.spyOn(console, 'error');
        handleSuccess(response);
        expect(consoleSpy).toHaveBeenCalledWith('Error HTTP: 404 Not Found');
        consoleSpy.mockRestore();
    });
});
