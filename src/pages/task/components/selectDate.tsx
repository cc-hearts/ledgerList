import { Calendar, Popup, Selector } from '@/components/antd-mobile';
import { Input } from '@/feature/components/index';
import { noop } from '@/lib/shard';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { MobileFieldProps } from '@/types/types';
import dayjs from 'dayjs';

const options = [
  {
    label: '单日选择',
    value: 'single',
  },
  {
    label: '范围选择',
    value: 'range',
  },
];
const SelectDate: React.FC<MobileFieldProps<string> & { useSingleCurrentDate: boolean }> = ({ value, onChange, useSingleCurrentDate = false }) => {
  const [visible, setVisible] = useState(false);
  const toggleVisible = useCallback(() => {
    setVisible((visible) => !visible);
  }, []);
  const [selectionMode, setSelectionMode] = useState<'single' | 'range'>('single');
  const calRef = useRef<Date | [Date, Date] | null>(null);
  const handleChangeCalendarSelect = useCallback((_, extend) => {
    const [item] = extend.items;
    setSelectionMode(item.value);
  }, []);
  const selectDate = useCallback(() => {
    let date: string | null = null;
    if (calRef.current instanceof Array) {
      date = calRef.current
        .reduce((acc, val) => {
          acc.push(dayjs(val).format('YYYY/MM/DD'));
          return acc;
        }, [] as Array<string>)
        .join(' - ');
    } else if (calRef.current !== null) {
      date = dayjs(calRef.current).format('YYYY/MM/DD');
    }
    onChange && onChange(date || void 0);
    toggleVisible();
  }, [toggleVisible, onChange]);
  const handleCalendarValue = useCallback((val: Date | [Date, Date] | null) => {
    calRef.current = val;
  }, []);

  useEffect(() => {
    if (useSingleCurrentDate && !value && onChange instanceof Function) {
      if (selectionMode === 'single') {
        onChange(dayjs().format('YYYY/MM/DD'));
      }
    }
  }, [onChange, value, useSingleCurrentDate, selectionMode]);
  return (
    <>
      <Input placeholder="请选择日期" value={value || ''} onChange={noop} click={toggleVisible} readonly />
      <Popup visible={visible} onMaskClick={toggleVisible}>
        <div className="select-date__wrapper">
          <Selector options={options} onChange={handleChangeCalendarSelect} />
          <a className="select-date__accept" onClick={selectDate}>
            确定
          </a>
        </div>
        <Calendar selectionMode={selectionMode} onChange={handleCalendarValue} />
      </Popup>
    </>
  );
};

export default SelectDate;
