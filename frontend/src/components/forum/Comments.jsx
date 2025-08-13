import { Likes } from "./Likes";
import { MessageCircle } from "lucide-react";
import { useState } from "react";

// ! Make sure to link up comments to the database
// ? What do you want to do with the top level cancel button?
export const Comments = ({ postComments }) => {
  const [comments, setComments] = useState(postComments);

  const onComment = (newComment) => {
    setComments([...comments, newComment]);
  };

  return (
    <>
      <div className="h-px w-full bg-gray-300" />
      <div className="flex flex-col gap-3 p-2">
        <span className="text-left">Comments</span>
        <CommentInput handleComment={onComment} />

        <div className="flex flex-col gap-y-3 text-left">
          {comments.map((comment, index) => (
            <Reply key={index} comment={comment} />
          ))}
        </div>
      </div>
    </>
  );
};

const Reply = ({ comment }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [comments, setComments] = useState(comment.comments);

  const onComment = (newComment) => {
    setComments([...comments, newComment]);
  };

  const toggleReply = () => {
    setIsReplying(!isReplying);
  };

  return (
    <div className="flex flex-col gap-2 border-l-2 border-gray-200 py-2 pl-4">
      <div className="rounded-lg bg-gray-100 p-3 text-sm text-gray-800 shadow-sm">
        {comment.body}
        <button
          className="flex flex-row mt-4 gap-x-4 text-sm font-medium text-gray-500 transition-colors hover:text-black"
          onClick={toggleReply}
        >
          <Likes currentLikes={comment.likes} />

          <div className="flex flex-row gap-x-1">
            <MessageCircle className="h-5 w-5 text-gray-500" />
            Reply
          </div>
        </button>
      </div>

      {isReplying && (
        <CommentInput handleComment={onComment} toggleReply={toggleReply} />
      )}
      <div className="flex flex-col gap-y-3 text-left">
        {comments.map((comment, index) => (
          <Reply key={index} comment={comment} />
        ))}
      </div>
    </div>
  );
};

const CommentInput = ({ handleComment, toggleReply }) => {
  const [input, setInput] = useState("");

  return (
    <div className="flex flex-col items-end gap-2">
      <textarea
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Join the conversation..."
        className="h-10 w-full resize-none rounded-[5px] border border-gray-300 bg-white py-2 pr-10 pl-2 text-sm transition-all duration-300 ease-in-out focus:h-24 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />

      <div className="flex flex-row gap-x-2">
        <button
          type="submit"
          className="max-w-min rounded bg-gray-500 px-3 py-2 text-sm text-white transition hover:bg-gray-600"
          onClick={toggleReply}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="max-w-min rounded bg-blue-500 px-3 py-2 text-sm text-white transition hover:bg-blue-600"
          onClick={() => {
            handleComment({ body: input.trim(), comments: [], likes: 0 });
            setInput("");
          }}
        >
          Post
        </button>
      </div>
    </div>
  );
};