import Events from "@/models/Events";
import connectDB from "@/db/server";
import { NextResponse } from "next/server";

export async function POST(req) {
  console.log(req, "req");
  const { _id: owner } = await req.user;
  const eventData = req.body;
  await connectDB();

  try {
    const newEvent = new Events({
      ...eventData,
      owner,
    });

    await newEvent.save();
    return new NextResponse(`Event created successfully`, { status: 201 });
  } catch (error) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}

export async function DELETE(req) {
  const eventId = req.query.id;

  await connectDB();

  try {
    const deletedEvent = await Events.findByIdAndRemove(eventId);

    if (deletedEvent) {
      return new NextResponse(`Event deleted successfully`, { status: 200 });
    } else {
      return new NextResponse(`Event not found`, { status: 404 });
    }
  } catch (error) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}

export async function GET(req) {
  const { _id: owner } = req.user;

  await connectDB();

  try {
    const events = await Events.find({ owner }, "-createdAt -updatedAt");
    return new NextResponse(JSON.stringify(events), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}
