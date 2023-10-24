import axios from 'axios'

export async function getData(url) {
    try {
      const response = await axios.get(url);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
}

export async function sendData(url, data) {
    try {
      const response = await axios.post(url, data);
      console.log("send data :", response.data);
    } catch (error) {
      console.error(error);
    }
}