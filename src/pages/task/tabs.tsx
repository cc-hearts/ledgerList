/**
 * @author heart
 * @description 自定义标签属性选择
 * @Date 2022-10-22
 */
import { JumboTab } from '@/components/antd-mobile';
import { useCallback, useRef } from 'react';
import type { MobileFieldProps } from './types';
import { ClockCircleOutline } from 'antd-mobile-icons';
const basicColumns = [{ label: '日常', value: 'Mon', icon: ClockCircleOutline }];
const TabsFormItem: React.FC<MobileFieldProps<string> & { useDefaultValue: boolean }> = ({ value, onChange, useDefaultValue = false }) => {
  const handleChange = useCallback(
    (key: string) => {
      onChange instanceof Function && onChange(key);
    },
    [onChange],
  );
  const _first = useRef(false);
  if (!_first.current) {
    _first.current = true;
    useDefaultValue && onChange && onChange(basicColumns[0].value);
  }
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
