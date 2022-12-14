import { Button, ProgressBar } from '@/components/antd-mobile/index';
import { memo, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { getMonthAmount } from '@/api/collect';
import { CollectProvider } from '../index';

const CompositionTitle = function () {
  const [type, setType] = useState('expenditure');

  const [amountList, setAmountList] = useState<{ field: string; amount: string; name: string; remark?: string }[]>([]);
  const getData = useCallback((data: { type: string; date: string }) => {
    getMonthAmount(data).then((res) => {
      if (res.data) {
        setAmountList(res.data);
      }
    });
  }, []);
  const { date } = useContext(CollectProvider);
  type amountType = keyof typeof amountList;
  type percentType = Record<amountType, string>;
  const percent: percentType = useMemo(() => {
    const total = amountList.reduce((acc, cur) => {
      acc += Number(cur.amount);
      return acc;
    }, 0);
    return amountList.reduce((acc, cur) => {
      Reflect.set(acc, cur.field, total === 0 ? 0 : ((Number(cur.amount) / total) * 100).toFixed(2));
      return acc;
    }, {} as percentType);
  }, [amountList]);
  console.log(percent);
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
            <div key={val.field} className="amount-list">
              <div>
                <i className={`iconfont ${val.remark}`}></i>
                <span>{val.name}</span>
                <span>{Number(val.amount).toLocaleString()}</span>
              </div>
              <div className="amount-list__process-bar">
                <ProgressBar percent={Number(percent[val.field as amountType])} text />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default memo(CompositionTitle);
