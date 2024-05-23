import axios from "axios";

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

const handleError = (error) => {
  console.error("Data recovery error:", error.message);
  throw error;
};

export async function fetchData(url) {
  const response = await axios.get(url).
  catch(function (error) {
    return handleError(error);
  });
  return handleSuccess(response);
}

export async function postData(url, data) {
  try {
    console.log(url, data);
    // const isValidInput = url && data && typeof data === "object";
    // if (!isValidInput) throw new Error("Invalid URL or data.");

    const response = await axios.post(url, data);
    console.log(response);
    return response.status === 200
      ? handleSuccess(response.data)
      : handleError(response);
  } catch (error) {
    console.error("Error sending data:", error.message);
    return "error";
  }
}
