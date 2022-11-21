/**
 * @author heart
 * @description
 * @Date 2022-10-10
 */
import { clearObjectData } from '@/lib/shard';
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
