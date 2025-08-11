import { useState } from "react";
import { Heart, HeartOff } from "lucide-react";
import { cn } from "@/lib/utils";

// TODO: When making a component with Likes, Comments, and Saves, you may want to include Props to pass in the number of likes and comments each post currently has
export const Likes = ( {currentLikes} ) => {
  const [liked, setLiked] = useState(false);
  const [numLikes, setNumLikes] = useState(currentLikes);

  const handleLiked = () => {
    setNumLikes((prevCount) => (liked ? prevCount - 1 : prevCount + 1));
    setLiked(!liked);
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={handleLiked}
        className={cn(
          "transition-all duration-200 ease-in-out",
          liked ? "text-red-500 scale-110" : "text-gray-500 hover:scale-105"
        )}
        aria-label={liked ? "Unlike" : "Like"}
      >
        {liked ? <Heart fill="currentColor" /> : <Heart />}
      </button>
      <span className="text-sm text-gray-700">{numLikes}</span>
    </div>
  );
};
