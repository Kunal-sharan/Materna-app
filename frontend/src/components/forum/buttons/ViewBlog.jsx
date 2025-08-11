import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { BookHeart } from "lucide-react";

export const ViewBlog = () => {
  return (
    <Button asChild>
      <Link to="/blog" className="w-56">
        <BookHeart></BookHeart>View Blog
      </Link>
    </Button>
  );
};