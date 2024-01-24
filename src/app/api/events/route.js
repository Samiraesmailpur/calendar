import Events from "@/models/Events";
import connectDB from "@/db/server";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  const { start, duration, title, order, column } = await req.json();
  const { id: owner } = session?.user;

  await connectDB();

  try {
    const newEvent = new Events({
      start,
      duration,
      title,
      order,
      column,
      owner,
    });

    await newEvent.save();
    return new NextResponse({
      status: 201,
      message: "Event created successfully",
    });
  } catch (error) {
    return new NextResponse({ message: error.message, status: 500 });
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);
  const { id: owner } = session?.user;

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
