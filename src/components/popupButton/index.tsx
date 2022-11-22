import { Popup } from '@/components/antd-mobile/index';
import { useCallback, useState } from 'react';
import { DownOutline } from 'antd-mobile-icons';
import '@/assets/scss/components/popupButton.scss';
const PopupButton = ({ label, showCallback }: { label: string; showCallback: () => React.ReactNode }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = useCallback(() => {
    setVisible((state) => !state);
  }, []);
  return (
    <>
      <span className="popup-button" onClick={toggleVisible}>
        {label}
        <DownOutline />
      </span>
      <Popup visible={visible} onMaskClick={toggleVisible}>
        {showCallback()}
      </Popup>
    </>
  );
};

export default PopupButton;
