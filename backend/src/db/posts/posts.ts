import { connection } from "../connection";
import { insertPostTemplate, selectPostsTemplate } from "./query-tamplates";
import { Post } from "./types";

export const getPosts = (userId: string): Promise<Post[]> =>
  new Promise((resolve, reject) => {
    connection.all(selectPostsTemplate, [userId], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results as Post[]);
    });
  });

export const addPost = (userId: string, title: string, body: string, created_at: string): Promise<void> =>
  new Promise((resolve, reject) => {
    connection.run(insertPostTemplate, [userId, title, body, created_at], function (error) {
      if (error) {
        reject(error);
      }
      resolve({
          id: this?.lastID,
          userId,
          title,
          body,
          created_at,
        } as unknown as void);
    });
  });