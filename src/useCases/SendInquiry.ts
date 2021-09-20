import { Service } from 'typedi';

import Api from 'api/Api';
import { InquiryBody } from 'api/types';

import { UseCase } from './interface';

@Service()
export class SendInquiry implements UseCase<Promise<any>> {
  public async execute(payload: InquiryBody) {
    try {
      return Api.sendInquiry(payload);
    } catch (error) {
      throw new Error(error);
    }
  }
}
