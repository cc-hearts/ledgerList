import Less from './index.less';
interface props {}
const Card: React.FC<props> = function (props) {
  return <div className={Less['card'] + ' shadow-xl p-4'}>{props.children}</div>;
};

export default Card;
