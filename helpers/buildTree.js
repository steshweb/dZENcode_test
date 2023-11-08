const commentIdTree = (comments, targetId) => {
  const commentObj = {};
  const rootComment = [];

  comments.forEach(({ id, user_name, message_text, email, parent_id, home_page, file_path, created_at }) => {
    commentObj[id] = {
      id,
      user_name,
      message_text,
      email,
      parent_id,
      home_page,
      file_path,
      created_at,
      replies: [],
    };
  });

  comments.forEach((comment) => {
    if (comment.id === targetId) {
      rootComment.push(commentObj[comment.id]);
    } else {
      const parentComment = commentObj[comment.parent_id];
      if (parentComment) {
        parentComment.replies.push(commentObj[comment.id]);
      }
    }
  });

  return rootComment;
};

const allCommentsTree = comments => {
  const commentObj = {};
  const rootComments = [];

  comments.forEach(({ id, user_name, message_text, email, parent_id, home_page, file_path, created_at }) => {
    commentObj[id] = {
      id,
      user_name,
      message_text,
      email,
      parent_id,
      home_page,
      file_path,
      created_at,
      replies: [],
    };
  });

  comments.forEach((comment) => {
    if (comment.parent_id === null) {
      rootComments.push(commentObj[comment.id]);
    } else {
      const parentComment = commentObj[comment.parent_id];
      if (parentComment) {
        parentComment.replies.push(commentObj[comment.id]);
      }
    }
  });

  return rootComments;
}

module.exports = {
  allCommentsTree,
  commentIdTree
}
