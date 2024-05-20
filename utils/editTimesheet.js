export const getTimesheet = async () => {
  try {
    const userId = sessionStorage.getItem("userId");

    const response = await fetch("/api/timesheet/timesheet", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: {},
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
