import { Button } from '@/components/antd-mobile/index';
import '@/assets/scss/bill/typeFilter.scss';
const expenditure = ['餐饮', '服饰', '交通', '日用', '购物', '学习'];
const income = ['工资', '奖金', '转账', '理财', '退款', '其他'];
const TypeFilter = () => {
  return (
    <div className="type-filter">
      <Button color="primary" fill="solid">
        全部类型
      </Button>

      <h3>支出</h3>
      <div className="type-filter__wrapper">
        {expenditure.map((val, index) => {
          return <Button key={index}>{val} </Button>;
        })}
      </div>

      <h3>收入</h3>
      <div className="type-filter__wrapper">
        {income.map((val, index) => {
          return <Button key={index}>{val} </Button>;
        })}
      </div>
    </div>
  );
};

export default TypeFilter;
