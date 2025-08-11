import { useState } from "react";
import { Bookmark } from "lucide-react";

export const Saves = () => {
  const [saved, setSaved] = useState(false);

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => setSaved(!saved)}
        aria-label={saved ? "Unsave" : "Save"}
        className={`transition-transform duration-200 ease-in-out 
          ${saved ? "text-black" : "text-black hover:text-gray-500"} 
          hover:scale-110`}
      >
        <Bookmark
          className="w-6 h-6"
          fill={saved ? "currentColor" : "none"}
          strokeWidth={1.75}
        />
      </button>
    </div>
  );
};
