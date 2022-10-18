import { Get, Post } from '@/utils/request';
interface baseData {
  data: string;
}
export function getVerification() {
  return Get<baseData>('api/common/getVerification');
}

export function changeVerification() {
  return Post<baseData>('api/common/changeVerification');
}
