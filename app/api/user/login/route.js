import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const data = await req.json();

    if (!data) {
      return NextResponse.json(
        { error: "Please input your username" },
        { status: 400 }
      );
    }

    const findUser = await prisma.User.findUnique({
      where: {
        name: data.user,
      },
    });

    if (!findUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return Response.json({
      userId: findUser.id,
      username: findUser.name,
      rate: findUser.rate,
      message: "Login Success",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
