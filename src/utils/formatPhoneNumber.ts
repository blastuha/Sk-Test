// Форматируем телефон из 749**75** в +7 (49*) *75-**-**

export function formatPhoneNumber(phone: string): string {
  const raw = phone.replace(/[^0-9*]/g, "");

  if (!raw.startsWith("7")) {
    return phone;
  }

  const rest = raw.slice(1);

  // куски по макету: (3)-(3)-(2)-(2)
  const area = rest.slice(0, 3);
  const prefix = rest.slice(3, 6);
  const block1 = rest.slice(6, 8);
  const block2 = rest.slice(8, 10);

  return `+7 (${area}) ${prefix}-${block1}-${block2}`;
}
