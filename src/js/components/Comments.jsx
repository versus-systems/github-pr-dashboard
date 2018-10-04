import React from 'react';

export function Comments(props) {
  const { positiveCommentCount } = props;
  const count = props.comments.length;

  if (typeof count === 'undefined') {
    return <div></div>;
  }

  return (
    <div className="pr-comments">
      <div className="pr-comment-count" title={`${count} comments`}>
        <i className="fa fa-comment-o"></i> {count}
      </div>
      <div className="pr-comment-positive" title={`${positiveCommentCount} positive comments`}>
        <i className="fa fa-thumbs-o-up"></i> {positiveCommentCount}
      </div>
    </div>
  );
}

Comments.propTypes = {
  positiveCommentCount: React.PropTypes.number,
  negativeCommentCount: React.PropTypes.number,
  comments: React.PropTypes.array,
  reactions: React.PropTypes.array
};
