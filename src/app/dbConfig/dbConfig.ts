// Import the mongoose library
import mongoose from "mongoose";

// Define an asynchronous function named 'connect' to establish a connection to MongoDB
export async function connect() {
    try {
        // Connect to MongoDB using the provided URI from the environment variables
        mongoose.connect(process.env.MONGO_URI!);

        // Get the connection instance from mongoose
        const connection = mongoose.connection;

        // Listen for the 'connected' event, indicating a successful connection
        connection.on('connected', () => {
            console.log('Mongoose connected successfully');
        });

        // Listen for the 'error' event, indicating an error during the connection
        connection.on('error', (err) => {
            console.log('Mongoose error occurred during connect', err);
            // Exit the process if there is an error during connection
            process.exit();
        });
    } catch (error) {
        // Log an error message if there is an exception during the connection attempt
        console.log("Failed to connect", error);
    }
}
