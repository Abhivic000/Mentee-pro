import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css"; 
import mediro from "../../assets/medi-robot.png";

const Chatskl = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const date = new Date();
    const str_time = `${date.getHours()}:${date.getMinutes()}`;

    const userMessage = { text: input, sender: "user", time: str_time };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await axios.post("/get", { msg: input });
      const botMessage = {
        text: response.data,
        sender: "bot",
        time: str_time,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching bot response:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg">
        {/* Header */}
        <div className="bg-[#52cc99] text-white px-4 py-3 rounded-t-lg flex items-center">
          <div className="relative mr-3">
            <img
              src={mediro}
              alt="Bot"
              className="w-12 h-12 rounded-full"
            />
            <span className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Ana</h2>
            <p className="text-sm">Ask me anything!</p>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender === "bot" && (
                <img
                  src="/static/medical-robot.png"
                  alt="Bot"
                  className="w-8 h-8 rounded-full mr-2"
                />
              )}
              <div
                className={`p-3 max-w-xs rounded-lg shadow-md ${
                  msg.sender === "user"
                    ? "bg-[#52cc99] text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                <p>{msg.text}</p>
                <span className="block text-xs mt-1 text-gray-600">
                  {msg.time}
                </span>
              </div>
              {msg.sender === "user" && (
                <img
                  src="https://i.ibb.co/d5b84Xw/Untitled-design.png"
                  alt="User"
                  className="w-8 h-8 rounded-full ml-2"
                />
              )}
            </div>
          ))}
          <div ref={messagesEndRef}></div>
        </div>

        {/* Input Field */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center border-t border-gray-200 p-3"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 rounded-l-lg border focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            type="submit"
            className="bg-[#52cc99] text-white px-4 py-2 rounded-r-lg hover:bg-[#326c54] transition"
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatskl;
