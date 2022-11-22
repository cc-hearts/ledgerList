import '@/assets/scss/bill/header.scss';
import Payment from './payment';
import PopupButton from '@/components/popupButton/index';
import TypeFilter from './typeFilter';
import DateFilter from './DateFilter';
const Header = () => {
  return (
    <div className="bill__header">
      <div className="flex">
        <Payment label="总支出：" value="5500" />
        <Payment label="总收入：" value="1331" />
      </div>
      <section className="bill__button">
        <PopupButton label="全部类型" showCallback={TypeFilter} />
        <PopupButton label="2022-11" showCallback={DateFilter} />
      </section>
    </div>
  );
};

export default Header;
