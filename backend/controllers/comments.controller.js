import logger from "../../src/utils/logger.utils.js";
import Comment from "../models/Comments.model.js";

export const postComment = async (req, res) => {
  const { comment, author } = req.body;
  try {
    const resComment = await Comment.create({
      content: comment,
      author: { ...author },
      discussionId: req.params.postId,
    });
    console.log(req.body.text, req.user, req.params.postId);
    res.status(200).json(resComment);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

export const getCommentsOnSinglePost = async (req, res) => {
  const { postId } = req.params;
  try {
    const resComments = await Comment.find({ discussionId: postId }).sort({createdAt:-1});
    logger("log",postId,resComments)
    
    res.status(200).json(resComments);
  } catch (err) {
    res.status(400).json(err.message);
  }
};
