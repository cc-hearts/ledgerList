import { Button } from '@/components/antd-mobile/index';
import { memo, useCallback, useContext, useEffect, useState } from 'react';
import { getMonthAmount } from '@/api/collect';
import { CollectProvider } from '../index';
const CompositionTitle = function () {
  const [type, setType] = useState('expenditure');

  const [amountList, setAmountList] = useState<{ field: string; amount: string; name: string }[]>([]);
  const getData = useCallback((data: { type: string; date: string }) => {
    getMonthAmount(data).then((res) => {
      if (res.data) {
        setAmountList(res.data);
      }
    });
  }, []);
  const { date } = useContext(CollectProvider);

  useEffect(() => {
    getData({ date, type });
  }, [getData, type, date]);

  const handleSetType = useCallback((type) => {
    setType(type);
  }, []);
  return (
    <>
      <div className="composition-wrapper__title">
        <h2>收支构成</h2>
        <div>
          <Button color={type === 'expenditure' ? 'success' : 'default'} onClick={() => handleSetType('expenditure')}>
            支出
          </Button>
          <Button color={type === 'income' ? 'success' : 'default'} onClick={() => handleSetType('income')}>
            收入
          </Button>
        </div>
      </div>
      <div>
        {amountList.map((val) => {
          return (
            <div key={val.field}>
              <span>{val.name}</span>
              <span>{val.amount}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default memo(CompositionTitle);
