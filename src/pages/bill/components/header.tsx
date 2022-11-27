import '@/assets/scss/bill/header.scss';
import Payment from './payment';
import BillButton from './BillButton';
const Header = () => {
  return (
    <div className="bill__header">
      <div className="flex">
        <Payment label="总支出：" value="5500" />
        <Payment label="总收入：" value="1331" />
      </div>
      <BillButton />
    </div>
  );
};

export default Header;
