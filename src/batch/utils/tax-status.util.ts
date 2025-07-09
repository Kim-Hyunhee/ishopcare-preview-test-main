import axios from 'axios';

export async function getTaxpayerStatus( businessNumber: string ): Promise<string | null> {
  const SERVICE_KEY = process.env.BIZ_STATUS_API_KEY;
  const url = 'https://api.odcloud.kr/api/nts-businessman/v1/status';

  const body = {
    b_no: [businessNumber],
  };

  try {
    const response = await axios.post(url + `?serviceKey=${SERVICE_KEY}`, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = response.data?.data?.[0];
    return data?.b_stt || null;
  } catch (e) {
    console.error(`[API ERROR] 사업자 상태 조회 실패`, e);
    return null;
  }
}
