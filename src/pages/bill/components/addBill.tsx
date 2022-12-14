import Auxiliary from '@/components/auxi';
import { AddOutline } from 'antd-mobile-icons';
import { useCallback, useState, useEffect } from 'react';
import { Popup, NumberKeyboard, Button, Input, Divider, TextArea, JumboTab, Toast } from '@/components/antd-mobile/index';
import PopupButton from '@/components/popupButton/index';
import '@/assets/scss/bill/addBill.scss';
import { getDictMap } from '@/api';
import type { dictMap } from '@/types/types';
import { addBill } from '@/api/bill';
// 添加字典缓存项
const AddBillModal = ({ refreshContainer }: { refreshContainer: () => void }) => {
  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [active, setActive] = useState<string>('expenditure');
  const [capitalFlows, setCapitalFlows] = useState<dictMap[]>([]);
  const [num, setNum] = useState('0');
  const [isShowTextArea, setShowTextArea] = useState(false);
  const [consumption, setConsumption] = useState<dictMap[]>([]);
  const [capitalFlowsActive, setCapitalFlowsActive] = useState('');
  const [remark, setRemark] = useState('');

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

  const handleSetShowTextArea = useCallback(() => {
    setShowTextArea((state) => !state);
  }, []);

  const handleChangeActive = useCallback((type) => {
    setActive(() => type);
  }, []);

  const handleCapitalFlowsActive = useCallback((data) => {
    setCapitalFlowsActive(() => data);
  }, []);

  const toggleVisible = useCallback(() => {
    setVisible((state) => !state);
  }, []);
  const handleSetDate = useCallback((date) => {
    setDate(() => date);
  }, []);

  const handleRemarkChange = useCallback((value: string) => {
    setRemark(value);
  }, []);

  const clearFormData = useCallback(() => {
    setNum(() => '0');
    setActive(() => consumption[0].dictValue);
    setCapitalFlowsActive(() => '0');
    setRemark('');
    setDate(new Date().toISOString().split('T')[0]);
  }, [consumption]);
  const handleSubmit = useCallback(() => {
    if (num == '0' || !num) {
      Toast.show('请输入具体金额');
      return;
    }
    addBill({
      amount: num,
      consumptionType: active,
      date,
      remark,
      consumption: capitalFlowsActive,
    }).then(() => {
      toggleVisible();
      clearFormData();
      refreshContainer();
    });
  }, [num, active, date, remark, capitalFlowsActive, refreshContainer, toggleVisible, clearFormData]);

  useEffect(() => {
    getDictMap(active).then((res) => {
      const { data } = res;
      if (data) {
        setCapitalFlows(() => data);
        setCapitalFlowsActive(() => data[0].dictValue);
      }
    });
  }, [active]);

  useEffect(() => {
    getDictMap('consumptionType').then((res) => {
      const { data } = res;
      if (data) {
        setConsumption(() => data);
      }
    });
  }, []);

  return (
    <>
      <Auxiliary icon={AddOutline} callback={toggleVisible} />
      <Popup showCloseButton visible={visible} onMaskClick={toggleVisible} bodyStyle={{ height: '60vh' }}>
        <section className="add-bill-operation">
          <div>
            {consumption.map((val) => {
              return (
                <Button key={val.id} onClick={() => handleChangeActive(val.dictValue)} color={active === val.dictValue ? 'primary' : 'default'}>
                  {val.dictName}
                </Button>
              );
            })}
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
        <JumboTab activeKey={capitalFlowsActive} onChange={handleCapitalFlowsActive}>
          {capitalFlows.map((val) => {
            return <JumboTab.Tab key={val.dictValue} title={<i className={val.remark}></i>} description={<span>{val.dictName}</span>} />;
          })}
        </JumboTab>
        <div className="add-bill-remark">
          {isShowTextArea ? (
            <TextArea value={remark} onChange={handleRemarkChange} placeholder="请输入备注"></TextArea>
          ) : (
            <a onClick={handleSetShowTextArea}>添加备注</a>
          )}
        </div>
      </Popup>
      <NumberKeyboard
        visible={visible}
        onClose={toggleVisible}
        onInput={handleInput}
        onDelete={handleDelete}
        customKey={'.'}
        closeOnConfirm={false}
        onConfirm={handleSubmit}
        showCloseButton={false}
        confirmText="确定"
      />
    </>
  );
};

export default AddBillModal;
