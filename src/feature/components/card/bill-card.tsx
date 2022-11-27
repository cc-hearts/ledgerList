import '@/assets/scss/components/bill-card.scss';

const info = [
  { label: '转账', count: 446, date: '09:13' },
  { label: '咋去', count: 324, date: '89:13' },
];
const BillCard = ({ date }: { date: string }) => {
  return (
    <div className="bill-card">
      <div className="bill-card__title">
        <div>{date}</div>
        <div>
          <span>
            <i className="iconfont icon-xinzengshoukuan"></i>
            <span>¥11200</span>
          </span>
          <span>
            <i className="iconfont icon-zhichu"></i>
            <span>¥33000</span>
          </span>
        </div>
      </div>
      <div className="bill-card__content">
        {info.map((val) => {
          return (
            <div key={val.date} className="bill-card__content__wrapper">
              <div className="bill-card__content--main">
                <div>{val.label}</div>
                <div>{val.count}</div>
              </div>
              <div className="bill-card__content--date">{val.date}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BillCard;
