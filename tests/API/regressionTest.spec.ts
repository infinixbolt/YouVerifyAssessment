import { test, expect } from '@playwright/test';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

test.describe('Regression Tests', () => {
  
  // Test for creating a post
  test('Regression Test: Create a new post and verify it can be retrieved', async ({ request }) => {
    const newPost = { userId: 1, title: 'Mourinho', body: 'Welcome to Stamford Bridge' };

    // Step 1: Create a new post
    const createResponse = await request.post(`${API_BASE_URL}/posts`, { data: newPost });
    expect(createResponse.status()).toBe(201);

    const createdPost = await createResponse.json();
    const postId = createdPost.id;

    const getResponse = await request.get(`${API_BASE_URL}/posts/${postId}`);
    expect(getResponse.status()).toBe(200);

    const retrievedPost = await getResponse.json();
    expect(retrievedPost).toMatchObject({ ...newPost, id: postId });
  });

  // Test for updating a post
  test('Regression Test: Update an existing post', async ({ request }) => {
    const updatedPost = { userId: 1, id: 1, title: 'Updated Title', body: 'Updated body content.' };

    const updateResponse = await request.put(`${API_BASE_URL}/posts/1`, { data: updatedPost });
    expect(updateResponse.status()).toBe(200);

    const retrievedUpdatedPost = await updateResponse.json();
    expect(retrievedUpdatedPost).toMatchObject(updatedPost);
  });

  // Test for deleting a post
  test('Regression Test: Delete a post and verify it is deleted', async ({ request }) => {
    const deleteResponse = await request.delete(`${API_BASE_URL}/posts/1`);
    expect(deleteResponse.status()).toBe(200);

    // Verify the post is deleted
    const getResponse = await request.get(`${API_BASE_URL}/posts/1`);
    expect(getResponse.status()).toBe(404); 
  });
});
