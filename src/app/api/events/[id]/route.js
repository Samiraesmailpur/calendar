import Events from "@/models/Events";
import connectDB from "@/db/server";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  await connectDB();
  const { id } = params;

  await Events.findByIdAndDelete(id);
  return NextResponse.json({ message: "Event deleted" }, { status: 200 });
}
