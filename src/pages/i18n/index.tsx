/**
 * @author heart
 * @description 测试i18n
 * @Date 2022-04-06
 */
import { DatePicker, Button } from 'antd';
import { useContext } from 'react';
import { MyContext, IContext } from '../../main';
interface props {}
const testI18n: React.FC<props> = function (props) {
  const value = useContext(MyContext);
  const t = useContext(IContext);
  return (
    <>
      <DatePicker />
      <Button
        onClick={() => {
          if (value) {
            value();
          }
        }}
      >
        切换语言
      </Button>
      <div>{t('welcome')}</div>
    </>
  );
};
export default testI18n;
