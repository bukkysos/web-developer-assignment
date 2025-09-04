export const selectPostsTemplate = `
SELECT *
FROM posts
WHERE user_id = ?
`;

export const insertPostTemplate = `
    INSERT INTO posts (user_id, title, body, created_at)
    VALUES (?, ?, ?, ?)
`;