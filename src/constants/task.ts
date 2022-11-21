import { ClockCircleOutline } from 'antd-mobile-icons';
export const basicColumns = [{ label: '日常', value: '1', icon: ClockCircleOutline }];
export const getBasicLabel = (value: string) => {
  const data = basicColumns.find((record) => record.value === value);
  if (data) {
    return data.label;
  }
  return null;
};
