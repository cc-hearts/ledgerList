import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en_US from './en-Us';
import zh_CN from './zh-CN';
export enum LANGUAGE {
  'enUS' = 'en-US',
  'zhCN' = 'zh-CN',
}
i18n.use(initReactI18next).init({
  resources: {
    'en-US': en_US,
    'zh-CN': zh_CN,
  },
  fallbackLng: 'en-US', // 如果当前切换的语言没有对应的翻译则是当前使用的这个语言
  //  lng: 'zh-TW',             //预定义语言
  interpolation: {
    escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
  },
});
