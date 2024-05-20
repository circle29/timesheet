import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const project = await prisma.project.findMany();
    return Response.json(project);
  } catch (error) {
    return Response.json({ error: "Internal Server Error" });
  }
}

export async function POST(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const data = await req.json();

    if (!data) {
      return Response.json({ message: "Project is required" });
    }

    const createNewProject = await prisma.Project.create({
      data: {
        projectName: data.project,
      },
    });

    return Response.json(createNewProject, {
      message: "Create new project successfully",
    });
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Internal Server Error" });
  }
}
