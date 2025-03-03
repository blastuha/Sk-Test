// форматируем из "74951205096" в "+7 (495) 120-50-96"

export const formatPhoneNumber = (phone: string): string => {
  // Проверяем, что длина 11 и начинается с '7'
  if (phone.length === 11 && phone.startsWith("7")) {
    return `+7 (${phone.slice(1, 4)}) ${phone.slice(4, 7)}-${phone.slice(
      7,
      9
    )}-${phone.slice(9, 11)}`;
  }

  return phone;
};
