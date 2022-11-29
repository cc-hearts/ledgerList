import Header from './components/header';
import BillContainer from './components/BillContainer';
import AddBillModal from './components/addBill';
import { useCallback, useRef } from 'react';
const Bill = () => {
  const handleRef = useRef<{ initGetData: (...args: any[]) => void }>(null);
  const refreshContainer = useCallback(() => {
    handleRef.current?.initGetData();
  }, []);
  return (
    <>
      <Header />
      <BillContainer handleRef={handleRef} />
      <AddBillModal refreshContainer={refreshContainer} />
    </>
  );
};

export default Bill;
