import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class BizStatusService {
  constructor(private readonly httpService: HttpService) {}

  async getTaxpayerStatus(businessNumber: string): Promise<string | null> {
    const SERVICE_KEY = process.env.BIZ_STATUS_API_KEY;
    const url = 'https://api.odcloud.kr/api/nts-businessman/v1/status';

    try {
      const response = await this.httpService.axiosRef.post(
        url + `?serviceKey=${SERVICE_KEY}`,
        { b_no: [businessNumber] },
        { headers: { 'Content-Type': 'application/json' } },
      );

      const status = response.data?.data?.[0]?.b_stt as string;

      return status || null;
    } catch (error) {
      console.error('[API ERROR] 사업자 상태 조회 실패', error);
      return null;
    }
  }

/**
 * 여러 사업자번호의 납세자 상태를 조회
 * @param businessNumbers 최대 100개의 사업자등록번호
 * @returns Map<사업자번호, 납세자상태>
 */
  async getBulkTaxpayerStatus(
    businessNumbers: string[],
  ): Promise<Map<string, string>> {
    const SERVICE_KEY = process.env.BIZ_STATUS_API_KEY;
    const url = 'https://api.odcloud.kr/api/nts-businessman/v1/status';

    if (businessNumbers.length === 0) {
      return new Map();
    }

    try {
      const response = await this.httpService.axiosRef.post(
        url + `?serviceKey=${SERVICE_KEY}`,
        { b_no: businessNumbers },
        { headers: { 'Content-Type': 'application/json' } },
      );

      const data = response.data?.data as Array<{
        b_no: string; // 사업자등록번호
        b_stt: string; // 납세자 상태
      }>;

      const result = new Map<string, string>();

      for (const item of data) {
        if (item.b_no && item.b_stt) {
          result.set(item.b_no, item.b_stt); // 예: '1234567890' → '계속사업자'
        }
      }

      return result;
    } catch (e) {
      console.error('[API ERROR] 사업자 상태 조회 실패', e);
      return new Map();
    }
  }
}
