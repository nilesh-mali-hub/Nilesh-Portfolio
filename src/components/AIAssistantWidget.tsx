import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Bot, Sparkles, User } from 'lucide-react';
import Markdown from 'react-markdown';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export function AIAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "👋 Hi! I'm Nilesh's AI Creative Assistant.\n\nI can help you explore projects, recommend services, estimate budgets, and answer questions about Nilesh's work."
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const newMessages = [...messages, { role: 'user' as const, content: inputValue.trim() }];
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response');
      }

      const data = await response.json();
      setMessages([...newMessages, { role: 'assistant', content: data.text }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages([
        ...newMessages, 
        { role: 'assistant', content: 'Sorry, I encountered an error. Please try again later.' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50"
      >
        <button
          onClick={() => setIsOpen(true)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`relative flex items-center justify-center w-14 h-14 rounded-full bg-neutral-900/70 backdrop-blur-xl border border-neutral-800/80 shadow-2xl transition-all duration-300 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100 hover:border-[#D1FF52]/50 hover:bg-neutral-800'}`}
        >
          <Bot className={`w-6 h-6 transition-colors duration-300 ${isHovered ? 'text-[#D1FF52]' : 'text-neutral-400'}`} />
          
          <AnimatePresence>
            {isHovered && !isOpen && (
              <motion.div
                initial={{ opacity: 0, x: 10, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 10, scale: 0.9 }}
                className="absolute right-full mr-4 whitespace-nowrap bg-neutral-900 border border-neutral-800 text-white text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-widest hidden md:block shadow-xl"
              >
                AI Assistant
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95, transition: { duration: 0.2 } }}
            className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 w-[calc(100vw-3rem)] sm:w-[380px] bg-neutral-950 border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
          >
            {/* Header */}
            <div className="bg-neutral-900 border-b border-neutral-800 p-4 flex justify-between items-center relative overflow-hidden flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-r from-[#D1FF52]/10 to-transparent pointer-events-none"></div>
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 rounded-full bg-neutral-950 border border-neutral-800 flex items-center justify-center text-[#D1FF52]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-white leading-tight uppercase tracking-tighter">AI Creative<br/>Assistant</h3>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors relative z-10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 p-5 overflow-y-auto max-h-[400px] min-h-[300px] bg-neutral-950 flex flex-col gap-4">
              {messages.map((message, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className={`flex gap-3 max-w-[95%] ${message.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                >
                  <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center mt-1 ${message.role === 'user' ? 'bg-neutral-800 text-white' : 'bg-[#D1FF52] text-black'}`}>
                    {message.role === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                  </div>
                  <div className={`flex flex-col gap-1 ${message.role === 'user' ? 'items-end' : ''}`}>
                    <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest px-1">
                      {message.role === 'user' ? 'You' : 'Nilesh AI'}
                    </span>
                    <div className={`border rounded-2xl p-4 text-sm leading-relaxed shadow-sm markdown-body ${
                      message.role === 'user' 
                        ? 'bg-neutral-800 border-neutral-700 rounded-tr-sm text-white' 
                        : 'bg-neutral-900 border-neutral-800 rounded-tl-sm text-neutral-300'
                    }`}>
                      <Markdown>{message.content}</Markdown>
                    </div>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3 max-w-[95%]"
                >
                  <div className="w-6 h-6 rounded-full bg-[#D1FF52] flex-shrink-0 flex items-center justify-center text-black mt-1">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest pl-1">Nilesh AI</span>
                    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl rounded-tl-sm p-4 text-sm text-neutral-300 shadow-sm flex gap-1">
                      <span className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce"></span>
                      <span className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                      <span className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-neutral-900 border-t border-neutral-800 flex-shrink-0">
              <div className="relative flex items-center">
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything..." 
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-full py-3 pl-4 pr-12 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#D1FF52]/50 transition-colors"
                />
                <button 
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isLoading}
                  className={`absolute right-2 w-8 h-8 flex items-center justify-center rounded-full transition-transform ${!inputValue.trim() || isLoading ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed' : 'bg-[#D1FF52] text-black hover:scale-105'}`}
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </div>
              <div className="text-center mt-3">
                <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-600">Powered by Gemini</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
