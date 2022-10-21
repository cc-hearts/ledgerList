import { Get, Post } from '@/utils/request';
type params = Record<string, unknown>;

export function getVerification() {
  return Get<string>('api/common/getVerification');
}

export function changeVerification() {
  return Post<string>('api/common/changeVerification');
}

export function loginUser<T extends params>(data: T) {
  return Post<{ token: string }>('api/login/loginUser', data);
}

export function registerUser<T extends params>(data: T) {
  return Post<string>('api/user/register', data);
}
