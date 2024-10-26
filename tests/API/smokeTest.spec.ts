import { test, expect} from '@playwright/test';

test.describe('JSONPlaceholder API Smoke Tests', () => {
  // Base URL setup for JSONPlaceholder
  test.use({ baseURL: 'https://jsonplaceholder.typicode.com' });

  test('GET /posts should return status 200', async ({ request }) => {
    const response = await request.get('/posts');
    expect(response.status()).toBe(200);
  });

  test('GET /posts/1 should return status 200 and an object with an id', async ({ request }) => {
    const response = await request.get('/posts/1');
    expect(response.status()).toBe(200);
    const post = await response.json();
    expect(post).toHaveProperty('id', 1); // Basic check for ID existence
  });

  test('GET /posts/1/comments should return status 200 and contain exactly 5 comments', async ({ request }) => {
    const response = await request.get('/posts/1/comments');
    expect(response.status()).toBe(200);
    const comments = await response.json();
    expect(comments.length).toBe(5);
  });
  

  test('GET /comments?postId=1 should return status 200', async ({ request }) => {
    const response = await request.get('/comments?postId=1');
    expect(response.status()).toBe(200);
  });

  test('POST /posts should create a new post and return status 201', async ({ request }) => {
    const response = await request.post('/posts', {
      data: { userId: 1, title: 'Julian', body: 'Welcome to youverify' },
    });
    expect(response.status()).toBe(201);
  });

  test('PUT /posts/1 should return status 200', async ({ request }) => {
    const response = await request.put('/posts/1', {
      data: { userId: 1, title: 'Festus', body: 'Goodbye youverify' },
    });
    expect(response.status()).toBe(200);
  });

  test('DELETE /posts/1 should return status 200', async ({ request }) => {
    const response = await request.delete('/posts/1');
    expect(response.status()).toBe(200);
  });
});
