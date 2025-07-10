import { validatePhoneNumber } from 'src/utils/phone-number.util';

describe('validatePhoneNumber', () => {
  // ✅ 유효한 케이스들
  const validCases = [
    '01012345678',
    '010-1234-5678',
    '010-123-4567',
    '010-0000-0000', // 숫자 형식상은 유효
  ];

  validCases.forEach((number) => {
    it(`should pass for valid phone number: ${number}`, () => {
      expect(() => validatePhoneNumber(number)).not.toThrow();
    });
  });

  // ❌ 010으로 시작하지 않음
  it('should throw if not starting with 010', () => {
    expect(() => validatePhoneNumber('011-1234-5678')).toThrow(
      '전화번호는 010으로 시작해야 합니다',
    );
  });

  // ❌ 자리수 부족
  it('should throw if too short', () => {
    expect(() => validatePhoneNumber('010-12-5678')).toThrow(
      '전화번호는 숫자 10~11자리여야 합니다',
    );
  });

  // ❌ 문자 포함
  it('should throw if contains characters', () => {
    expect(() => validatePhoneNumber('010-12a4-5678')).toThrow(
      '전화번호는 숫자 10~11자리여야 합니다',
    );
  });

  // ❌ 공백만 있음
  it('should throw if empty', () => {
    expect(() => validatePhoneNumber('')).toThrow('전화번호를 입력해주세요');
    expect(() => validatePhoneNumber('   ')).toThrow('전화번호를 입력해주세요');
  });

  // ❌ 하이픈 너무 많음
  it('should throw if format is weird', () => {
    expect(() => validatePhoneNumber('010--1234--5678')).toThrow(
      '전화번호 형식이 잘못되었습니다',
    );
  });

  // ❌ 너무 김
  it('should throw if too long', () => {
    expect(() => validatePhoneNumber('010123456789')).toThrow(
      '전화번호는 숫자 10~11자리여야 합니다',
    );
  });

  // ❌ 특수문자 포함
  it('should throw if includes special chars', () => {
    expect(() => validatePhoneNumber('010@1234#5678')).toThrow(
      '전화번호는 숫자 10~11자리여야 합니다',
    );
  });
});
