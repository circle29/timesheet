export const getTimesheet = async () => {
  try {
    const userId = sessionStorage.getItem("userId");

    const response = await fetch("/api/timesheet/getById", {
      method: "GET",
      headers: {
        userId: userId,
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
