import { Button } from '@/components/antd-mobile/index';
import { noop } from '@/lib/shard';
import { useCallback, useState } from 'react';
import styled from 'styled-components';
const ButtonWrapper = styled.div`
  width: 100%;
  padding: 0 2rem;
  margin: 1rem 0;
`;

export default ({ text = '', callback = noop }) => {
  const [disabled, setDisabled] = useState(false);
  const handleSubmit = useCallback(async () => {
    try {
      setDisabled(true);
      await callback();
      setDisabled(false);
    } catch (e) {
      console.error(e);
      setDisabled(false);
    }
  }, [callback]);
  return (
    <ButtonWrapper>
      <Button block color="primary" fill="solid" onClick={handleSubmit} loading={disabled}>
        {text}
      </Button>
    </ButtonWrapper>
  );
};
