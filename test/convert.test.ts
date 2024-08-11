import { money } from '../src/money';
import { convert } from '../src/convert';
import { USD, EUR, UGX, JFR, rates } from './test-utils';

describe('Convert Money Object', () => {
  test('should convert USD to EUR correctly', () => {
    const amount = money(100, USD);
    const convertedAmount = convert(amount, EUR, rates);

    expect(convertedAmount.getAmount().toNumber()).toBeCloseTo(91.55001012);
    expect(convertedAmount.getCurrency().code).toBe('EUR');
  });

  test('should convert EUR to USD correctly', () => {
    const amount = money(91.55001012, EUR);
    const convertedAmount = convert(amount, USD, rates);

    expect(convertedAmount.getAmount().toNumber()).toBeCloseTo(100);
    expect(convertedAmount.getCurrency().code).toBe('USD');
  });

  test('should throw error if target currency is not available in exchange rates', () => {
    const amount = money(100, USD);

    expect(() => convert(amount, JFR, rates)).toThrowError(
      'Exchange rate for currency JFR not available'
    );
  });

  test('should handle conversion with high precision correctly', () => {
    const amount = money(1, USD);
    const convertedAmount = convert(amount, UGX, rates);

    expect(convertedAmount.getAmount().toNumber()).toBeCloseTo(3724.9405801702);
    expect(convertedAmount.getCurrency().code).toBe('UGX');
  });

  test('should handle converting zero amount correctly', () => {
    const amount = money(0, USD);
    const convertedAmount = convert(amount, EUR, rates);

    expect(convertedAmount.getAmount().toNumber()).toBe(0);
    expect(convertedAmount.getCurrency().code).toBe('EUR');
  });
});
