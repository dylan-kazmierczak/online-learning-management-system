/**
 * API Integration Tests
 * Tests for the axios helper utility (unit tests with mocked axios)
 */

const axios = require('axios');

// Mock the axios module
jest.mock('axios');

// Re-require the helper after mocking (must be after jest.mock)
const requester = require('../src/utils/axios_helper');

describe('axios_helper - get_request', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('returns success:true with data on a successful GET', async () => {
    const mockData = { id: 1, name: 'Test' };
    axios.request.mockResolvedValue({ data: mockData });

    const result = await requester.get_request('http://localhost:8080/api/stats');

    expect(result.success).toBe(true);
    expect(result.data).toEqual(mockData);
    expect(result.config.method).toBe('get');
    expect(result.config.url).toBe('http://localhost:8080/api/stats');
  });

  test('returns success:false with error data on HTTP error', async () => {
    const errorResponse = { response: { data: { error: 'Not found' } } };
    axios.request.mockRejectedValue(errorResponse);

    const result = await requester.get_request('http://localhost:8080/api/nonexistent');

    expect(result.success).toBe(false);
    expect(result.data).toEqual({ error: 'Not found' });
  });

  test('returns success:false with message on network error', async () => {
    const networkError = new Error('Network Error');
    axios.request.mockRejectedValue(networkError);

    const result = await requester.get_request('http://localhost:8080/api/stats');

    expect(result.success).toBe(false);
    expect(result.data).toBe('Network Error');
  });

  test('uses default headers when none provided', async () => {
    axios.request.mockResolvedValue({ data: {} });

    const result = await requester.get_request('http://localhost:8080/api/users');

    expect(result.config.headers['Content-Type']).toBe('application/json');
    expect(result.config.headers.Accept).toBe('application/json');
  });

  test('uses provided custom headers', async () => {
    axios.request.mockResolvedValue({ data: {} });

    const customHeaders = { Authorization: 'Bearer my-token', Accept: 'application/json' };
    const result = await requester.get_request('http://localhost:8080/api/users', customHeaders);

    expect(result.config.headers.Authorization).toBe('Bearer my-token');
  });
});

describe('axios_helper - post_request', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('returns success:true with data on a successful POST', async () => {
    const mockData = { created: true };
    axios.request.mockResolvedValue({ data: mockData });

    const result = await requester.post_request('http://localhost:8080/auth/login', { email: 'test@test.com', password: 'pass' });

    expect(result.success).toBe(true);
    expect(result.data).toEqual(mockData);
    expect(result.config.method).toBe('post');
  });

  test('returns success:false on POST failure', async () => {
    const errorResponse = { response: { data: { error: 'Unauthorized' } } };
    axios.request.mockRejectedValue(errorResponse);

    const result = await requester.post_request('http://localhost:8080/auth/login', { email: 'bad@bad.com', password: 'wrong' });

    expect(result.success).toBe(false);
    expect(result.data).toEqual({ error: 'Unauthorized' });
  });

  test('includes the request body in the config', async () => {
    const body = { courseId: 1 };
    axios.request.mockResolvedValue({ data: {} });

    const result = await requester.post_request('http://localhost:8080/enroll', body);

    expect(result.config.data).toEqual(body);
  });
});
