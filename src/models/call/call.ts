// Укороченный Call, чтобы не передавать лишние данные в таблицу
export type Call = Pick<
  RawCall,
  | "id"
  | "in_out"
  | "date"
  | "from_number"
  | "source"
  | "status"
  | "time"
  | "person_avatar"
  | "person_name"
  | "person_surname"
  | "errors"
  | "partner_data"
  | "record"
  | "partnership_id"
>;

// Полный тип звонка
export interface RawCall {
  id: number;
  partnership_id: string;
  partner_data: PartnerData;
  date: string;
  date_notime: string;
  time: number;
  from_number: string;
  from_extension: string;
  to_number: string;
  to_extension: string;
  is_skilla: number;
  status: string;
  record: string;
  line_number: string;
  line_name: string;
  in_out: 0 | 1;
  from_site: number;
  source?: string;
  errors: string[];
  disconnect_reason?: string;
  results: CallResult[];
  stages: CallStage[];
  abuse: string[];
  contact_name?: string;
  contact_company?: string;
  person_id: number;
  person_name?: string;
  person_surname?: string;
  person_avatar?: string;
  candidate_id: number;
  candidate_name?: string;
  candidate_link?: string;
  candidate_vacancy_name?: string;
}

// Тип данных партнера
export interface PartnerData {
  id: string;
  name: string;
  phone: string;
}

// Тип этапов звонка
export interface CallStage {
  person_name: string;
  person_surname: string;
  person_mango_phone: string;
  duration: string;
  disconnect_reason: string;
}

// Тип результатов
export interface CallResult {
  type: string;
  title: string;
  tooltip: string;
}
