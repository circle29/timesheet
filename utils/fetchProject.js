export const fetchProject = async () => {
  try {
    const response = await fetch("/api/project");
    if (!response.ok) {
      throw new Error("Failed to fetch project");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
