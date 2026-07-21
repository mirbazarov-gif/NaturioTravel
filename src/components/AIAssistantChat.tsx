import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, X, Send, Compass, HelpCircle, AlertCircle, RefreshCw } from "lucide-react";
import { Message, Language } from "../types";

const QUICK_SUGGESTIONS_EN = [
  "Recommend a horse-riding trek around Song-Kul Lake.",
  "What traditional felt-making workshops are in Kochkor?",
  "Tell me about traditional yurt stays on alpine jailoo pastures.",
  "Recommend a 3-day adventure trip under $500.",
];

const QUICK_SUGGESTIONS_RU = [
  "Порекомендуй конный поход вокруг озера Сон-Куль.",
  "Какие мастер-классы по изготовлению шырдаков есть в Кочкоре?",
  "Расскажи про традиционное проживание в юртах на джайлоо.",
  "Посоветуй 3-дневный активный тур дешевле $500.",
];

interface AIAssistantChatProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  language: Language;
}

export default function AIAssistantChat({ isOpen, setIsOpen, language }: AIAssistantChatProps) {
  const isRu = language === "RU";
  
  const getGreeting = () => {
    return isRu
      ? "Добро пожаловать в Nomad Travel. Я ваш ИИ помощник. Я могу составить индивидуальный маршрут, рассчитать бюджет и порекомендовать удаленные эко-маршруты. Как я могу помочь вам спланировать путешествие?"
      : "Welcome to Nomad Travel. I am your AI Assistant. I can design bespoke itineraries, estimate budgets, and recommend remote eco-tours. How may I help you coordinate your voyage today?";
  };

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial-msg",
      role: "assistant",
      content: getGreeting(),
      timestamp: new Date(),
    }
  ]);

  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Sync initial message if language changes and conversation hasn't moved
  useEffect(() => {
    if (messages.length === 1 && messages[0].id === "initial-msg") {
      setMessages([
        {
          id: "initial-msg",
          role: "assistant",
          content: getGreeting(),
          timestamp: new Date(),
        }
      ]);
    }
  }, [language]);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;
    setErrorText("");

    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: textToSend,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Build history for Gemini
      const chatHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend, history: chatHistory, language })
      });

      if (!res.ok) {
        throw new Error("Failed to contact the Travel Assistant.");
      }

      const data = await res.json();
      
      const assistantMsg: Message = {
        id: `msg-${Date.now() + 1}`,
        role: "assistant",
        content: data.text || (isRu ? "Я не смог обработать этот запрос." : "I was unable to process that."),
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (error: any) {
      console.error(error);
      setErrorText(isRu ? "Соединение с ИИ помощником прервано. Пожалуйста, попробуйте снова." : "Our connection to the AI Assistant timed out. Please retry.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const resetChat = () => {
    setMessages([
      {
        id: "initial-msg",
        role: "assistant",
        content: getGreeting(),
        timestamp: new Date(),
      }
    ]);
    setErrorText("");
  };

  const suggestions = isRu ? QUICK_SUGGESTIONS_RU : QUICK_SUGGESTIONS_EN;

  return (
    <>
      {/* Floating Sparkly Launcher Button */}
      <div className="fixed bottom-6 right-6 z-[100]">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="p-4 rounded-full bg-gradient-to-r from-deep-ocean to-turquoise text-white shadow-2xl hover:shadow-turquoise/30 hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer border border-white/20"
          id="chat-launcher-btn"
          title="Open AI Assistant"
        >
          <Sparkles className="w-5 h-5 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">
            {isRu ? "ИИ помощник" : "AI Assistant"}
          </span>
        </motion.button>
      </div>

      {/* Floating Chat Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="fixed bottom-24 right-6 w-full max-w-[400px] h-[550px] bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl overflow-hidden z-[100] flex flex-col"
            id="ai-chat-box"
          >
            {/* Header branding */}
            <div className="p-4 bg-gradient-to-r from-slate-950 to-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 bg-turquoise/25 rounded-xl border border-turquoise/25">
                  <Compass className="w-5 h-5 text-turquoise shrink-0" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-white flex items-center gap-1.5">
                    <span>{isRu ? "ИИ помощник Nomad Travel" : "Nomad Travel AI Assistant"}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  </h3>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">
                    {isRu ? "Кастомизация Маршрутов" : "Bespoke Expedition Assistant"}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-1.5">
                <button
                  onClick={resetChat}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                  title={isRu ? "Сбросить Чат" : "Reset Conversation"}
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Close Assistant"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Message Feed area */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4" ref={scrollRef}>
              {messages.map((msg) => {
                const isAssistant = msg.role === "assistant";
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isAssistant ? "items-start" : "items-end"}`}
                  >
                    <div
                      className={`max-w-[85%] px-4 py-3 rounded-2xl text-xs font-medium leading-relaxed shadow-md ${
                        isAssistant
                          ? "bg-slate-850 border border-slate-800 text-slate-200 rounded-tl-none"
                          : "bg-turquoise text-slate-950 font-bold rounded-tr-none"
                      }`}
                    >
                      <p className="whitespace-pre-line">{msg.content}</p>
                    </div>
                    <span className="text-[9px] text-slate-500 font-semibold uppercase mt-1 px-1">
                      {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex flex-col items-start">
                  <div className="bg-slate-850 border border-slate-800 p-3 rounded-2xl rounded-tl-none flex items-center gap-2">
                    <span className="w-2 h-2 bg-turquoise rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-turquoise rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 bg-turquoise rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}

              {errorText && (
                <div className="p-3 bg-red-950/40 border border-red-900/60 rounded-xl flex items-center gap-2 text-red-400 text-xs font-semibold">
                  <AlertCircle className="w-4.5 h-4.5 text-red-500 shrink-0" />
                  <span>{errorText}</span>
                </div>
              )}
            </div>

            {/* Quick Suggestions Shelf */}
            {messages.length === 1 && (
              <div className="px-4 py-2 border-t border-slate-800/50 bg-slate-950/40">
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest block mb-1.5 flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>{isRu ? "Быстрые ИИ Запросы" : "Interactive Quick Prompts"}</span>
                </span>
                <div className="flex flex-col gap-1">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="text-left text-[11px] text-slate-300 hover:text-turquoise hover:bg-slate-800/40 py-1.5 px-2 rounded-lg transition-colors border border-slate-800 border-dashed"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Chat Input form panel */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="p-3 bg-slate-950 border-t border-slate-800 flex gap-2"
            >
              <input
                type="text"
                placeholder={isRu ? "Спросите о турах, люкс-маршрутах..." : "Ask about tours, custom itineraries..."}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-turquoise placeholder-slate-500"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="p-2.5 rounded-xl bg-turquoise hover:bg-turquoise/80 disabled:bg-slate-800 disabled:text-slate-500 text-slate-950 transition-all cursor-pointer flex items-center justify-center shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
