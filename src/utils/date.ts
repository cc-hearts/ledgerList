function getISOTime(date?: string | Date) {
  let newDate: Date;
  if (date === void 0) {
    newDate = new Date();
    newDate.setHours(newDate.getHours() + 8);
  } else {
    newDate = new Date(date);
  }
  return newDate.toISOString();
}

export function getCurrentMonth(): string {
  return getISOTime().split('T')[0].split('-').slice(0, -1).join('-');
}
