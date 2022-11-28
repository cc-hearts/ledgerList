import Auxiliary from '@/components/auxi';
import { AddOutline } from 'antd-mobile-icons';
import { useCallback, useState } from 'react';
import { Popup, NumberKeyboard, Button, Input, Divider, TextArea } from '@/components/antd-mobile/index';
import PopupButton from '@/components/popupButton/index';
import '@/assets/scss/bill/addBill.scss';
const AddBillModal = () => {
  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const toggleVisible = useCallback(() => {
    setVisible((state) => !state);
  }, []);
  const handleSetDate = useCallback((date) => {
    setDate(() => date);
  }, []);
  const [active, setActive] = useState<'income' | 'expenditure'>('expenditure');
  const [num, setNum] = useState('0');
  const handleChangeActive = useCallback((type) => {
    setActive(() => type);
  }, []);
  const handleInput = useCallback((data) => {
    setNum((num) => {
      if (num == '0') {
        return data + '';
      }
      return String(num) + data;
    });
  }, []);
  const handleDelete = useCallback(() => {
    setNum((data) => {
      const newData = data.slice(0, -1);
      return newData === '' ? '0' : newData;
    });
  }, []);

  const [isShowTextArea, setShowTextArea] = useState(false);

  const handleSetShowTextArea = useCallback(() => {
    setShowTextArea((state) => !state);
  }, []);
  return (
    <>
      <Auxiliary icon={AddOutline} callback={toggleVisible} />
      <Popup showCloseButton visible={visible} onMaskClick={toggleVisible} bodyStyle={{ height: '50vh' }}>
        <section className="add-bill-operation">
          <div>
            <Button onClick={() => handleChangeActive('expenditure')} color={active === 'expenditure' ? 'primary' : 'default'}>
              支出
            </Button>
            <Button onClick={() => handleChangeActive('income')} color={active === 'income' ? 'primary' : 'default'}>
              收入
            </Button>
          </div>
          <div>
            <PopupButton changeLabel={handleSetDate} dateType="day" label={date} />
          </div>
        </section>

        <div className="add-bill-money">
          <span>¥</span>
          <Input readOnly value={String(num)} />
        </div>
        <Divider />
        <div className="add-bill-remark">
          {isShowTextArea ? <TextArea placeholder="请输入备注"></TextArea> : <a onClick={handleSetShowTextArea}>添加备注</a>}
        </div>
      </Popup>
      <NumberKeyboard
        visible={visible}
        onClose={toggleVisible}
        onInput={handleInput}
        onDelete={handleDelete}
        customKey={'.'}
        showCloseButton={false}
        confirmText="确定"
      />
    </>
  );
};

export default AddBillModal;
