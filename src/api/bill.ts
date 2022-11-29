import { Post } from '@/utils/request';

export function addBill<T extends params>(data: T) {
  return Post('api/bill/addBill', data);
}

export function getBillList<T extends params>(data: T) {
  return Post<{ list: any[]; total: number }>('api/bill/findBill', data);
}
