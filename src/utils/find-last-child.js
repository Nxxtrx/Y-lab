export default function findLastComment(comment) {
  if (comment.children && comment.children.length > 0) {
    return findLastComment(comment.children[comment.children.length - 1]);
  }
  return comment;
}