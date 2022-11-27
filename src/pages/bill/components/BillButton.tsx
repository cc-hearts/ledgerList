import PopupButton from '@/components/popupButton/index';
import TypeFilter from './typeFilter';
import { useCallback, useEffect, useState } from 'react';
const BillButton = () => {
  const [type, setType] = useState<{ label: string; value: string }>({ label: '全部类型', value: '' });
  const [date, setDate] = useState(new Date().toISOString().split('T')[0].split('-').slice(0, -1).join('-'));
  const handleChangeTypeLabel = useCallback((label, value) => {
    setType(() => ({
      label,
      value,
    }));
  }, []);
  const handleSetDate = useCallback((label) => {
    setDate(label);
  }, []);

  useEffect(() => {
    console.log(type.value, date);
  }, [type.value, date]);
  return (
    <section className="bill__button">
      <PopupButton changeLabel={handleChangeTypeLabel} label={type.label} showCallback={TypeFilter} />
      <PopupButton changeLabel={handleSetDate} dateType="month" label={date} />
    </section>
  );
};

export default BillButton;
