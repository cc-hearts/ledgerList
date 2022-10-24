import { useState } from 'react';

function useCounter(initialValue = 0) {
  const [current, setCurrent] = useState(initialValue);

  const add = (number = 1) => setCurrent((v) => v + number);
  const dec = (number = 1) => setCurrent((v) => v - number);
  const set = (number = 1) => setCurrent(number);

  return [
    current,
    {
      add,
      dec,
      set,
    },
  ] as const;
}

export default useCounter;
