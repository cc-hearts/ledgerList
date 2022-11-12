import styled from 'styled-components';
interface props {
  children?: React.ReactNode;
}

const CardComponents = styled.div`
  background-color: #fff;
  box-shadow: 0px 0px 5px 1px #0000000f;
  border-radius: var(--radius-1);
`;
const Card: React.FC<props> = function (props) {
  return <CardComponents>{props.children}</CardComponents>;
};

export default Card;
