import { useState } from 'react';
import PropTypes from 'prop-types';
import { formatDistance } from 'date-fns';
import { Link } from 'react-router-dom';
import AddComment from './add-comment';

export default function Comments({ docId, comments: allComments, posted, commentInput }) {
  const [comments, setComments] = useState(allComments);
  const [viewAllComments, setViewAllComments] = useState(false);

  return (
    <>
      <div className="p-4 pt-1 pb-4">
        {comments.slice(0, 3).map((item) => (
          <p key={`${item.comment}-${item.displayName}`} className="mb-1">
            <Link to={`/p/${item.displayName}`}>
              <span className="mr-1 font-bold">{item.displayName}</span>
            </Link>
            <span>{item.comment}</span>
          </p>
        ))}
        {!viewAllComments && comments.length >= 3 && (
          <button
            type="button"
            className="text-sm text-gray-base mb-1 cursor-pointer"
            onClick={() => setViewAllComments(true)}
          >
            View all comments
          </button>
        )}
        {viewAllComments &&
          comments.slice(3, comments.length).map((item) => (
            <p key={`${item.comment}-${item.displayName}`} className="mb-1">
              <Link to={`/p/${item.displayName}`}>
                <span className="mr-1 font-bold">{item.displayName}</span>
              </Link>
              <span>{item.comment}</span>
            </p>
          ))}
        <p className="text-gray-base uppercase text-xs mt-2">
          {formatDistance(posted, new Date())} ago
        </p>
      </div>
      <AddComment
        docId={docId}
        comments={comments}
        setComments={setComments}
        commentInput={commentInput}
      />
    </>
  );
}

Comments.propTypes = {
  docId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  posted: PropTypes.number.isRequired,
  commentInput: PropTypes.object.isRequired
};
