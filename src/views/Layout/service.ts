import { Get } from '@/utils/request';

export function getUserInfo() {
  return Get('api/user/getUserInfo');
}
