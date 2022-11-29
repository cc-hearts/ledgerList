import BillCard from '@/feature/components/card/bill-card';
import '@/assets/scss/bill/index.scss';
import { getBillList } from '@/api/bill';
import type { RefObject } from 'react';
import { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
const BillContainer = ({ handleRef }: { handleRef: RefObject<{ initGetData: (...args: any[]) => void }> }) => {
  const [{ pageSize, offset }, setSearchObj] = useState({ pageSize: 10, offset: 1 });
  const activeTotal = useRef(0);
  const [{ dataSource, total }, setData] = useState<{ dataSource: Record<string, unknown[]>; total: number }>({ dataSource: {}, total: 0 });
  const getData = useCallback((data) => {
    const { pageSize, offset } = data;
    getBillList({ pageSize, offset }).then((res) => {
      if (res.data) {
        const { list, total } = res.data;
        activeTotal.current += total;
        const dataSource = list.reduce((acc, cur) => {
          const date = new Date(cur.date);
          date.setHours(date.getHours() + 8);
          cur.date = date.toISOString().split('T')[0];
          if (!(cur.date in acc)) {
            acc[cur.date] = [];
          }
          // 计算所有的总和 是否大于total 大于total则不能在请求
          acc[cur.date].push(cur);
          return acc;
        }, {});
        setData({
          dataSource,
          total,
        });
      }
    });
  }, []);

  // TODO: 下刷新
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleRefresh = useCallback(() => {
    if (activeTotal.current > total) return;
    setSearchObj((searchObj) => {
      searchObj.offset++;
      return { ...searchObj };
    });
  }, [total]);

  useEffect(() => {
    getData({ pageSize, offset });
  }, [getData, pageSize, offset]);

  const initGetData = useCallback(() => {
    activeTotal.current = 0;
    if (offset === 1) {
      getData({ pageSize, offset });
    } else {
      setSearchObj((obj) => ({ ...obj, offset: 1 }));
    }
  }, [getData, offset, pageSize]);

  useImperativeHandle(handleRef, () => ({
    initGetData,
  }));
  return (
    <div className="bill-container">
      {Object.keys(dataSource).map((key) => {
        return <BillCard key={key} date={key} info={dataSource[key] || []} />;
      })}
    </div>
  );
};

export default BillContainer;
