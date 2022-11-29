export interface ChildrenProps {
  children?: React.ReactNode;
}

export interface MobileFieldProps<T> {
  value?: T;
  onChange?: (...args: any) => void;
}

export type getDataRef = { getData: () => void };

export type formRef = { setFieldsValue: (...args: any[]) => void; setType: (...args: any[]) => void };

export interface dictMap {
  dictKey: string;

  dictValue: string;

  dictName: string;

  status: number;

  id: number;

  remark: string;

  isDelete: number;

  createTime: string;

  updateTime: string;
}
