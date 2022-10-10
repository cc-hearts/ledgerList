/**
 * @author heart
 * @description
 * @Date 2022-10-10
 */
import { _toString } from '@/lib/shard';
function clearObjectData<T extends Record<string, unknown>>(data: T): T {
  const keys = Object.keys(data);
  const newData = Object.assign({}, data);
  keys.forEach((key) => {
    switch (_toString.call(newData[key])) {
      case '[object Object]':
        clearObjectData(newData[key] as Record<string, unknown>);
        break;
      case '[object Array]':
        Reflect.set(newData, key, []);
        break;
      case '[object String]':
        Reflect.set(newData, key, '');
        break;
      case '[object Number]':
        Reflect.set(newData, key, 0);
        break;
      case '[object Boolean]':
        Reflect.set(newData, key, false);
        break;
      case '[object Map]':
        (newData[key] as Map<unknown, unknown>).clear();
        break;
      case '[object Set]':
        (newData[key] as Set<unknown>).clear();
        break;
    }
  });
  return newData;
}
import { useCallback, useState } from 'react';
function useFormData<T extends Record<string, unknown>>(initialData: T) {
  const [formData, setFormData] = useState(initialData);
  const setFieldValue = useCallback(
    (obj: Record<string, unknown>) => {
      setFormData(Object.assign({}, formData, obj));
    },
    [formData],
  );
  const clearFormData = useCallback(() => {
    const newData = clearObjectData(formData);
    setFormData(newData);
  }, [formData]);
  return {
    data: formData,
    setFieldValue,
    clearFormData,
  };
}

export default useFormData;
