import React, { useState } from 'react';
import './assets/style/style.css';
import { ConfigProvider } from 'antd';
import enUS from 'antd/lib/locale/en_US';
import zhCN from 'antd/lib/locale/zh_CN';
import { useTranslation } from 'react-i18next';
import type { TFunction } from 'react-i18next';
import { LANGUAGE } from './i18n/index';
interface props {}
interface language {
  (): void;
}

export const MyContext = React.createContext<language | null>(null); // 创建一个context

export const IContext = React.createContext<TFunction<'translation', undefined>>(() => {});

const App: React.FC<props> = function (props) {
  const [locate, setLocate] = useState(enUS);
  const { t, i18n } = useTranslation();

  return (
    <ConfigProvider locale={locate}>
      <MyContext.Provider
        value={() => {
          if (locate.locale === 'zh-cn') {
            setLocate(enUS);
            i18n.changeLanguage(LANGUAGE.enUS);
          } else {
            setLocate(zhCN);
            i18n.changeLanguage(LANGUAGE.zhCN);
          }
        }}
      >
        <IContext.Provider value={t}>{props.children}</IContext.Provider>
      </MyContext.Provider>
    </ConfigProvider>
  );
};

export default App;
