import { apiClient } from "./axiosInstance";

export async function getCallRecord(record: string, partnershipId: string) {
  const formData = new URLSearchParams();
  formData.append("record", record);
  formData.append("partnership_id", partnershipId);

  const response = await apiClient.post<Blob>("/getRecord", formData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer testtoken`,
    },
    responseType: "blob",
  });

  return response.data;
}
