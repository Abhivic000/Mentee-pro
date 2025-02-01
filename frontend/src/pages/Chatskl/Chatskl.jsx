import { useState, useEffect, useRef } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import mediro from "../../assets/medi-robot.png";

const Chatskl = () => {
	const [messages, setMessages] = useState([]);
	const [input, setInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const messagesEndRef = useRef(null);

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const date = new Date();
		const str_time = `${date.getHours()}:${date.getMinutes()}`;

		const userMessage = { text: input, sender: "user", time: str_time };
		setMessages((prev) => [...prev, userMessage]);
		setInput("");
		setIsLoading(true);
		setError(null);

		// Add temporary loading message for bot
		const loadingMessage = {
			text: "",
			sender: "bot",
			time: str_time,
			loading: true,
		};
		setMessages((prev) => [...prev, loadingMessage]);

		try {
			const response = await fetch("http://localhost:3000/api/chat", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ message: input }),
			});
			const data = await response.json();

			const botResponseTime = new Date();
			const botResponseStrTime = `${botResponseTime.getHours()}:${botResponseTime.getMinutes()}`;
			const botMessage = {
				text: data.answer,
				sender: "bot",
				time: botResponseStrTime,
			};

			// Replace the loading message with the actual bot response
			setMessages((prev) => [...prev.slice(0, -1), botMessage]);
		} catch (error) {
			console.error("Error fetching response:", error);
			setError(input);
			setMessages((prev) => [
				...prev.slice(0, -1),
				{
					text: "Something went wrong. Please try again.",
					sender: "bot",
					time: str_time,
					error: true,
				},
			]);
		} finally {
			setIsLoading(false);
		}
	};

	const handleRetry = async (message) => {
		setInput(message);
		handleSubmit(new Event("submit"));
	};

	return (
		<div className="flex justify-center items-center h-screen w-screen bg-gray-100 p-4">
			<div className="w-full h-full max-w-none bg-white rounded-lg shadow-lg">
				{/* Header */}
				<div className="bg-[#52cc99] text-white px-4 py-3 rounded-t-lg flex items-center">
					<div className="relative mr-3">
						<img src={mediro} alt="Bot" className="w-12 h-12 rounded-full" />
						<span className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
					</div>
					<div>
						<h2 className="text-lg font-semibold">Ana</h2>
						<p className="text-sm">Ask me anything!</p>
					</div>
				</div>

				{/* Chat Messages */}
				<div className="h-full max-h-[calc(100vh-200px)] overflow-y-auto p-4 space-y-4">
					{messages.map((msg, index) => (
						<div
							key={index}
							className={`flex ${
								msg.sender === "user" ? "justify-end" : "justify-start"
							}`}>
							{msg.sender === "bot" && (
								<img
									src={mediro}
									alt="Bot"
									className="w-8 h-8 rounded-full mr-2"
								/>
							)}
							<div
								className={`relative p-3 max-w-[50%] rounded-lg shadow-md ${
									msg.sender === "user"
										? "bg-[#52cc99] text-white rounded-br-none"
										: "bg-gray-200 text-gray-800 rounded-bl-none"
								}`}>
								{msg.loading ? (
									<div className="loader border-t-4 border-b-4 border-green-500 rounded-full w-6 h-6 animate-spin"></div>
								) : (
									<>
										<p>{msg.text}</p>
										<span className="block text-xs mt-1 text-gray-600">
											{msg.time}
										</span>
										{msg.error && (
											<button
												onClick={() => handleRetry(error)}
												className="text-blue-500 text-xs mt-1">
												Retry
											</button>
										)}
									</>
								)}
								<div
									className={`absolute bottom-0 ${
										msg.sender === "user" ? "right-0" : "left-0"
									} w-0 h-0 border-t-[10px] border-t-transparent border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent ${
										msg.sender === "user"
											? "border-b-[#52cc99]"
											: "border-b-gray-200"
									}`}></div>
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
					className="flex items-center border-t border-gray-200 p-3">
					<input
						type="text"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						placeholder="Type your message..."
						className="flex-1 px-4 py-2 rounded-l-lg border focus:outline-none focus:ring-2 focus:ring-green-400"
						disabled={isLoading}
					/>
					<button
						type="submit"
						className="bg-[#52cc99] text-white px-4 py-2 rounded-r-lg hover:bg-[#326c54] transition"
						disabled={isLoading}>
						<i className="fas fa-paper-plane"></i>
					</button>
				</form>
			</div>
		</div>
	);
};

export default Chatskl;
