import React from 'react';
import styled from 'styled-components';

const AvatarComponent = styled.div`
  width: 4rem;
  height: 4rem;
  color: #fff;
  background-color: #617ee0;
  padding: 0;

  span {
    display: flex;
    height: 100%;
    text-transform: uppercase;
    font-size: 2rem;
    justify-content: center;
    align-items: center;
  }
`;
interface Props {
  src?: string;
  sign: string;
}
const Avatar: React.FC<Props> = ({ src, sign }) => {
  if (!sign) return <></>;
  const avatar = sign.slice(0, 1);
  return <AvatarComponent>{src ? <img src={src} alt="avatar" /> : <span>{avatar}</span>}</AvatarComponent>;
};

export default Avatar;
