// server.js
import express from "express";
import { spawn } from "child_process";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post("/api/chat", (req, res) => {
	const input = req.body.message;
	console.log(input);

	// Spawn a new child process to run the Python script
	const pythonProcess = spawn("python", ["src/ai/app.py", input]);

	// Collect the output from the Python script
	let output = "";
	pythonProcess.stdout.on("data", (data) => {
		output += data.toString();
	});

	// Collect any errors
	pythonProcess.stderr.on("data", (data) => {
		console.error(`Python error: ${data.toString()}`);
	});

	// Handle the Python process completion
	pythonProcess.on("close", (code) => {
		if (code === 0) {
			console.log(output);
			return res.send(output);
		} else {
			console.log(`Python script exited with code ${code}`);
			res.status(500).json({ error: `Python script exited with code ${code}` });
		}
	});
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
