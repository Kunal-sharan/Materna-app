import { MessageCircle } from "lucide-react";

export const CommentIcon = ( {comments} ) => {
  return (
    <div className="flex items-center space-x-2 text-gray-700 p-4">
        <MessageCircle className="h-5 w-5 text-gray-500" />
        <span className="text-sm font-medium">{comments.length}</span>
    </div>
  );
};