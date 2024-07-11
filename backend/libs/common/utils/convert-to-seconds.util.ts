
// Функція convertToSecondsUtil перетворює рядок, що представляє час у різних одиницях (секунди, хвилини, години, дні, місяці, роки), у кількість секунд.
export function convertToSecondsUtil(timeStr: string) {
  if (!isNaN(timeStr as any)) {
    return parseInt(timeStr);
  }

  let multiplier;

  switch (timeStr[timeStr.length - 1]) {
    case 's':
      multiplier = 1;
      break;
    case 'm':
      multiplier = 60;
      break;
    case 'h':
      multiplier = 60 * 60;
      break;
    case 'd':
      multiplier = 24 * 60 * 60;
      break;
    case 'M':
      multiplier = 30 * 24 * 60 * 60;
      break;
    case 'y':
      multiplier = 365 * 24 * 60 * 60;
      break;
    default:
      throw new Error('Invalid time string');
  }

  const num = parseInt(timeStr.slice(0, -1));

  return num * multiplier;
}
