import logger from "../../src/utils/logger.utils.js";
import Comment from "../models/Comments.model.js";

export const postComment = async (req, res) => {
  try {
    const resComment = await Comment.create(req.body);
    console.log(req.body.text, req.user.name, req.params.postId);
    res.status(200).json(resComment);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

export const getCommentsOnSinglePost = async (req, res) => {
  const { postId } = req.params;
 
  try {
    const resComments = await Comment.find({ discussionId: postId }).sort({createdAt:-1});
    const result=resComments
    // logger("log",postId,resComments)
    // logger("log",result.length)
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err.message);
  }
};
export const getCommentCount = async (req, res) => {
  const { postId } = req.params;
  try {
    const resCount = await Comment.countDocuments({ discussionId: postId }).sort({createdAt:-1});

    // logger("log",postId,resComments)
    logger("log",resCount)
    res.status(200).json(resCount);
  } catch (err) {
    res.status(400).json(err.message);
  }
};
