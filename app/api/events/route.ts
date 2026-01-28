import { Event } from "@/database";
import connectDB from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
export const POST = async (request: NextRequest) => {
  await connectDB();

  const formData = await request.formData();
  const file = formData.get("image") as File;
  if (!file) {
    return NextResponse.json(
      { message: "Image file is required" },
      { status: 400 },
    );
  }
  const arrryBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrryBuffer);

  // Upload to Cloudinary
  const uploadFile = await new Promise((rev, rej) => {
    cloudinary.uploader
      .upload_stream(
        { resource_type: "image", folder: "DevEvent" },
        (err, results) => {
          if (err) rej(err);
          rev(results);
        },
      )
      .end(buffer);
  });

  let event;

  try {
    event = Object.fromEntries(formData.entries());

    try {
      event.image = (uploadFile as { secure_url: string }).secure_url;
      const createdEvent = await Event.create(event);
      return NextResponse.json(
        { message: "Event Created Successfully", event: createdEvent },
        { status: 201 },
      );
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        {
          message: "INVALID JSON DATA FORMAT",
          error: error instanceof Error ? error.message : "Unknown error",
        },
        { status: 400 },
      );
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      {
        message: "Event Creation Failed",
        error: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 },
    );
  }
};

export const GET = async () => {
  try {
    await connectDB();
    const events = await Event.find().sort({ createdAt: -1 });
    console.log(events);
    return NextResponse.json(
      { message: "Data fetched Successfully", events },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: "Error Getting The Data form the Db",
        error:
          err instanceof Error ? err.message : "Internal Server Unknown ERR",
      },
      { status: 500 },
    );
  }
};
