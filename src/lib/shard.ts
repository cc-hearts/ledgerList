export const _toString = Object.prototype.toString;
export const commonStr = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
export const noop = () => {
  /* */
};
export function clearObjectData<T extends Record<string, unknown>>(data: T): T {
  const keys = Object.keys(data);
  const newData = Object.assign({}, data);
  keys.forEach((key) => {
    switch (_toString.call(newData[key])) {
      case '[object Object]':
        clearObjectData(newData[key] as Record<string, unknown>);
        break;
      case '[object Array]':
        Reflect.set(newData, key, []);
        break;
      case '[object String]':
        Reflect.set(newData, key, '');
        break;
      case '[object Number]':
        Reflect.set(newData, key, 0);
        break;
      case '[object Boolean]':
        Reflect.set(newData, key, false);
        break;
      case '[object Map]':
        (newData[key] as Map<unknown, unknown>).clear();
        break;
      case '[object Set]':
        (newData[key] as Set<unknown>).clear();
        break;
    }
  });
  return newData;
}

export function geneVerification(num = 4) {
  let ans = '';
  for (let i = 0; i < num; i++) {
    ans += commonStr.charAt(~~(Math.random() * commonStr.length));
  }
  return ans;
}
