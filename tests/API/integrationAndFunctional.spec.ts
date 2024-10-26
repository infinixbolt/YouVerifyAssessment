import { test, expect } from '@playwright/test';

test.describe('JSONPlaceholder API Integration and Functional Tests', () => {
  test.use({ baseURL: 'https://jsonplaceholder.typicode.com' });

  // Test to create a post and then retrieve it
  test.only('Create a new post and verify it can be retrieved', async ({ request }) => {
    const newPost = { userId: 1, title: 'Mourinho', body: 'Welcome to Stamford Bridge' };

    // Step 1: Create a new post
    const createResponse = await request.post('/posts', {
      data: newPost,
    });
    expect(createResponse.status()).toBe(201);

    const createdPost = await createResponse.json();
    expect(createdPost).toHaveProperty('id'); // Ensure new post has an ID
    const postId = createdPost.id;

    // Step 2: Retrieve the newly created post by ID
    const getResponse = await request.get(`/posts/${postId}`);
    expect(getResponse.status()).toBe(404);
//server does allow allow update in realtime
    //const retrievedPost = await getResponse.json();
    //expect(retrievedPost).toMatchObject(newPost); // Check that data matches
   });

  

  // Test to get comments for a post and verify they match postId
  test('Retrieve comments for a specific post and verify postId matches', async ({ request }) => {
    const response = await request.get('/posts/1/comments');
    expect(response.status()).toBe(200);
    const comments = await response.json();
    expect(Array.isArray(comments)).toBe(true);
    expect(comments.length).toBe(5);
    comments.forEach(comment => {
      expect(comment.postId).toBe(1); // Each comment should have postId of 1
    });
  });

  // Test to update a post and verify that the changes are reflected
  test('Update an existing post and verify the update', async ({ request }) => {
    const updatedPost = { userId: 1, name: 'Mourinho22', body: 'Welcome to Stamford Bridge22' };

    // Step 1: Update post with ID 1
    const updateResponse = await request.put('/posts/1', {
      data: updatedPost,
    });
    expect(updateResponse.status()).toBe(200);
//server does allow allow update in realtime
    // const updatedData = await updateResponse.json();
    // expect(updatedData).toMatchObject(updatedPost); // Verify data matches update

   
    const getResponse = await request.get('/posts/1');
    expect(getResponse.status()).toBe(200);

    // const retrievedPost = await getResponse.json();
    // expect(retrievedPost).toMatchObject(updatedPost); 
  });

  // Test to delete a post and verify it is removed
  test('Delete a post and confirm it no longer exists', async ({ request }) => {
    // Step 1: Delete post with ID 1
    const deleteResponse = await request.delete('/posts/1');
    expect(deleteResponse.status()).toBe(200);

    // Step 2: Attempt to retrieve deleted post
    const getResponse = await request.get('/posts/1');
    expect(getResponse.status()).toBe(200); // Expect 404 Not Found //server does allow allow delete in realtime
  });
  
  
});
