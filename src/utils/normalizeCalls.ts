import { Call, RawCall } from "../models";

// конвертируем ответ, чтобы использовать только нужные поля
export const normalizeCalls = (callsFromApi: RawCall[]): Call[] => {
  return callsFromApi.map((call) => ({
    id: call.id,
    in_out: call.in_out,
    date: call.date,
    from_number: call.from_number,
    source: call.source || call.line_name || "Неизвестный источник",
    status: call.status,
    time: call.time,
    person_avatar:
      call.person_avatar || "https://lk.skilla.ru/img/noavatar.jpg",
    person_name: call.person_name || "Неизвестный",
    person_surname: call.person_surname || "",
  }));
};
