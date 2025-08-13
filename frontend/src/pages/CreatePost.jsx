import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import bgVideo from "@/assets/sky1.mp4";
import { StarStill } from "@/components/StarStill.jsx";
import { TopicChip } from "@/components/forum/TopicChip";
import { Profile } from "@/components/forum/Profile";
import { TOPIC_COLOR_MAP } from "@/components/forum/constants/topics";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";

// Brings user to a page that lets them create their own post
const CreatePost = ({}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isAnonymous, SetIsAnonymous] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState([]);

  const topics = Object.keys(TOPIC_COLOR_MAP);
  const selectableTopics = topics.filter((topic) => topic !== "Default");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const toggleAnonymous = (anon) => {
    SetIsAnonymous(anon);
  };

  const handleSaveClick = () => {
    // onSave({ title, description });
    // Return call to database here and render the post

    setTitle("");
    setDescription("");
  };

  const handleTopicSelection = (topic, isSelected) => {
    if (isSelected) {
      setSelectedTopics((prevTopics) => [...prevTopics, topic]);
    } else {
      setSelectedTopics((prevTopics) => prevTopics.filter((t) => t !== topic));
    }
  };

  return (
    <>
      <Navbar />
      <video
        autoPlay
        muted
        loop
        playsInline
        className="fixed top-0 left-0 -z-20 h-screen w-full object-cover"
      >
        <source src={bgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="fixed top-0 left-0 -z-10 h-screen w-full bg-white/25 backdrop-blur-xs"></div>

      <main className="min-h-screen p-8 pt-32">
        <div className="flex flex-row text-left">
          <div className="flex flex-col justify-between">
            <div className="flex w-72 flex-col items-center gap-y-4 rounded-[25px] border border-white/50 bg-[#DFA69F]/25 p-4 backdrop-blur-xs">
              <label
                htmlFor="post-title"
                className="text-lg font-semibold text-gray-800"
              >
                Rules
              </label>
              {/* Formatting for displaying rules may be incorrect */}
              <p className="h-auto w-full rounded-md bg-white p-4">
                Follow these rules or you will be banned.
              </p>
            </div>

            <div className="rounded-[25px] border border-white/50 bg-[#DFA69F]/25 p-4 pt-12 backdrop-blur-xs">
              {/* ! Put in the user's profile information here */}
              <Profile name={"Main User"} />
            </div>
          </div>

          <div className="flex flex-1 flex-row gap-x-4">
            <div className="ml-4 w-full rounded-lg bg-white p-4 text-left">
              {/* Title */}
              <label
                htmlFor="post-title"
                className="text-2xl font-semibold text-gray-800"
              >
                Create Post
              </label>
              <div className="flex flex-col gap-y-2 py-2">
                <label
                  htmlFor="post-title"
                  className="text-lg font-semibold text-gray-800"
                >
                  Title
                </label>
                <Input
                  id="post-title"
                  type="text"
                  value={title}
                  onChange={handleTitleChange}
                  placeholder="Enter a title for your post"
                  className="w-full"
                />
              </div>

              {/* Topic Selection */}
              <div className="mt-4 flex flex-col">
                <label
                  htmlFor="post-description"
                  className="text-lg font-semibold text-gray-800"
                >
                  Topics
                </label>
                <div className="m-4 flex flex-row gap-x-4">
                  {selectableTopics.map((topic) => (
                    <TopicChip
                      key={topic}
                      topic={topic}
                      onSelect={handleTopicSelection}
                    />
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-y-2">
                <label
                  htmlFor="post-description"
                  className="text-lg font-semibold text-gray-800"
                >
                  Description
                </label>
                <Textarea
                  id="post-description"
                  value={description}
                  onChange={handleDescriptionChange}
                  placeholder="Write your post content here..."
                  rows={15}
                  className="h-60 w-full"
                />
              </div>

              {/* Submission */}
              <div className="flex flex-row justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="terms"
                    checked={isAnonymous}
                    onCheckedChange={toggleAnonymous}
                  />
                  <Label className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Anonymous
                  </Label>
                </div>

                <div className="flex flex-row justify-end gap-x-4">
                  <Link to="/community">
                    <Button className="mt-4 w-fit cursor-pointer self-end px-6 py-2">
                      Cancel
                    </Button>
                  </Link>
                  <Link to="/community">
                    <Button
                      onClick={handleSaveClick}
                      disabled={!title || !description}
                      className="mt-4 w-fit cursor-pointer self-end bg-blue-500 px-6 py-2 text-sm text-white transition hover:bg-blue-600"
                    >
                      Post
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <StarStill />
      <Footer />
    </>
  );
};

export default CreatePost;