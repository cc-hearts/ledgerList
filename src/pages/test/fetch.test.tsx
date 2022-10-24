import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Fetch from './fetch';
import '@testing-library/jest-dom';
test('load and display greeting', async () => {
  render(<Fetch url="as" />);
  // 点击了事件
  await userEvent.click(screen.getByText('Load Greeting'));
  //
  expect(screen.getByRole('heading')).toHaveTextContent('1');
  expect(screen.getByRole('button')).toBeDisabled();
});
