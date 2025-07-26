export const getTodayDate = (): string => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export const getFullDateTime = () => {
  return new Date().toISOString(); // ex: '2025-07-20T23:45:13.123Z'
};