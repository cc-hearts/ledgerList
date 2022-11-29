import '@/assets/scss/components/bill-card.scss';
import { memo, useMemo } from 'react';

const BillCard = ({ date, info }: { date: string; info: any[] }) => {
  const { expenditure, income } = useMemo(() => {
    return info.reduce(
      (acc, cur) => {
        if (acc[cur.consumptionType] === void 0) {
          acc[cur.consumptionType] = 0;
        }
        acc[cur.consumptionType] += Number(cur.amount);
        return acc;
      },
      {
        expenditure: 0,
        income: 0,
      },
    );
  }, [info]);
  return (
    <div className="bill-card">
      <div className="bill-card__title">
        <div>{date}</div>
        <div>
          <span>
            <i className="iconfont icon-xinzengshoukuan"></i>
            <span>{income}</span>
          </span>
          <span>
            <i className="iconfont icon-zhichu"></i>
            <span>{expenditure}</span>
          </span>
        </div>
      </div>
      <div className="bill-card__content">
        {info.map((val) => {
          return (
            <div key={val.id} className="bill-card__content__wrapper">
              <div className="bill-card__content--main">
                <div>{val.consumptionName}</div>
                <div>{val.amount}</div>
              </div>
              {val.remark ? <div className="bill-card__content--remark">{val.remark}</div> : null}
              <div className="bill-card__content--date">{val.date}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default memo(BillCard);
