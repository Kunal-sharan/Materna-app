import { useState, useRef, useEffect } from 'react';
import { X, Send, MoreHorizontal, Globe, Calendar, Smile, Info } from 'lucide-react';
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
      setMessages([...messages, newMessage]);
      setMessage('');
      
      // Refocus the textarea after sending
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
        }
      }, 0);
      
      // Simulate bot response
      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          sender: 'bot',
          text: 'Thank you for your message. How can I assist you further?',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botResponse]);
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

  // Full Page Chat Component
  const FullPageChat = () => (
    <div className="fixed inset-0 bg-gradient-to-br from-pink-100 to-blue-100 z-50 flex">
      {/* Chat History Sidebar */}
      {showHistory && (
        <div className="w-80 bg-gradient-to-br from-green-100 to-blue-100 flex flex-col border-r border-gray-200">
          {/* History Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">Chat History</h2>
            <button
              onClick={() => setShowHistory(false)}
              className="p-2 hover:bg-white/50 rounded-lg transition-colors"
            >
              <svg 
                className="w-6 h-6 text-gray-600 transition-transform duration-200"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
          
          {/* History Content */}
          <div className="flex-1 p-4 overflow-y-auto">
            <p className="text-gray-600 text-sm mb-6">
              Select a chat to continue conversation where you left off
            </p>
            
            <div className="space-y-3 mb-6">
              {chatHistory.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => selectChat(chat.id)}
                  className="w-full p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-left hover:bg-gray-50"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-gray-800 text-sm">{chat.title}</span>
                    <span className="text-gray-400 text-xs">{chat.date}</span>
                  </div>
                </button>
              ))}
            </div>
            
            <button
              onClick={startNewChat}
              className="w-full p-3 bg-teal-100 hover:bg-teal-200 rounded-lg transition-colors text-left text-gray-700"
            >
              OR Begin a new chat... →
            </button>
          </div>
        </div>
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <div className="flex items-center justify-between p-4 bg-white/30 backdrop-blur-sm border-b border-white/50">
          {!showHistory && (
            <button
              onClick={() => setShowHistory(true)}
              className="p-2 hover:bg-white/50 rounded-lg transition-colors"
            >
              <svg 
                className="w-6 h-6 text-gray-600 transition-transform duration-200"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
          
          {showHistory && <div></div>}
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">english</span>
              <Globe className="w-4 h-4 text-gray-600" />
            </div>
            
            <button
              onClick={() => setIsFullPage(false)}
              className="p-2 hover:bg-white/50 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Area - Contains both header and messages */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-8">
            {/* Chat Header - Only show if no user messages */}
            {!messages.some(msg => msg.sender === 'user') && (
              <div className="text-center py-8">
                <div className="w-45 h-45 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <img 
                        src={botIcon} type="png"
                        alt="Chat Bot" 
                        className="w-45 h-45"
                    />
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Hey, User!</h1>
                <p className="text-gray-600">How can I help you?</p>
              </div>
            )}

            {/* Messages Area */}
            <div className="max-w-4xl mx-auto space-y-6 pb-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-md px-6 py-4 rounded-2xl ${
                    msg.sender === 'user' 
                      ? 'bg-slate-600 text-white ml-auto' 
                      : 'bg-white text-gray-800 shadow-sm border'
                  }`}>
                    {msg.sender === 'bot' && (
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                          <Calendar className="w-4 h-4 text-teal-600" />
                        </div>
                        <span className="text-sm font-medium text-teal-600">Materna Bot</span>
                      </div>
                    )}
                    {msg.sender === 'user' && (
                      <div className="flex items-center justify-end gap-3 mb-2">
                        <span className="text-sm font-medium text-white/80">User</span>
                      </div>
                    )}
                    <p className="text-base leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-6 bg-white/30 backdrop-blur-sm border-t border-white/50 flex-shrink-0">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3">
              <button 
                onClick={handleInfoClick}
                className="p-3 hover:bg-white/50 rounded-full transition-colors flex-shrink-0"
              >
                <Info className="w-5 h-5 text-gray-600" />
              </button>
              
              <button 
                onClick={handleEmojiClick}
                className="p-3 hover:bg-white/50 rounded-full transition-colors flex-shrink-0"
              >
                <Smile className="w-5 h-5 text-gray-600" />
              </button>
              
              <div className="flex-1 relative">
                <textarea
                  ref={textareaRef}
                  value={message}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="I need..."
                  className="w-full p-4 pr-16 border border-gray-300 rounded-3xl resize-none focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white/80 backdrop-blur-sm text-base"
                  rows="1"
                  style={{ minHeight: '56px' }}
                  autoFocus
                />
                <button
                  onClick={handleSendMessage}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-3 bg-slate-600 text-white rounded-full hover:bg-slate-700 transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              
              <button 
                onClick={handleSearchClick}
                className="p-3 hover:bg-white/50 rounded-full transition-colors flex-shrink-0"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              
              <button 
                onClick={handleMenuClick}
                className="p-3 hover:bg-white/50 rounded-full transition-colors flex-shrink-0"
              >
                <MoreHorizontal className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {!isFullPage && <FloatingButton />}
      {isFullPage && <FullPageChat />}
    </>
  );
};

export default FloatingChatbot;