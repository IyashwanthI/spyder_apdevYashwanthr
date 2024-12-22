import mongoose from 'mongoose';

export async function connectDB() {
    try {
        const connection = await mongoose.connect('mongodb+srv://<user>:<password>@<your url>', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected");
        return connection;
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); 
    }
}
