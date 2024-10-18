// Import the Express application from app.js
const app = require("./app.js");

// Import PORT from environment variables
let { PORT } = require("./managers/env.js");

// Import the http module to create an HTTP server
const http = require("http");

// Check if PORT is set in the environment variables
if (!PORT) console.warn("PORT may be set in .env (default: 4000)");

// Set a default PORT if not provided
PORT = 4000;

// Set the port for the Express app
app.set("port", PORT);

// Create an HTTP server using the Express app
const server = http.createServer(app);

// Set up a listener for the 'listening' event
server.on("listening", () => {
  // Get the server's address
  const address = server.address();

  // Determine the bind address (pipe or port)
  const bind =
    typeof address === "string"
      ? "pipe " + address
      : "http://localhost:" + PORT;

  // Log the server's listening address
  console.log("listening on " + bind);
});

// Start the server and make it listen on the specified PORT
server.listen(PORT);
