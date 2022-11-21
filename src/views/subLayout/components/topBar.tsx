// 顶部烂
import { LeftOutline } from 'antd-mobile-icons';
import { history } from 'umi';
import { useCallback } from 'react';
import '@/assets/scss/layout/topBar.scss';
interface Props {
  title: string;
}
const TopBar: React.FC<Props> = ({ title }) => {
  const goBack = useCallback(() => {
    history.go(-1);
  }, []);
  return (
    <div className="top-bar-wrapper">
      <span onClick={goBack}>
        <LeftOutline fontSize={24} />
      </span>
      <span>{title}</span>
      <span></span>
    </div>
  );
};
export default TopBar;
