import { useCallback, useContext, useEffect, useState } from 'react';
import { CalendarOutline } from 'antd-mobile-icons';
import { getAmountTotal } from '@/api/collect';
import { totalCollect } from '@/constants/collect';
import { DatePicker } from '@/components/antd-mobile/index';
import { CollectProvider } from '../index';
const TotalPanel = () => {
  const [visible, setVisible] = useState(false);
  const [amountCollect, setAmountTotal] = useState<{ expenditure: number; income: number }>({ expenditure: 0, income: 0 });

  const { date, handleChangeDate } = useContext(CollectProvider) || {};
  const getData = useCallback((date) => {
    getAmountTotal({ date }).then((res) => {
      if (res.data) {
        setAmountTotal(res.data);
      }
    });
  }, []);

  useEffect(() => {
    getData(date);
  }, [date, getData]);

  const toggleVisible = useCallback(() => {
    setVisible((state) => !state);
  }, []);
  return (
    <div className="collect-total-panel">
      <div className="collect__date">
        <div onClick={toggleVisible}>
          <span>{date}</span>
          <CalendarOutline />
        </div>
        <div>
          {totalCollect.map((val) => {
            return (
              <div key={val.field}>
                <span>{val.label}</span>
                <div>{amountCollect[val.field as keyof typeof amountCollect] || 0}</div>
              </div>
            );
          })}
        </div>
      </div>
      <DatePicker precision="month" visible={visible} onClose={toggleVisible} onConfirm={handleChangeDate} />
    </div>
  );
};

export default TotalPanel;
