import { formatDistanceToNow } from "date-fns";
import { Profile } from "./Profile";
import { TopicChip } from "./TopicChip";
import { User } from "lucide-react";
import { Interactions } from "./Interactions";

export const Post = ({ post, onPostClick }) => {
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
    <div
      className="flex flex-col rounded-[25px] bg-white px-12 py-4"
      onClick={() => onPostClick(post)}
    >
      <div className="flex justify-between">
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
      </div>
      <h1 className="text-left text-[32px]">{title}</h1>
      <div className="my-4 text-left">{description}</div>
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
    </div>
  );
};