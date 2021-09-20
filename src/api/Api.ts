import { InquiryBody } from './types';

declare function fakeFetch(config: any): Promise<any>;

class Api {
  private baseUrl: string = 'https://example.com';

  async sendInquiry(payload: InquiryBody) {
    const config = {
      url: this.baseUrl + '/inquiry',
      method: 'POST',
      body: payload,
    };
    console.log('Sent with payload: ', payload);
    return fakeFetch(config);
  }
}

export default new Api();
