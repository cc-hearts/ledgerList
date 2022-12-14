import '@/assets/scss/collect/index.scss';
import TotalPanel from './components/totalPanel';
import RevAExpComposition from './components/revAExpComposition';
import { createContext, useCallback, useState } from 'react';
import { getCurrentMonth } from '@/utils/date';
import { noop } from '@/lib/shard';
export const CollectProvider = createContext<{ date: string; handleChangeDate: (date: string | Date) => void }>({
  date: '',
  handleChangeDate: noop,
});
const Collect = () => {
  const [date, setDate] = useState(getCurrentMonth());
  const handleChangeDate = useCallback((date) => {
    const newDate = new Date(date);
    newDate.setHours(newDate.getHours() + 8);
    setDate(newDate.toISOString().split('T')[0].split('-').slice(0, -1).join('-'));
  }, []);
  return (
    <CollectProvider.Provider value={{ date, handleChangeDate }}>
      <TotalPanel />
      <RevAExpComposition />
    </CollectProvider.Provider>
  );
};

export default Collect;
