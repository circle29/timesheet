export const loginUser = async (user) => {
  try {
    const body = { user };

    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
    const data = await response.json();
    sessionStorage.setItem("userId", data.userId);
    sessionStorage.setItem("username", data.username);
    sessionStorage.setItem("rate", data.rate);
    return data;
  } catch (error) {
    throw error;
  }
};
