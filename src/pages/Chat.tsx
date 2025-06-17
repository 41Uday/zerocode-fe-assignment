// import React, { useEffect, useRef, useState } from 'react';
// import { useAuth } from '../hooks/useAuth';
// import { useNavigate } from 'react-router-dom';
// import { Sun, Moon, Mic, LogOut, Download } from 'lucide-react';
// import { queryHuggingFace } from '../api/huggingface';

// const Chat = () => {
//   const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([]);
//   const [input, setInput] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [darkMode, setDarkMode] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const { logout, getUser } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!getUser()) navigate('/login');
//   }, []);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   const handleSend = async () => {
//   if (!input.trim()) return;
//   const userMessage = input;
//   setMessages((prev) => [...prev, { role: 'user', text: userMessage }]);
//   setInput('');
//   setLoading(true);

//   try {
//     const botResponse = await queryHuggingFace(userMessage);
//     setMessages((prev) => [...prev, { role: 'bot', text: botResponse }]);
//   } catch (error) {
//     setMessages((prev) => [...prev, { role: 'bot', text: '❌ Failed to get a response from Hugging Face.' }]);
//   }

//   setLoading(false);
// };

//   const handleVoiceInput = () => {
//     const SpeechRecognition =
//       (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
//     if (!SpeechRecognition) {
//       alert('Speech recognition not supported');
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.lang = 'en-US';
//     recognition.start();

//     recognition.onresult = (event: any) => {
//       const transcript = event.results[0][0].transcript;
//       setInput(transcript);
//     };
//   };

//   const handleExport = () => {
//     const text = messages.map((m) => `${m.role === 'user' ? '👤' : '🤖'}: ${m.text}`).join('\n');
//     const blob = new Blob([text], { type: 'text/plain' });
//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(blob);
//     link.download = 'chat_export.txt';
//     link.click();
//   };

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <div className={darkMode ? 'dark' : ''}>
//       <div className="flex flex-col min-h-screen bg-white dark:bg-[#1e1e1e] text-black dark:text-white">
//         {/* Header */}
//         <header className="fixed top-0 left-0 right-0 z-10 p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1e1e1e] shadow">
//           <h1 className="font-bold text-lg">ChatBot</h1>
//           <div className="flex items-center gap-3">
//             <button
//   onClick={() => setDarkMode(!darkMode)}
//   className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 shadow"
//   title="Toggle Theme"
// >
//   {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
//             </button>

//             <button
//               onClick={handleExport}
//               className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 shadow"
//               title="Export"
//             >
//               <Download className="w-5 h-5" />
//             </button>

//             <button
//               onClick={handleLogout}
//               className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 shadow"
//               title="Logout"
//             >
//               <LogOut className="w-5 h-5" />
//             </button>

//           </div>
//         </header>

//         {/* Main Chat Area */}
//         <main className="flex-1 overflow-y-auto px-4 py-6 pt-20">
//           <div className="max-w-2xl mx-auto">
//             {messages.map((msg, i) => (
//               <div
//                 key={i}
//                 className={`flex mb-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
//               >
//                 <div
//                   className={`max-w-[75%] px-4 py-2 rounded-xl text-sm whitespace-pre-wrap shadow-sm
//                     ${msg.role === 'user'
//                       ? 'bg-blue-600 text-white rounded-br-none'
//                       : 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded-bl-none'}`}
//                 >
//                   {msg.text}
//                 </div>
//               </div>
//             ))}
//             {loading && (
//               <div className="text-center text-sm text-gray-500 dark:text-gray-400">
//                 🤖 Bot is thinking...
//               </div>
//             )}
//             <div ref={messagesEndRef} />
//           </div>
//         </main>

//         {/* Input Footer */}
//         <footer className="p-4 border-t border-gray-200 dark:border-gray-700">
//           <div className="max-w-2xl mx-auto flex gap-2">
//             <input
//               className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-[#2c2c2c] text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => e.key === 'Enter' && handleSend()}
//               placeholder="Send a message..."
//             />
//             <button
//               onClick={handleSend}
//               className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition"
//             >
//               Send
//             </button>
//             <button
//               onClick={handleVoiceInput}
//               className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-xl flex items-center transition"
//               title="Voice input"
//             >
//               <Mic className="w-4 h-4" />
//             </button>
//           </div>
//         </footer>
//       </div>
//     </div>
//   );
// };

// export default Chat;

import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Sun, Moon, Mic, LogOut, Download,Send } from 'lucide-react';
import { queryHuggingFace } from '../api/huggingface';

const Chat = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [inputHistory, setInputHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { logout, getUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!getUser()) navigate('/login');
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = input;
    setMessages((prev) => [...prev, { role: 'user', text: userMessage }]);
    setInputHistory((prev) => [...prev, userMessage]);
    setHistoryIndex(null); // reset history index
    setInput('');
    setLoading(true);

    try {
      const botResponse = await queryHuggingFace(userMessage);
      setMessages((prev) => [...prev, { role: 'bot', text: botResponse }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'bot', text: '❌ Failed to get a response from Hugging Face.' }]);
    }

    setLoading(false);
  };

  const handleVoiceInput = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition not supported');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.start();

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };
  };

  const handleExport = () => {
    const text = messages.map((m) => `${m.role === 'user' ? '👤' : '🤖'}: ${m.text}`).join('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'chat_export.txt';
    link.click();
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (inputHistory.length > 0) {
        const newIndex = historyIndex === null ? inputHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(inputHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== null) {
        const newIndex = Math.min(inputHistory.length - 1, historyIndex + 1);
        setHistoryIndex(newIndex);
        setInput(inputHistory[newIndex] || '');
      }
    } else if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="flex flex-col min-h-screen bg-white dark:bg-[#1e1e1e] text-black dark:text-white">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-10 p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1e1e1e] shadow">
          <h1 className="font-bold text-lg">ChatBot</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 shadow"
              title="Toggle Theme"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              onClick={handleExport}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 shadow"
              title="Export"
            >
              <Download className="w-5 h-5" />
            </button>

            <button
              onClick={handleLogout}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 shadow"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Main Chat Area */}
        <main className="flex-1 overflow-y-auto px-4 py-6 pt-20">
          <div className="max-w-2xl mx-auto">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex mb-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[75%] px-4 py-2 rounded-xl text-sm whitespace-pre-wrap shadow-sm
                    ${msg.role === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded-bl-none'}`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                🤖 Bot is thinking...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </main>

        {/* Input Footer */}
        <footer className="p-4 border-t border-gray-200 dark:border-gray-700 w-full">
          <div className="mx-auto flex w-full max-w-2xl items-center gap-2 sm:flex-nowrap flex-wrap">
            <input
              className="flex-1 min-w-0 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-[#2c2c2c] text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Send a message..."
            />

            <button
              onClick={handleSend}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition flex items-center justify-center"
              title="Send"
              disabled={loading}
            >
              <span className="hidden sm:inline">Send</span>
              <Send className="w-5 h-5 sm:hidden" />
            </button>

            <button
              onClick={handleVoiceInput}
              className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-xl flex items-center justify-center transition"
              title="Voice input"
            >
              <Mic className="w-4 h-4" />
            </button>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default Chat;
