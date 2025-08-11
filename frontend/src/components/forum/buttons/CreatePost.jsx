import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { SquarePen } from "lucide-react";

export const CreatePost = () => {
  return (
    <Button asChild>
      <Link to="/create-post" className="w-56">
        <SquarePen></SquarePen> Create Thread
      </Link>
    </Button>
  );
};