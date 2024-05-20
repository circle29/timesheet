import prisma from "@/lib/prisma";

export async function POST(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const data = await req.json();

    if (!data) {
      return Response.json({ message: "User is required" });
    }

    const findUser = await prisma.User.findUnique({
      where: {
        name: data.user,
      },
    });

    if (findUser) {
      return Response.json({ message: "User already exist" });
    }

    const createUser = await prisma.User.create({
      data: {
        name: data.user,
      },
    });

    return Response.json({
      userId: createUser.id,
      username: createUser.name,
      rate: createUser.rate,
      message: "User added successfully",
    });
  } catch (error) {
    return Response.json({ message: "Internal Server Error" });
  }
}
