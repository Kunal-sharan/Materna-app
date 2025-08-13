import bgVideo from "@/assets/sky1.mp4";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StarStill } from "@/components/StarStill.jsx";
import { Dropdown } from "@/components/forum/Dropdown.jsx";
import { Post } from "@/components/forum/Post.jsx";
import { PostDetail } from "@/components/forum/PostDetail.jsx";
import { CreatePost } from "@/components/forum/buttons/CreatePost";
import { ViewBlog } from "@/components/forum/buttons/ViewBlog";
import { TOPIC_COLOR_MAP } from "@/components/forum/constants/topics";
import { SearchBar } from "@/components/forum/SearchBar";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Profile } from "@/components/forum/Profile";

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
const sortingOptions = ["Hot", "Recent", "Featured"];

const Community = () => {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedSort, setSelectedSort] = useState(["Hot"]);

  const [posts, setPosts] = useState(examplePosts);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const handleTopicChange = (newTopics) => {
    setSelectedTopics(newTopics);
  };

  const handleSortingChange = (newSortOptions) => {
    setSelectedSort(newSortOptions);
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
    setIsModalOpen(false);
  };

  // Posts filters
  const filteredPosts = posts.filter((post) => {
    const matchesTopic =
      selectedTopics.length === 0 ||
      post.topics.some((topic) => selectedTopics.includes(topic));
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    // ! Each sorting option needs different functionality for retrieving
    // ! For ex: Hot may be the most comments + likes in the most recent time
    // ! While recent only shows the posts with the smallest time distances
    //     selectedSort.length === 0 || selectedSort.includes(post.timePosted),
    return matchesTopic && matchesSearch;
  });

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen overflow-hidden p-8 pt-32">
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
        <div className="fixed top-0 left-0 -z-10 h-screen w-full bg-white/40 backdrop-blur-xs"></div>
        <div className="relative z-10">
          <div className="flex flex-col">
            <div className="flex flex-row justify-between">
              <Label className="ml-4 text-4xl">Community</Label>
              <div className="my-3 flex w-5xl justify-end">
                <SearchBar query={searchQuery} setQuery={setSearchQuery} />
              </div>
            </div>

            <div className="flex flex-row gap-x-4">
              <div className="flex flex-col justify-between">
                <div className="flex flex-col items-center gap-y-4 rounded-[25px] border border-white/50 bg-[#DFA69F]/25 p-8 backdrop-blur-xs">
                  <Dropdown
                    dropdownItems={selectableTopics}
                    selectedValues={selectedTopics}
                    onValueChange={handleTopicChange}
                    selectMultiple={true}
                  />
                  <Dropdown
                    dropdownItems={sortingOptions}
                    selectedValues={selectedSort}
                    onValueChange={handleSortingChange}
                    selectMultiple={false}
                  />
                  {/* Change the above dropdown to the appropriate sorting settings. */}

                  <CreatePost />
                  <ViewBlog />
                </div>
                <div className="rounded-[25px] border border-white/50 bg-[#DFA69F]/25 p-4 pt-12 backdrop-blur-xs">
                  {/* ! Put in the user's profile information here */}
                  <Profile name={"Main User"} />
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-y-4">
                {filteredPosts.map((post) => (
                  <Post
                    key={post.id}
                    post={post}
                    onPostClick={() => handlePostClick(post)}
                  />
                ))}

                <PostDetail post={selectedPost} onClose={handleCloseModal} />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Community;
