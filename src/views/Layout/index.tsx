import TabBar from '@/components/tabBar';
import { tabBar } from './constants';
import { useGuard } from './guard';
import './layout.css';
import '../../assets/font/iconfont.css';
interface Props {
  children?: React.ReactNode;
}

export const LayoutIndex: React.FC<Props> = ({ children }) => {
  useGuard();
  return (
    <>
      {children}
      <TabBar tabBarItem={tabBar}></TabBar>
    </>
  );
};

export default LayoutIndex;
