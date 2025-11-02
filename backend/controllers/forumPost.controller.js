import logger from "../../src/utils/logger.utils.js";
import Comment from "../models/Comments.model.js";
import ForumPost from "../models/ForumPost.model.js";
import User from "../models/User.model.js";

export async function getForumPost(req, res) {
  try {
    let limit = 20; // from query string
    const totalPosts = await ForumPost.countDocuments();
    if (req.query.limit && req.query.limit <= totalPosts) {
      limit = parseInt(req.query.limit); // from query string
    } 

    const result = await ForumPost.find().sort({ createdAt: -1 }).limit(limit);
    // logger("log","Total Posts", result.length);
    // logger("log","Posts details", result);

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err });

    logger("error", err.message);
  }
}
export async function getSingleForumPost(req, res) {
  try {
    const { pId } = req.params;
    const resPost = await ForumPost.findById(pId);
    const resComments = await Comment.find({ discussionId: pId }).sort({ createdAt: -1 });
    // console.log("Forum Post", resPost);
    const authorDetails = await User.findById(resPost.author);
    // console.log(authorDetails);
    
    // TODO minimize the: 2 api valls per post fetch
    // const result={ post: resPost, author: {name: authorDetails.name,username:authorDetails.username, avatar:authorDetails.avatar} }

    const result = { post: resPost, comments: resComments ,author:authorDetails};
    
    
    logger("info", resPost.category,result.categoryName
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err });

    logger("error", err.message);
  }
}
export async function createForumPost(req, res) {
  try {
    // const { title, content, category } = req.body;
    const result = await ForumPost.create({
      ...req.body,
    });
    res.status(200).json({ result: result });
  } catch (err) {
    res.status(500).json({ error: err });

    logger("error", err.message);
  }
}
export async function updateForumPost(req, res) {
  try {
    const result = await ForumPost.findAnd;
    res.status(200).json({ result: result });
  } catch (err) {
    res.status(500).json({ error: err });

    logger("error", err.message);
  }
}
export async function deleteForumPost(req, res) {
  try {
    const result = await ShastarInfo;
    res.status(200).json({ result: result });
  } catch (err) {
    res.status(500).json({ error: err });

    logger("error", err.message);
  }
}

export async function upvotePost(req, res) {
  
    const { postId } = req.params;
    logger("info", "upvotePost",postId)
    try {
      const resPost = await ForumPost.findByIdAndUpdate(postId);
      resPost.upvotes += 1;
      await resPost.save();
      res.status(200).json("upvote Successful");
    } catch (err) {
      res.status(500).json(err.message);
    }
   
}
export async function downvotePost(req, res) {
  const { postId } = req.params;
  logger("info", "downvotePost",postId)
try {
    const resPost = await ForumPost.findByIdAndUpdate(postId);
    resPost.downvotes += 1;
    await resPost.save();
    res.status(200).json("downvote Successful");
  } catch (err) {
    res.status(500).json(err.message);
  }
}
