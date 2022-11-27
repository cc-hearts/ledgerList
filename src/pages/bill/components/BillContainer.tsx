import BillCard from '@/feature/components/card/bill-card';
import '@/assets/scss/bill/index.scss';
const date = [{ date: '2022-11-22', info: [{ label: '转账', count: '445' }] }];
const BillContainer = () => {
  console.log(date);

  return (
    <div className="bill-container">
      <div>
        {date.map((val) => {
          return <BillCard key={val.date} date={val.date} />;
        })}
      </div>
    </div>
  );
};

export default BillContainer;
