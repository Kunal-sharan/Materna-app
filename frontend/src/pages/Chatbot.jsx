import { useState, useRef, useEffect } from 'react';
import { X, Send, MoreHorizontal, Globe, Calendar, Smile, Info } from 'lucide-react';
import { getAuth } from "firebase/auth";
import botIcon from "@/assets/botIcon.png";

const FloatingChatbot = () => {
  const [isFullPage, setIsFullPage] = useState(false);
  const [showHistory, setShowHistory] = useState(true);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Let me know if you need any symptom advice, appointment questions, emotional support, or information look-up, etc.',
      timestamp: new Date()
    }
  ]);
  const [chatHistory] = useState([
    { id: 1, title: 'summary of chat topic...', date: 'date/time' },
    { id: 2, title: 'summary of chat topic...', date: 'date/time' },
    { id: 3, title: 'summary of chat topic...', date: 'date/time' },
    { id: 4, title: 'summary of chat topic...', date: 'date/time' },
    { id: 5, title: 'summary of chat topic...', date: 'date/time' }
  ]);
  
  const [userName, setUserName] = useState("Mama");
  const [userPhoto, setUserPhoto] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user && user.displayName) {
      const firstName = user.displayName.split(" ")[0];
      setUserName(firstName);
    }
    if (user && user.photoURL) {
      setUserPhoto(user.photoURL);
    }
  }, []);

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'user',
        text: message,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newMessage]);
      console.log("Current Messages:", newMessage);
      setMessage('');
      
      // Refocus the textarea after sending
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
        }
      }, 0);
      
      // Simulate bot response
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            id: prev.length + 1,
            sender: 'bot',
            text: 'Thank you for your message. How can I assist you further?',
            timestamp: new Date()
          }
        ]);
      }, 1000);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputChange = (e) => {
    const cursorPosition = e.target.selectionStart;
    setMessage(e.target.value);
    
    // Restore cursor position after state update
    requestAnimationFrame(() => {
      if (textareaRef.current) {
        textareaRef.current.setSelectionRange(cursorPosition, cursorPosition);
      }
    });
  };

  const selectChat = (chatId) => {
    setShowHistory(false);
    // In a real app, you would load the selected chat's messages
    setMessages([
      {
        id: 1,
        sender: 'bot',
        text: 'Continuing previous conversation...',
        timestamp: new Date()
      }
    ]);
  };

  const startNewChat = () => {
    setShowHistory(false);
    setMessages([
      {
        id: 1,
        sender: 'bot',
        text: 'Let me know if you need any symptom advice, appointment questions, emotional support, or information look-up, etc.',
        timestamp: new Date()
      }
    ]);
  };

  const handleInfoClick = () => {
    console.log('Info button clicked');
  };

  const handleEmojiClick = () => {
    console.log('Emoji button clicked');
  };

  const handleMenuClick = () => {
    console.log('Menu button clicked');
  };

  const handleSearchClick = () => {
    console.log('Search button clicked');
  };

  // Floating Button Component
  const FloatingButton = () => (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={() => setIsFullPage(true)}
      >
        <img 
          src={botIcon} type="png"
          alt="Chat Bot" 
        className="w-25 h-25 object-contain transition-transform duration-200 hover:scale-90"
        />
      </button>
    </div>
  );

  // Redesigned Full Page Chat Component moved inside FloatingChatbot
  const FullPageChat = () => (
    <div className="fixed inset-0 bg-gray-50 z-50 flex flex-row">
      {/* Sidebar */}
      {isSidebarOpen && (
      <aside className="flex flex-col justify-between w-64 bg-white border-r border-gray-200 h-full py-8 px-6 shadow-lg">
        <div className="flex justify-end">
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-[#234451] p-2 rounded-md hover:bg-[#f9f5f7] transition"
            aria-label="Hide Sidebar"
          >
            <X size={20} />
          </button>
        </div>
        <div>
          {/* New Chat Button */}
          <div className="mb-6">
            <button
              onClick={startNewChat}
              className="w-full bg-gradient-to-r from-[#fabdb5] to-[#bcb2da] text-white font-semibold px-4 py-2 rounded-xl shadow-lg hover:from-[#f9b9b0] hover:to-[#a994c2] transition-colors"
            >
              + New Chat
            </button>
          </div>
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#f9f5f7] border border-[#d8d3e3] focus:outline-none focus:ring-2 focus:ring-[#234451] text-[#6a6a6a]"
              />
              <span className="absolute left-3 top-2.5 text-[#a8a8a8]">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              </span>
            </div>
          </div>
          {/* Nav Sections */}
          <nav className="flex flex-col gap-2">
            {chatHistory.map(chat => (
              <button
                key={chat.id}
                onClick={() => selectChat(chat.id)}
                className="flex flex-col items-start px-3 py-2 rounded-lg text-[#4a4a4a] hover:bg-[#f5f0f9] text-left"
              >
                <span className="font-medium">{chat.title}</span>
                <span className="text-xs text-[#b0a8c3]">{chat.date}</span>
              </button>
            ))}
          </nav>
        </div>
        {/* User Profile */}
        <div className="flex items-center gap-3 mt-10">
          <img
            src={userPhoto || "https://ui-avatars.com/api/?name=Mama&background=FABDB5&color=234451"}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover border-2 border-[#234451]"
          />
          <div>
            <div className="font-semibold text-[#234451]">{userName}</div>
            <div className="text-xs text-[#a8a8a8]">Active</div>
          </div>
        </div>
      </aside>
      )}

      {!isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="absolute top-6 left-6 z-10 text-[#234451] p-2 rounded-md hover:bg-[#f9f5f7] transition"
          aria-label="Show Sidebar"
        >
          <MoreHorizontal size={20} />
        </button>
      )}

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col h-full relative">
        {/* Header */}
        <div className="flex items-center justify-between px-10 pt-10 pb-3">
        </div>
        {/* Floating Glowing Icon */}
        <div className="flex flex-col items-center mt-8 mb-4 relative">
          <div className="relative mb-4">
            <span className="absolute inset-0 rounded-full blur-2xl opacity-60 bg-gradient-to-br from-[#fabdb5] via-[#a48bc3] to-[#bcb2da] w-20 h-20 animate-pulse"></span>
            <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-lg z-10">
              <img src={botIcon} alt="AI" className="w-12 h-12 object-contain" />
            </div>
          </div>
          {/* Greeting */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[#234451] mb-2">Hi <span className="text-[#234451]">{userName}!</span></h1>
            <p className="text-lg text-[#6a6a6a]">
              How Can I{' '}
              <span
                className="bg-gradient-to-r from-[#fabdb5] to-[#bcb2da] bg-clip-text text-transparent font-semibold cursor-pointer hover:underline"
                tabIndex={0}
              >
                Help?
              </span>
            </p>
          </div>
        </div>
        {/* Chat Messages */}
        <div className="flex-1 w-full max-w-2xl mx-auto px-4 overflow-y-auto mb-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`my-2 p-3 rounded-lg max-w-[75%] ${
                msg.sender === 'user'
                  ? 'ml-auto bg-[#fabdb5] text-[#234451]'
                  : 'mr-auto bg-[#f9f5f7] text-[#234451]'
              }`}
            >
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        {/* Chat Input Box */}
        <div className="flex flex-col items-center pb-16">
          <div className="w-full max-w-xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg border border-[#d8d3e3] px-5 py-4 flex flex-col gap-3">
              <div className="relative flex items-center">
                <input
                  ref={textareaRef}
                  type="text"
                  value={message}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Type in your question..."
                  className="w-full pl-4 pr-4 py-3 rounded-xl bg-[#f9f5f7] border border-[#d8d3e3] focus:outline-none focus:ring-2 focus:ring-[#234451] text-base placeholder:text-left"
                  autoFocus
                />
                <button
                  onClick={handleSendMessage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#fabdb5] to-[#bcb2da] text-[#234451] rounded-full p-2 shadow-md hover:scale-105 transition-transform"
                  aria-label="Send"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Close Button */}
      <button
        onClick={() => setIsFullPage(false)}
        className="absolute top-6 right-8 bg-[#f9f5f7] hover:bg-[#f0e9f8] rounded-full p-2 shadow-md"
        aria-label="Close"
      >
        <X size={22} className="text-[#234451]" />
      </button>
    </div>
  );

  // History Icon SVG
  function HistoryIcon() {
    return (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-[#a8a8a8]">
        <path d="M3 3v5h5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3.05 13a9 9 0 102.13-9.36" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 7v5l3 3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }

  useEffect(() => {
    if (isFullPage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isFullPage]);

  return (
    <>
      {!isFullPage && <FloatingButton />}
      {isFullPage && <FullPageChat />}
    </>
  );
};

export default FloatingChatbot;