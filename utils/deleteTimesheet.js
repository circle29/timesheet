export const deleteTimesheet = async (timesheetId) => {
  try {
    const response = await fetch("/api/timesheet/deleteById", {
      method: "DELETE",
      headers: {
        timesheetId: timesheetId,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};
