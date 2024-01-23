import Events from "@/models/Events";
import connectDB from "@/db/server";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function DELETE(req, res) {
  const session = await getServerSession(authOptions);
  // const { id: owner } = session?.user;
  // const { id } = request.query;
  const {
    query: { id },
  } = req;

  await connectDB();

  const deletedUser = await Events.findByIdAndDelete(id);
  if (!deletedUser) return res.status(404).json({ msg: "does not exist" });
  return res.status(200).json();

  // try {
  //   const deletedEvent = await Events.findByIdAndDelete({
  //     _id,
  //     owner,
  //   });

  //   if (deletedEvent) {
  //     return new NextResponse(`Event deleted successfully`, { status: 200 });
  //   } else {
  //     return new NextResponse(`Event not found`, { status: 404 });
  //   }
  // } catch (error) {
  //   return new NextResponse(error.message, {
  //     status: 500,
  //   });
  // }
}
