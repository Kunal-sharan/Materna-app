import { formatDistanceToNow } from "date-fns";
import { User, X } from "lucide-react";
import { Likes } from "./Likes";
import { Comments } from "./Comments";
import { CommentIcon } from "./CommentIcon";
import { Saves } from "./Saves";
import { Profile } from "./Profile";
import { TopicChip } from "./TopicChip";
import { useState } from "react";

// TODO: Add in a response that is more consistent with comments

export const PostDetail = ({ post, onClose }) => {
  if (!post) return null;

  const [query, setQuery] = useState("");

  const {
    title,
    description,
    timePosted,
    anonymous,
    topics,
    name,
    likes,
    comments,
    saved,
  } = post;

  const postTime = formatDistanceToNow(new Date(timePosted), {
    addSuffix: true,
    includeSeconds: false,
  });
  const formattedPostTime = postTime.replace("about ", "");

  const handleSendMessage = () => {
    if (query.trim() === "") {
      return;
    }

    // Send data to API/database
    console.log("Sending message:", query);

    // Render it in comments

    setQuery("");
  };

  return (
    <div className="bg-opacity-50 fixed inset-0 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-3xl rounded-lg bg-white px-10 py-6 shadow-xl overflow-y-scroll max-h-10/12">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-x-2">
              {anonymous ? (
                <div className="flex items-center space-x-4">
                  <User className="mr-4 flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-200" />{" "}
                  Anonymous
                </div>
              ) : (
                <Profile name={name} />
              )}
              <span className="text-gray-600">&middot;</span>
              {formattedPostTime}

              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                aria-label="Close modal"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <h1 className="text-left text-[32px]">{title}</h1>
          </div>
        </div>
        <p className="text-left text-gray-700">{description}</p>
        <div className="flex justify-between">
          <div className="flex justify-start">
            <Likes currentLikes={likes} />
            <CommentIcon comments={comments}/>
            <Saves />
            {/* TODO: Make sure to add whether saved is true or false */}
          </div>

          {topics && topics.length > 0 && (
            <div className="flex justify-between gap-x-4">
              {topics.map((topic, index) => (
                <TopicChip key={index} topic={topic} />
              ))}
            </div>
          )}
        </div>

        {/* If the commentn is pressed, reveal a reply to that comment instead */}
        {/* <div class="relative my-2 flex-1">
          <textarea
            placeholder="Join the conversation..."
            class="h-10 w-full resize-none rounded-[5px] border border-gray-300 bg-white py-2 pr-10 pl-2 text-sm transition-all duration-300 ease-in-out focus:h-24 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button
            onClick={handleSendMessage}
            className="text-white focus:ring-2 focus:outline-none"
            aria-label="Send message"
          >
            <SendHorizontal class="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 transition-colors hover:text-black"></SendHorizontal>
          </button>
        </div> */}
        <Comments postComments={comments} />
      </div>
    </div>
  );
};
