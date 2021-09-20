import { Service } from 'typedi';
import { IInquiryTypeRepo, InquiryTypeKeys, INQUIRY_TYPE } from './interface';

@Service()
export class InquiryTypeRepo implements IInquiryTypeRepo {
  inquiryType: INQUIRY_TYPE;
  constructor() {
    // Some logic to get inquiry type
    // this.inquiryType = INQUIRY_TYPE.BASIC;
    this.inquiryType = INQUIRY_TYPE.FANCY;
  }

  public getType() {
    return this.inquiryType;
  }

  public isType(name: InquiryTypeKeys) {
    return this.inquiryType === INQUIRY_TYPE[name];
  }
}
