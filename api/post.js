import { Request } from '../helper/http';
import { getStorage, setStorage } from '../helper/storage';

var request = new Request;

export class PostApi {
  static async posts(email, password) {
    const user = await getStorage('user');
    request = new Request(null, user.token);

    return request.get(`posts`);
  }
  static async makePost(post) {
    const user = await getStorage('user');
    request = new Request(null, user.token);

    return request.post(`post`, {request, post});
  }
}