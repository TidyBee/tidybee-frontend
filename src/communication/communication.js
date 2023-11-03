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

export async function sendData() {
    try {
      const email = 'tom';
      const password = 'srz';

      axios.post("https://localhost:5000/", {
        email: email,
        password: password
      })
      .then((response) => {
        console.log(response);
      });
      } catch (error) {
        console.error(error);
      }
}