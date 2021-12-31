import MockAdapter from 'axios-mock-adapter';
let mock;

const initMock = client => {
  mock = new MockAdapter(client);

  // ////////////////////////// AUTH
  // ///////////////////////////////

  mock.onPost('http://localhost:3000/api/v1/auth/login').reply(200, {
    access_token: userData.access_token,
    messages: 'success'
  });
  mock.onPost('/auth/logout').reply(200, {
    data: {}
  });
  mock.onPost('http://localhost:3000/api/v1/auth/register').reply(200, {
    access_token: userData.access_token
  });
  mock.onPost('/auth/forgot-password').reply(200, {
    access_token: userData.access_token,
    messages: 'success'
  });
  mock.onPost('/auth/reset-password').reply(200, {
    data: userData
  });
  // ////////////////////////// USER
  // ///////////////////////////////
  mock.onGet('http://localhost:3000/api/v1/users/view-profile').reply(200, {
    data: userData
  });
  mock.onPost('/user/edit-profile').reply(200, {
    data: userData
  });
};

export default initMock;

let userData = {
  id: 34,
  access_token: 'sadsad',
  first_name: 'tessa',
  last_name: 'thompson',
  email: 'razakwasiu@mal.com',
  avatar: 'https://via.placeholder.com/150'
};
