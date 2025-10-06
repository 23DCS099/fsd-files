const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    const logFilePath = path.join(__dirname, "error.log");

    fs.readFile(logFilePath, "utf8", (err, data) => {
        if (err) {
            if (err.code === "ENOENT") {
                return res.status(404).send("<h1>Log file not found</h1>");
            }
            return res.status(500).send("<h1>Unable to read log file</h1>");
        }

        res.send(`
            <html>
                <head>
                    <title>Error Logs</title>
                    <style>
                        body { font-family: monospace; background: #f5f5f5; padding: 20px; }
                        pre { background: #222; color: #eee; padding: 15px; border-radius: 5px; }
                    </style>
                </head>
                <body>
                    <h1>Error Log Viewer</h1>
                    <pre>${data}</pre>
                </body>
            </html>
        `);
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
