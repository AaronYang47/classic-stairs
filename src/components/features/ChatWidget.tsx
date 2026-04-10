import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Minimize2 } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const quickReplies = [
  { text: "What materials?", response: "We work with solid oak, mahogany, black walnut, steel, brass, tempered glass, and polished concrete. Each sourced from certified suppliers." },
  { text: "Installation time?", response: "Standard installations take 2-4 weeks. Custom curved or spiral staircases may require 6-8 weeks." },
  { text: "Warranties?", response: "All staircases include a lifetime structural warranty plus 5-year warranties on finishes." },
  { text: "Visit showroom?", response: "Visit us at 123 Architectural Way, New York, NY 10001. Mon-Fri: 9AM-6PM, Sat: 10AM-4PM." },
  { text: "Get a quote", response: "Use our online quote calculator in the Quote section, or I can connect you with our sales team." },
];

export function ChatWidget() {
  const messageIdRef = useRef(1);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Welcome to Luxe Stairs! How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const last = messages[messages.length - 1];
  const unreadCount =
    !isOpen && messages.length > 1 && last && !last.isUser ? 1 : 0;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    messageIdRef.current += 1;
    const userMessage: Message = {
      id: messageIdRef.current,
      text: text.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    const quickReply = quickReplies.find(qr => qr.text === text);
    const response = quickReply?.response || "Thank you for your question! Our team will get back to you shortly. Feel free to explore our gallery or use our quote calculator.";
    const replyDelay = 800 + (text.trim().length % 5) * 160;

    window.setTimeout(() => {
      setIsTyping(false);
      messageIdRef.current += 1;
      const botMessage: Message = {
        id: messageIdRef.current,
        text: response,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, replyDelay);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(inputValue);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 30, scale: 0.9, filter: 'blur(10px)' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-4 md:right-6 w-[calc(100vw-32px)] md:w-[380px] h-[70vh] md:h-[520px] glass-card !rounded-[var(--radius-xl)] flex flex-col overflow-hidden z-50 max-w-sm shadow-xl"
          >
            <motion.div
              className="flex items-center justify-between p-4 border-b border-glass-border"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <motion.div
                className="flex items-center gap-3"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.15 }}
              >
                <motion.div
                  className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <MessageCircle className="text-accent" size={20} />
                </motion.div>
                <div>
                  <div className="font-display font-semibold text-ink">Luxe Stairs</div>
                  <motion.div
                    className="text-secondary text-xs flex items-center gap-1"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                    Online now
                  </motion.div>
                </div>
              </motion.div>
              <motion.button
                onClick={() => setIsOpen(false)}
                className="text-secondary hover:text-ink transition-colors p-2"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <Minimize2 size={20} />
              </motion.button>
            </motion.div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <AnimatePresence mode="sync">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <motion.div
                      className={`max-w-[85%] px-4 py-3 rounded-[var(--radius-lg)] ${
                        message.isUser
                          ? 'bg-accent text-white rounded-tr-[6px]'
                          : 'bg-zinc-900 text-ink border border-white/10 rounded-tl-[6px]'
                      }`}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <motion.p
                        className={`text-[10px] mt-1 ${
                          message.isUser ? 'text-white/70' : 'text-secondary'
                        }`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </motion.p>
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-start"
                >
                  <motion.div
                    className="bg-zinc-900 border border-white/10 px-4 py-3 rounded-[var(--radius-lg)] rounded-tl-[6px]"
                    animate={{ scale: [0.95, 1, 0.95] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="w-2 h-2 bg-stone-400 rounded-full"
                          animate={{ y: [0, -6, 0] }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: i * 0.1,
                            ease: "easeInOut"
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <motion.div
              className="px-4 pt-3 pb-2 border-t border-glass-border"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-secondary text-[10px] uppercase tracking-wider mb-2">Quick topics</p>
              <div className="flex flex-wrap gap-2 max-h-[4.5rem] overflow-y-auto">
                {quickReplies.map((reply) => (
                  <motion.button
                    key={reply.text}
                    type="button"
                    onClick={() => handleSend(reply.text)}
                    className="px-3 py-2 text-xs bg-zinc-900 border border-white/10 rounded-full text-secondary hover:text-zinc-100 hover:border-accent/40 hover:bg-zinc-800/90 transition-colors whitespace-nowrap"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {reply.text}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="p-4 pt-2 border-t border-glass-border"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex gap-2">
                <motion.input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a message..."
                  className="flex-1 !py-3 !px-4 !rounded-full !text-sm"
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.button
                  onClick={() => handleSend(inputValue)}
                  disabled={!inputValue.trim()}
                  className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#735a11] transition-colors flex-shrink-0"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Send size={18} />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.5 }}
        onClick={() => setIsOpen((open) => !open)}
        className="fixed bottom-4 md:bottom-6 right-4 md:right-6 w-14 h-14 md:w-16 md:h-16 rounded-full bg-accent flex items-center justify-center shadow-lg z-50"
        whileHover={{ scale: 1.1, boxShadow: '0 20px 40px rgba(201, 169, 98, 0.4)' }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? (
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 180 }}
            transition={{ duration: 0.3 }}
          >
            <X className="text-white" size={22} />
          </motion.div>
        ) : (
          <>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <MessageCircle className="text-white" size={22} />
            </motion.div>
            {unreadCount > 0 && (
              <motion.span
                className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold"
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {unreadCount}
              </motion.span>
            )}
          </>
        )}
      </motion.button>
    </>
  );
}