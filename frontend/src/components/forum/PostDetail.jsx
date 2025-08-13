import { formatDistanceToNow } from "date-fns";
import { User, X } from "lucide-react";
import { Comments } from "./Comments";
import { Profile } from "./Profile";
import { TopicChip } from "./TopicChip";
import { Interactions } from "./Interactions";

export const PostDetail = ({ post, onClose }) => {
  if (!post) return null;

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
          <Interactions likes={likes} comments={comments} saved={saved} />

          {topics && topics.length > 0 && (
            <div className="flex justify-between gap-x-4">
              {topics.map((topic, index) => (
                <TopicChip key={index} topic={topic} />
              ))}
            </div>
          )}
        </div>

        <Comments postComments={comments} />
      </div>
    </div>
  );
};