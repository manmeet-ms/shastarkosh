import { z } from "zod";

export const forumPostSchema = z.object({
  title: z
    .string()
    .min(8, "Title must be at least 8 characters")
    .max(100, "Title cannot exceed 100 characters"),

  content: z
    .string()
    .min(20, "Content must be at least 20 characters long")
    .max(5000, "Content too long"),

  tags: z.string().refine(
    (val) => {
      const tags = val.split(",").map((t) => t.trim()).filter(Boolean);
      return tags.length > 0 && tags.length <= 8;
    },
    { message: "Enter 1–8 comma-separated tags" }
  ),

  category: z.string().min(1, "Please select a category"),
});

export type ForumPostFormType = z.infer<typeof forumPostSchema>;