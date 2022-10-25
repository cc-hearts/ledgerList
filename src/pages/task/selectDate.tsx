import { Calendar, Popup, Selector } from '@/components/antd-mobile';
import { Input } from '@/feature/components/index';
import { noop } from '@/lib/shard';
import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import type { MobileFieldProps } from './types';
import dayjs from 'dayjs';
const WrapperTitle = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  align-items: center;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
`;
const Accept = styled.a`
  font-size: 1rem;
`;

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
        <WrapperTitle>
          <Selector options={options} onChange={handleChangeCalendarSelect} />
          <Accept onClick={selectDate}>确定</Accept>
        </WrapperTitle>
        <Calendar selectionMode={selectionMode} onChange={handleCalendarValue} />
      </Popup>
    </>
  );
};

export default SelectDate;
