import User from "@/models/User";
import connectDB from "@/db/server";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  // console.log(req);
  const { email, password } = await req.json();

  await connectDB();

  const user = await User.findOne({ email });

  if (user) {
    return new NextResponse("Email is already in use", { status: 409 });
  }

  const hashPassword = await bcrypt.hash(password, 12);

  const newUser = new User({
    email,
    password: hashPassword,
  });

  try {
    const savedUser = await newUser.save();
    return new NextResponse(
      `User with email ${savedUser.email} created successfully`,
      { status: 201 }
    );
  } catch (error) {
    return new NextResponse(error, {
      status: 500,
    });
  }
}
