import TabBar from '@/components/tabBar';
import { useEffect } from 'react';
import { tabBar } from './constants';
interface Props {
  children?: React.ReactNode;
}
function disabledScroll(e: TouchEvent) {
  e.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果)
}
export const LayoutIndex: React.FC<Props> = ({ children }) => {
  useEffect(() => {
    document.body.addEventListener('touchmove', disabledScroll, { passive: false }); //passive 参数不能省略，用来兼容ios和android
    return () => {
      document.body.removeEventListener('touchmove', disabledScroll);
    };
  }, []);
  return (
    <>
      {children}
      <TabBar tabBarItem={tabBar}></TabBar>
    </>
  );
};

export default LayoutIndex;
