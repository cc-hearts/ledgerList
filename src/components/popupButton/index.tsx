import { DatePicker, Popup } from '@/components/antd-mobile/index';
import { memo, useCallback, useState } from 'react';
import { DownOutline } from 'antd-mobile-icons';
import '@/assets/scss/components/popupButton.scss';
import { noop } from '@/lib/shard';
const PopupButton = ({
  label,
  changeLabel,
  dateType,
  showCallback = noop,
}: {
  label: string;
  dateType?: 'day' | 'month' | 'year';
  changeLabel: (...args: any[]) => void;
  showCallback?: (...args: any[]) => React.ReactNode;
}) => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = useCallback(() => {
    setVisible((state) => !state);
  }, []);

  const handleChangeDate = useCallback(
    (val) => {
      if (!dateType) return;
      let date;
      switch (dateType) {
        case 'month':
          date = new Date(val).toISOString().split('T')[0].split('-').slice(0, -1).join('-');
          break;
      }
      changeLabel(date);
    },
    [changeLabel, dateType],
  );
  return (
    <>
      <span className="popup-button" onClick={toggleVisible}>
        {label}
        <DownOutline />
      </span>
      {!dateType ? (
        <Popup visible={visible} onMaskClick={toggleVisible}>
          {showCallback({ changeLabel })}
        </Popup>
      ) : (
        <DatePicker visible={visible} onClose={toggleVisible} precision={dateType} onConfirm={handleChangeDate} />
      )}
    </>
  );
};

export default memo(PopupButton);
