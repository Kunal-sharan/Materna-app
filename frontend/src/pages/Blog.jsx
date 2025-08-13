import bgVideo from "@/assets/sky1.mp4";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StarStill } from "@/components/StarStill.jsx";
import { Profile } from "@/components/forum/Profile";
import { Dropdown } from "@/components/forum/Dropdown";
import { CreatePost } from "@/components/forum/buttons/CreatePost";
import { PostPreview } from "@/components/forum/PostPreview";
import { TOPIC_COLOR_MAP } from "@/components/forum/constants/topics";
import { useState } from "react";

const examplePosts = [
  {
    id: 1,
    title: "Test Post with anonymity",
    description:
      "I've been feeling a bit sluggish lately. Does anyone have tips on how to keep energy levels up?",
    timePosted: "2025-08-03T18:30:00Z",
    anonymous: true,
    topics: ["Advice"],
    name: "Anonymous Panda",
    likes: 15,
    comments: [
      {
        body: "This is a test comment",
        comments: [{ body: "A test reply comment", comments: [], likes: 10 }],
        likes: 15,
      },
      { body: "Another test comment", comments: [], likes: 10 },
    ],
    saved: true, // ! Haven't implemented save toggle yet
  },
  {
    id: 2,
    title: "Test Post without anonymity",
    description:
      "I'm so excited to share my daily healthy breakfast! Eat healthy on a budget",
    timePosted: "2025-08-03T15:45:00Z",
    anonymous: false,
    topics: ["Wins", "Support"],
    name: "SuperMom",
    likes: 87,
    comments: [{ body: "This is a test comment", comments: [], likes: 15 }],
    saved: false,
  },
];

const topics = Object.keys(TOPIC_COLOR_MAP);
const selectableTopics = [
  "All",
  ...topics.filter((topic) => topic !== "Default"),
];

const categories = ["Posts", "Comments", "Saved", "Liked"];

const Blog = ({ banner }) => {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [posts, setPosts] = useState(examplePosts);

  const handleTopicChange = (newTopics) => {
    setSelectedTopics(newTopics);
  };

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen overflow-hidden pt-32">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="fixed top-0 left-0 -z-10 h-screen w-full object-cover"
        >
          <source src={bgVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <StarStill />
        <div className="fixed top-0 left-0 -z-10 h-screen w-full bg-white/25 backdrop-blur-xs"></div>
        <div className="flex flex-col">
          <div className="max-h-md relative h-[30vh] overflow-hidden">
            <div className="absolute bottom-5 left-5 flex w-full max-w-xs rounded-[25px] border border-[#DFA69F] bg-white/75 p-4 pt-12 backdrop-blur-xs">
              {/* ! Put in the user's profile information here including profile picture */}
              <Profile name={"Main User"} />
            </div>
            <img src={banner} className="h-full w-full object-cover"></img>
          </div>
          <div className="flex flex-col gap-y-3 bg-white p-8">
            <h1 className="text-left text-4xl">Blog</h1>
            <div className="flex flex-row justify-between">
              <div className="flex flex-row space-x-6">
                {categories.map((topic) => (
                  <div>{topic}</div>
                ))}
              </div>
              <div className="flex flex-row space-x-6">
                <Dropdown
                  dropdownItems={selectableTopics}
                  selectedValues={selectedTopics}
                  onValueChange={handleTopicChange}
                  selectMultiple={true}
                />
                <CreatePost />
              </div>
            </div>
            <div className="grid grid-cols-4 space-y-4 space-x-4">
              {posts.map((post) => (
                <PostPreview post={post} />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Blog;