export enum INQUIRY_TYPE {
  BASIC = 'basic',
  FANCY = 'fancy',
}

export type InquiryTypeKeys = keyof typeof INQUIRY_TYPE;

export interface IInquiryTypeRepo {
  getType: () => INQUIRY_TYPE;
  isType: (name: InquiryTypeKeys) => boolean;
}
