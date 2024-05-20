const moment = require("moment-timezone");
import { NextResponse } from "next/server";

export async function GET(req, res) {
  if (req.method !== "GET") {
    return NextResponse.json(
      { message: "Method Not Allowed" },
      { status: 405 }
    );
  }

  try {
    const requestHeaders = new Headers(req.headers);
    const userId = Number(requestHeaders.get("userId"));

    if (!userId) {
      return NextResponse.json(
        { message: "User ID not provided" },
        { status: 400 }
      );
    }

    const timesheet = await prisma.Timesheet.findMany({
      where: {
        userId: userId,
      },
      include: {
        project: true,
      },
    });

    const formatDate = (date) => {
      return moment(date).tz("Asia/Jakarta").format("YYYY-MM-DD");
    };

    const formatTime = (time) => {
      return moment(time).tz("Asia/Jakarta").format("HH:mm:ss");
    };

    const overtimeDuration = (duration) => {
      const hours = Math.floor(duration / 60);
      const minutes = duration % 60;

      return `${hours} hours ${minutes} minutes`;
    };

    const response = timesheet.map((value) => ({
      id: value.id,
      activityName: value.activityName,
      projectName: value.project.projectName,
      startDate: formatDate(value.startDate),
      endDate: formatDate(value.endDate),
      startTime: formatTime(value.startTime),
      endTime: formatTime(value.endTime),
      totalDuration: value.duration,
      duration: overtimeDuration(value.duration),
      income: value.income,
    }));

    return Response.json(response, {
      message: "Success get timesheet",
    });
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
