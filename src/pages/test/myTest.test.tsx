import { renderHook, act } from '@testing-library/react-hooks';
import useCounter from './myTest';
describe('useCounter 测试', () => {
  it('数字加1', async () => {
    const { result } = renderHook(() => useCounter(7));
    expect(result.current[0]).toEqual(7);

    act(() => {
      result.current[1].add();
    });
    expect(result.current[0]).toEqual(8);
  });
});
