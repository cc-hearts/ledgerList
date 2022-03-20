/**
 * @author heart
 * @description 解析 html 标签
 * @Date 2022-03-20
 */
import Animation from '../animation/index';
interface props {}
// TODO: content的类型不对 应该改 [{tag: attribute : record}] attribute 的方法应该改为 Record<string | (string | object)>
function factoryTag(tag: string, attribute: Record<string, string>, content: Record<string, string> | string): string {
  return `<${tag} ${Object.keys(attribute).map((key) => {
    return `${key}='${attribute[key]}'`;
  })}>
  ${
    content instanceof Array
      ? Object.keys(content).map((key) => {
          return key; //TODO: 一个方法 进行遍历
        })
      : content
  }
</${tag}>`;
}
function formatReactNode(node: React.ReactNode | React.ReactNode[] | string) {
  if (node instanceof Array) {
  } else if (typeof node === 'string') {
  } else {
  }
}
const Code: React.FC<props> = function (props) {
  console.log(props.children);
  // jsx会去除换行 要对props的children进行预处理
  return (
    <>
      <pre>
        <code>{props.children}</code>
        <Animation content={factoryTag('div', { className: 'name' }, 'content')} />
        {/* {'<span'} */}
        {/* <Animation content={' className = "name" >'} /> */}
        {/* {'</span>'} */}
      </pre>
    </>
  );
};

export default Code;
