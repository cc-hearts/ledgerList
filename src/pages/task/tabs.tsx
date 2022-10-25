/**
 * @author heart
 * @description 自定义标签属性选择
 * @Date 2022-10-22
 */
import { JumboTab } from '@/components/antd-mobile';
import { useCallback, useEffect } from 'react';
import type { MobileFieldProps } from './types';
import { basicColumns } from './constant';
const TabsFormItem: React.FC<MobileFieldProps<string> & { useDefaultValue: boolean }> = ({ value, onChange, useDefaultValue = false }) => {
  const handleChange = useCallback(
    (key: string) => {
      onChange instanceof Function && onChange(key);
    },
    [onChange],
  );
  useEffect(() => {
    if (!value && useDefaultValue && basicColumns[0].value && onChange instanceof Function) {
      onChange(basicColumns[0].value);
    }
  }, [useDefaultValue, value, onChange]);
  return (
    <JumboTab activeKey={value} onChange={handleChange}>
      {basicColumns.map((val) => {
        const { icon: Icon } = val;
        return <JumboTab.Tab key={val.value} title={<Icon fontSize={24} />} description={<span>{val.label}</span>}></JumboTab.Tab>;
      })}
    </JumboTab>
  );
};
export default TabsFormItem;
