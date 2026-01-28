import { Event } from "@/database";
import connectDB from "@/lib/mongoose";
import { NextRequest as req, NextResponse as res } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) => {
  const { slug } = await params;

  // Validate slug
  if (!slug || typeof slug !== "string" || slug.trim() === "") {
    return res.json({ message: "Invalid slug provided" }, { status: 400 });
  }

  try {
    await connectDB();
    const event = await Event.findOne({ slug: slug.trim() });

    if (!event) {
      return res.json({ message: "Event not found" }, { status: 404 });
    }

    return res.json(
      { message: "Event Sent Successfully", event },
      { status: 200 },
    );
  } catch (err) {
    return res.json(
      {
        message: "Error Getting The Data from the Db",
        error:
          err instanceof Error ? err.message : "Internal Server Unknown ERR",
      },
      { status: 500 },
    );
  }
};
