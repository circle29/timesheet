export const addEmployee = async (user) => {
  try {
    const body = { user };

    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
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
