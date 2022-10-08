import HomeTitle from '../../assets/img/home-title.png';
import styled from 'styled-components';
const Title = styled.div`
  width: 100%;
`;
const Image = styled.img`
  width: 100%;
  object-fit: contain;
  opacity: 0.4;
  mask: ;
`;
export default () => {
  return (
    <Title>
      <Image src={HomeTitle} />
    </Title>
  );
};
