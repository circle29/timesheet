import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { message: "Method Not Allowed" },
      { status: 405 }
    );
  }

  try {
    const data = await req.json();

    const parseTime = (time) => {
      const [hours, minutes] = time.split(":").map(Number);
      return hours + minutes / 60;
    };

    const startTime = parseTime(data.startDate.split(" ")[1]);
    const endTime = parseTime(data.endDate.split(" ")[1]);

    const workStartTime = 9;
    const workEndTime = 17;

    const calculateOvertime = (start, end) => {
      let overtime = 0;

      if (start < workStartTime) {
        overtime += workStartTime - start;
      }

      if (end > workEndTime) {
        overtime += end - workEndTime;
      }

      return overtime;
    };

    const user = await prisma.user.findUnique({
      where: {
        id: data.userId,
      },
    });
    const overtimeHours = calculateOvertime(startTime, endTime);
    const overtimeIncome = overtimeHours * user.rate * 0.3;
    const overtimeMinutes = Math.round(overtimeHours * 60);

    const createActivities = await prisma.Timesheet.create({
      data: {
        projectId: data.selectedProject,
        userId: data.userId,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        startTime: new Date(data.startDate),
        endTime: new Date(data.endDate),
        rate: data.rate,
        duration: overtimeMinutes,
        activityName: data.activityName,
        income: overtimeIncome,
      },
    });

    return Response.json(createActivities, {
      message: "add activity success",
    });
  } catch (error) {
    return Response.error(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req, res) {
  if (req.method !== "PUT") {
    return NextResponse.json(
      { message: "Method Not Allowed" },
      { status: 405 }
    );
  }

  try {
    const data = await req.json();

    if (data.endDate < data.startDate) {
      return NextResponse.json(
        { message: "Please input time properly" },
        { status: 404 }
      );
    }

    const parseTime = (time) => {
      const [hours, minutes] = time.split(":").map(Number);
      return hours + minutes / 60;
    };

    const startTime = parseTime(data.startDate.split(" ")[1]);
    const endTime = parseTime(data.endDate.split(" ")[1]);

    const workStartTime = 9;
    const workEndTime = 17;

    const calculateOvertime = (start, end) => {
      let overtime = 0;
      console.log(overtime);

      if (start < workStartTime) {
        overtime += (workStartTime - start) * 60;
        console.log(overtime);
      }

      if (end > workEndTime) {
        overtime += (end - workEndTime) * 60;
        console.log(overtime);
      }

      return overtime;
    };

    const overtimeHours = calculateOvertime(startTime, endTime);
    const updateTimesheet = await prisma.Timesheet.update({
      where: {
        id: data.timesheetId,
      },
      data: {
        activityName: data.activityName,
        projectId: data.selectedProject,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        startTime: new Date(data.startDate),
        endTime: new Date(data.endDate),
        duration: overtimeHours,
      },
    });

    return Response.json(updateTimesheet, {
      message: "Update timesheet success",
    });
  } catch (error) {
    console.log(error);
    return Response.error(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
