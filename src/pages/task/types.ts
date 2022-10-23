export interface MobileFieldProps<T> {
  value?: T;
  onChange?: (...args: any) => void;
}

export type getDataRef = { getData: () => void };

export type formRef = { setFieldsValue: (...args: any[]) => void; setType: (...args: any[]) => void };
