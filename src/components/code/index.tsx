/**
 * @author heart
 * @description 解析 html 标签
 * @Date 2022-03-20
 */
import React, { JSXElementConstructor } from 'react';
import Animation from '../animation/index';
interface props {}
interface context {
  val: string | Array<context>;
  tag?: string | JSXElementConstructor<any>;
  attribute?: Record<string, string>;
  children?: context | context[];
}
function tag(content: context): string {
  const { tag: tags, attribute, val } = content;
  if (tags) {
    return `<${tags}${
      attribute
        ? Object.keys(attribute)
            .map((key) => {
              return ` ${key}="${attribute[key]}"`;
            })
            .join(';')
        : ''
    }>\n ${
      val
        ? (val instanceof Array
            ? val
                .map((x) => {
                  if (typeof x === 'string') {
                    return x;
                  } else {
                    return tag(x);
                  }
                })
                .join('')
            : typeof val === 'string'
            ? val
            : tag(val)) + '\n'
        : ''
    }</${tags}>\n`;
  }
  if (val instanceof Array) {
    return val
      .map((x) => {
        tag(x);
      })
      .join('');
  } else if (typeof val === 'string') {
    return val ? val + '\n' : '';
  }
  return '';
}
function factoryTag(content: context | context[]): string {
  if (content instanceof Array) {
    return content
      .map((x) => {
        return factoryTag(x);
      })
      .join(' ');
  } else {
    return tag(content);
  }
}
function formatJsx(val: React.ReactNode): context {
  const obj: context = {
    val: '',
  };
  if (typeof val === 'string' || typeof val === 'number' || !val || val === true) {
    obj.val = String(val) || '';
    return obj;
  }
  if (val === {}) {
    return obj;
  }
  if ('type' in val) {
    obj.tag = val.type;
  }
  if ('props' in val && Object.getOwnPropertyNames(val.props).length > 0) {
    const attribute: Record<string, string> = {};
    Object.keys(val.props).forEach((key: string) => {
      if (key === 'children') {
        if (val.props.children instanceof Array) {
          const tempArray = val.props.children.filter((v: unknown) => {
            if (typeof v === 'string') {
              obj.val = val.props.children;
              return false;
            }
            return true;
          });
          obj.children = formatReactNode(tempArray);
        } else if (typeof val.props.children === 'string') {
          obj.val = val.props.children;
        }
      } else {
        if (key === 'className') {
          attribute['class'] = val.props[key];
        } else if (key === 'style') {
          attribute[key] = Object.keys(val.props[key])
            .map((kv) => `${kv}:${val.props[key][kv]}`)
            .join(';');
        } else attribute[key] = val.props[key];
      }
    });
    obj.attribute = attribute;
  }
  return obj;
}
function formatReactNode(node: React.ReactNode): context | context[] {
  if (node instanceof Array) {
    return node.map((val) => {
      return formatJsx(val);
    });
  } else if (typeof node === 'string') {
    const obj: context = {
      val: node,
    };
    return obj;
  } else {
    return formatJsx(node);
  }
}
const Code: React.FC<props> = function (props) {
  return (
    <>
      <pre>
        <Animation content={factoryTag(formatReactNode(props.children))} />
      </pre>
    </>
  );
};

export default Code;
