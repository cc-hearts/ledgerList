import styled from 'styled-components';
const Container = styled.div`
  ${(props) => {
    const attr = {};
    const mapKey = 'customer-style';
    if (mapKey in props && props[mapKey]) {
      Object.keys(props[mapKey]).forEach((key) => {
        if (!props[mapKey]) return;
        const data = Reflect.get(props[mapKey], key);
        if (data) {
          Reflect.set(attr, key, data);
        }
      });
    }
    return attr;
  }}
  height: calc(100vh - 4rem);
  width: 100%;
`;

export default Container;
