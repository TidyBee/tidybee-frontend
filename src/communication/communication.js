import axios from 'axios'

export async function fetchData(url) {
  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      if (response.data && typeof response.data === 'object') {
        return response.data;
      } else {
        console.error('Invalid data received:', response.data);
        return null;
      }
    } else {
      console.error('Error HTTP :', response.status, response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Data recovery error:', error.message);
    return null;
  }
}

export async function postData(url, data) {
  try {
    if (url && data && typeof data === 'object') {
      const response = await axios.post(url, data);

      if (response.status === 200) {
        console.log('Data sent successfully:', response.data);
        return 'success';
      } else {
        console.error('Error HTTP :', response.status, response.statusText);
        return 'error';
      }
    } else {
      console.error('Invalid URL or data.');
      return 'error';
    }
  } catch (error) {
    console.error('Error sending data:', error.message);
    return 'error';
  }
}
