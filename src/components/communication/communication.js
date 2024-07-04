export const handleSuccess = (response) => {
  const isDataValid =
    response?.status === 200 &&
    response?.data &&
    typeof response.data === "object";
  const errorMessage =
    response?.status !== 200
      ? `Error HTTP: ${response?.status} ${response?.statusText || ""}`
      : "Invalid data received";

  console[isDataValid ? "log" : "error"](
    isDataValid ? "Data fetched successfully" : errorMessage,
  );

  return isDataValid ? response.data : null;
};

export const handleError = (error) => {
  console.error("Data recovery error:", error.message);
  throw error;
};