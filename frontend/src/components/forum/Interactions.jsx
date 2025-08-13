import { CommentIcon } from "./CommentIcon";
import { Likes } from "./Likes";
import { Saves } from "./Saves";

export const Interactions = ({ likes, comments, saved }) => {
  return (
    <div className="flex justify-start">
      <Likes currentLikes={likes} />
      <CommentIcon comments={comments} />
      <Saves />
      {/* TODO: Make sure to add whether saved is true or false */}
    </div>
  );
};
