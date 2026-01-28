import Event from "@/database/event.model";
import connectDB from "@/lib/mongoose";

export async function getEvents() {
  try {
    await connectDB();
    return await Event.find().lean();
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}
