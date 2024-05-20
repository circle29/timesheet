import { NextResponse } from "next/server";

export async function DELETE(req, res) {
  if (req.method !== "DELETE") {
    return NextResponse.json(
      { message: "Method Not Allowed" },
      { status: 405 }
    );
  }

  try {
    const requestHeaders = new Headers(req.headers);
    const timesheetId = Number(requestHeaders.get("timesheetId"));

    const timesheet = await prisma.Timesheet.delete({
      where: {
        id: timesheetId,
      },
    });

    return Response.json(timesheet, {
      message: "Success delete timesheet",
    });
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
