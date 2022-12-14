import { Post } from '@/utils/request';

export function getAmountTotal<T extends params>(data: T) {
  return Post<{ expenditure: number; income: number }>('api/bill/monthTotalAmount', data);
}

export function getMonthAmount({ type, date }: { type: string; date: string }) {
  return Post('api/bill/getMonth/' + type, { date });
}
