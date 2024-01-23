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
    return new NextResponse(`Event created successfully`, { status: 201 });
  } catch (error) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}

// export async function DELETE(request) {
//   const session = await getServerSession(authOptions);
//   const { id: owner } = session?.user;
//   const { id } = request.query;

//   await connectDB();

//   try {
//     const deletedEvent = await Events.findByIdAndRemove({
//       _id: id,
//       owner,
//     });

//     if (deletedEvent) {
//       return new NextResponse(`Event deleted successfully`, { status: 200 });
//     } else {
//       return new NextResponse(`Event not found`, { status: 404 });
//     }
//   } catch (error) {
//     return new NextResponse(error.message, {
//       status: 500,
//     });
//   }
// }

export async function GET() {
  const session = await getServerSession(authOptions);
  const { id: owner } = session?.user;

  console.log(owner);

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
