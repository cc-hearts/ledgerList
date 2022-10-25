import TabBar from '@/components/tabBar';
import { useCallback, useEffect } from 'react';
import { tabBar } from './constants';
import { useGuard } from './guard';
interface Props {
  children?: React.ReactNode;
}

export const LayoutIndex: React.FC<Props> = ({ children }) => {
  const disabledScroll = useCallback((e: TouchEvent) => {
    e.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果)
  }, []);

  useGuard();
  useEffect(() => {
    document.body.addEventListener('touchmove', disabledScroll, { passive: false }); //passive 参数不能省略，用来兼容ios和android
    return () => {
      document.body.removeEventListener('touchmove', disabledScroll);
    };
  }, [disabledScroll]);
  return (
    <>
      {children}
      <TabBar tabBarItem={tabBar}></TabBar>
    </>
  );
};

export default LayoutIndex;
