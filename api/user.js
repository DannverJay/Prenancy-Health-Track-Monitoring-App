import { Request } from '../helper/http';

import { getStorage } from '../helper/storage';

var request = new Request;

export class UserApi {
  static login(email, password) {
    return request.post(`login`, {email, password});
  }

  static async logout() {
    const user = await getStorage('user');
    request = new Request(null, user.token);

    return request.post('logout');
  }
  static register(firstname, lastname, email, password) {
    return request.post(`register`, {firstname, lastname, email, password});
  }
}