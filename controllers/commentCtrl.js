const { allCommentsTree, commentIdTree } = require('../helpers/buildTree');
const checkFile = require('../helpers/checkFile');
const Comment = require('../models/commentModel');

const addComment = async (req, res) => {
  const { user_name, email, home_page, parent_id, message_text } = req.body;

  const file_path = req.file ? await checkFile(req.file) : null;

  try {
    const createdComment = await Comment.create({
      user_name,
      message_text,
      email,
      parent_id,
      home_page,
      file_path
    });

    res.json(createdComment);
  } 
  catch (error) {
    res.status(500).json(error.message);
  }
}

const getAllComments = async (req, res) => {
  try {
    const allComments = await Comment.findAll();
    const commentTree = allCommentsTree(allComments);
    res.status(200).json(commentTree);
  }
  catch (error){
    res.status(500).json(error.message);
  }
}

const getCommentById = async(req, res) => {
  const commentID = Number(req.params.commentID);

  try {
    const mainComment = await Comment.findByPk(commentID);

    if (!mainComment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    const allComments = await Comment.findAll();
    const commentTree = commentIdTree(allComments, commentID);
    res.json(commentTree);
  }
  catch (error){
    res.status(500).json(error.message);
  }
}

module.exports = {
  addComment,
  getAllComments,
  getCommentById
};
