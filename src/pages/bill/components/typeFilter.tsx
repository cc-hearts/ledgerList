import { Button } from '@/components/antd-mobile/index';
import '@/assets/scss/bill/typeFilter.scss';
import { useCallback, useEffect, useState } from 'react';
import { getDictMap } from '@/api';
import type { dictMap } from '@/types/types';
const TypeFilter = ({ changeLabel }: { changeLabel: (args: string, val: string) => void }) => {
  const [expenditure, setExpenditure] = useState<dictMap[]>([]);
  const [income, setIncome] = useState<dictMap[]>([]);

  const [active, setActive] = useState('');
  useEffect(() => {
    getDictMap('expenditure').then((res) => {
      setExpenditure(res.data || []);
    });
  }, []);
  useEffect(() => {
    getDictMap('income').then((res) => {
      setIncome(res.data || []);
    });
  }, []);

  const handleSetActive = useCallback(
    (active, name) => {
      setActive(() => active);
      changeLabel(name, active);
    },
    [changeLabel],
  );
  return (
    <div className="type-filter">
      <Button color={active === '' ? 'primary' : void 0} fill="solid" onClick={() => handleSetActive('', '全部类型')}>
        全部类型
      </Button>

      <h3>支出</h3>
      <div className="type-filter__wrapper">
        {expenditure.map((val) => {
          return (
            <Button
              color={val.dictValue === active ? 'primary' : void 0}
              key={val.dictValue}
              onClick={() => handleSetActive(val.dictValue, val.dictName)}
            >
              {val.dictName}
            </Button>
          );
        })}
      </div>

      <h3>收入</h3>
      <div className="type-filter__wrapper">
        {income.map((val) => {
          return (
            <Button
              color={val.dictValue === active ? 'primary' : void 0}
              key={val.dictValue}
              onClick={() => handleSetActive(val.dictValue, val.dictName)}
            >
              {val.dictName}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default TypeFilter;
