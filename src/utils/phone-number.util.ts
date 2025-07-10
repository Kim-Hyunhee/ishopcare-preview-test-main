import { BadRequestException } from '@nestjs/common';

export function validatePhoneNumber(phone: string): void {
  if (!phone) throw new BadRequestException('전화번호를 입력해주세요');

  if (!/^\d{10,11}$/.test(phone.replace(/-/g, '')))
    throw new BadRequestException('전화번호는 숫자 10~11자리여야 합니다');

  if (!/^010/.test(phone.replace(/-/g, '')))
    throw new BadRequestException('전화번호는 010으로 시작해야 합니다');

  if (!/^010-?\d{3,4}-?\d{4}$/.test(phone))
    throw new BadRequestException(
      '전화번호 형식이 잘못되었습니다 (예: 010-1234-5678)',
    );
}
