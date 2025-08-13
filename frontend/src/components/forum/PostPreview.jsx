import { User } from "lucide-react";
import { Profile } from "./Profile";
import { Interactions } from "./Interactions";

export const PostPreview = ({ post }) => {
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

  return (
    <div className="flex h-full flex-col rounded-[25px] border border-solid border-[#DFA69F]/75 bg-white px-4 py-2 text-left">
      <div className="flex flex-col justify-between gap-y-2">
        <div className="flex flex-col">
          <h1 className="text-[32px] font-bold">{title}</h1>
          {anonymous ? (
            <div className="flex items-center space-x-4">
              <User className="mr-4 flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-200" />{" "}
              Anonymous
            </div>
          ) : (
            <Profile name={name} />
          )}
          {description}
        </div>

        <Interactions likes={likes} comments={comments} saved={saved} />
      </div>
    </div>
  );
};
