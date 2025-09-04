import { Router, Request, Response } from "express";
import { addPost, getPosts } from "../db/posts/posts";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const userId = req.query.userId?.toString();
  if (!userId) {
    res.status(400).send({ error: "userId is required" });
    return;
  }
  const posts = await getPosts(userId);
  res.send(posts);
});

router.post("/", async (req: Request, res: Response) => {
  // const userId = req.params.userId;
  console.log("=== body check ===", req.body)
  const { title, body, userId } = req.body;
  if (!title || !body) {
    res.status(400).send({ error: "title and body are required" });
    return;
  }
  const created_at = new Date().toISOString();
  const post = await addPost(userId, title, body, created_at);
  res.status(201).send({ message: "Post added successfully", post });
});

export default router;
