// components/CommentSection.jsx
import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline'

function Comment({ comment, setComment, onSubmit, comments }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 mb-6">
      <div className="flex items-center mb-3">
        <ChatBubbleLeftIcon className="h-5 w-5 text-gray-600 mr-2" />
        <h2 className="text-lg font-semibold text-gray-800">Comments</h2>
      </div>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Add a comment..."
        rows="3"
      ></textarea>

      <button
        onClick={onSubmit}
        className="mt-3 flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
      >
        <ChatBubbleLeftIcon className="h-4 w-4 mr-1" />
        Submit Comment
      </button>

      <div className="mt-4">
        {(Array.isArray(comments) ? comments : []).map((comment) => (
          <div
            key={comment._id}
            className="bg-gray-100 border rounded-lg p-3 mb-2 shadow-sm"
          >
            <p className="text-gray-800">{comment.text}</p>
            <p className="text-sm text-gray-500 mt-1">
              By: {comment.author?.name || 'Anonymous'}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Comment
