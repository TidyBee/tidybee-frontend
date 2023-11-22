import axios from 'axios';

const handleSuccess = (response) => {
  const isDataValid = response?.status === 200 && response?.data && typeof response.data === 'object';
  const errorMessage = response?.status !== 200 ? `Error HTTP: ${response?.status} ${response?.statusText || ''}` : 'Invalid data received';

  console[isDataValid ? 'log' : 'error'](
    isDataValid ? 'Data fetched successfully' : errorMessage
  );

  return isDataValid ? response.data : null;
};

const handleError = (error) => {
  console.error('Data recovery error:', error.message);
  return null;
};

export async function fetchData(url) {
  try {
    const response = await axios.get(url);
    return handleSuccess(response);
  } catch (error) {
    return handleError(error);
  }
}

export async function postData(url, data) {
  try {
    const isValidInput = url && data && typeof data === 'object';
    if (!isValidInput) throw new Error('Invalid URL or data.');

    const response = await axios.post(url, data);

    return response.status === 200 ? handleSuccess(response.data) : handleError(response);
  } catch (error) {
    console.error('Error sending data:', error.message);
    return 'error';
  }
}
