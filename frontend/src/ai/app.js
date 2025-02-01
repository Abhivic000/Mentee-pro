import express from "express";
import { spawn } from "child_process";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post("/api/chat", (req, res) => {
	const input = req.body.message;

	const pythonProcess = spawn("python", ["src/ai/app.py", input]);

	let output = "";
	pythonProcess.stdout.on("data", (data) => {
		output += data.toString();
	});

	pythonProcess.stderr.on("data", (data) => {
		console.error(`Python error: ${data.toString()}`);
	});

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
