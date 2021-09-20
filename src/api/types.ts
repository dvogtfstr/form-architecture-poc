export interface InquiryBody {
  pizza_kind: string;
  extras?: { name: string; amount: number }[];
  first_name: string;
  last_name: string;
  phone_number: number;
  address?: string;
  additional_info?: string;
}
