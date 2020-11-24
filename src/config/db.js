import mongoose from 'mongoose';

export default async function connectDB() {
  try {
    let MONGO_URI = process.env.MONGO_URI;
    const conn = await mongoose.connect(MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    });

    console.info(`Connected MongoDB at ${conn.connection.host}`);
  } catch (e) {
    console.error(`Error: ${e.message}`)
    process.exit(1);
  }
}