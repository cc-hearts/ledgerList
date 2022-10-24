import { useState, useReducer } from 'react';
function greetingReducer(state: initState, action: { type: 'SUCCESS' | 'ERROR' | undefined; greeting?: string; error?: string }) {
  switch (action.type) {
    case 'SUCCESS': {
      return {
        error: null,
        greeting: action.greeting,
      };
    }
    case 'ERROR': {
      return {
        error: action.error,
        greeting: null,
      };
    }
    default: {
      return state;
    }
  }
}
const initialState = {
  error: null,
  greeting: null,
};
type initState = { error?: string | null; greeting?: string | null };
const initArg = () => {
  return { error: null, greeting: 'hello' };
};

export default function Fetch({ url = '' }) {
  const [{ error, greeting }, dispatch] = useReducer(greetingReducer, initialState, initArg);
  const [buttonClicked, setButtonClicked] = useState(false);
  const fetchGreeting = async () => {
    new Promise((resolve, reject) => {
      if (url === '') reject('错误');
      else resolve({ data: { greeting: 1 } });
    })
      .then((response: any) => {
        const { data } = response;
        if (!data) return;
        const { greeting } = data;
        dispatch({ type: 'SUCCESS', greeting });
        setButtonClicked(true);
      })
      .catch((error) => {
        dispatch({ type: 'ERROR', error });
      });
  };

  const buttonText = buttonClicked ? 'Ok' : 'Load Greeting';
  return (
    <div>
      <button onClick={() => fetchGreeting()} disabled={buttonClicked}>
        {buttonText}
      </button>
      {greeting && <h1>{greeting}</h1>}
      {error && <p role="alert">Oops, failed to fetch!</p>}
    </div>
  );
}
