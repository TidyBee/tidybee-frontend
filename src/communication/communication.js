import axios from 'axios'

export async function fetchData(url) {
  try {
    console.log('url:', url);
    const response = await axios.get(url);
    const isDataValid = response?.status === 200 && response?.data && typeof response.data === 'object';
    const errorMessage = response?.status !== 200 ? `Error HTTP: ${response?.status} ${response?.statusText || ''}` : 'Invalid data received';

    console[isDataValid ? 'log' : 'error'](
      isDataValid ? 'Data fetched successfully' : errorMessage
    );

    return isDataValid ? response.data : null;
  } catch (error) {
    console.error('Data recovery error:', error.message);
    return null;
  }
}

export async function postData(url, data) {
  try {
    const isValidInput = url && data && typeof data === 'object';
    const response = isValidInput ? await axios.post(url, data) : null;

    const isSuccess = response && response.status === 200;

    console[isSuccess ? 'log' : 'error'](
      isSuccess ? `Data sent successfully: ${response.data}` : `Error HTTP: ${response?.status} ${response?.statusText || ''}` || 'Invalid URL or data.'
    );

    return isSuccess ? 'success' : 'error';
  } catch (error) {
    console.error('Error sending data:', error.message);
    return 'error';
  }
}
