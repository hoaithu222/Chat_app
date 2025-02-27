import mongoose from "mongoose";

export default async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGOOSE_URI);
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log("Connect to DB")
        });
        connection.on('error', (error) => {
            console.log("Something is wrong is mongodb", error)

        });

    } catch (error) {
        console.log("Something is wrong", error)
    }
}
