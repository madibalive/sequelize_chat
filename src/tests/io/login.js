import Axios from 'axios';

const port = 3800;
const BASE_URL = `http://localhost:${port}/api/v1/`;

Axios.post(BASE_URL + 'auth/login', {
  email: 'aime@andela.com',
  password: 'Bien@BAR789'
})
  .then(async data => {
    console.log(data.data);
  })
  .catch(err => {
    console.log(err);
  });
