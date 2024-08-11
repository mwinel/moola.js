import { money } from '../src/money';
import { round } from '../src/round';
import {
  ROUND_DOWN,
  ROUND_UP,
  ROUND_HALF_UP,
  ROUND_HALF_DOWN,
  ROUND_HALF_EVEN,
} from '../src/utils/rounding-modes';
import { USD } from './test-utils';

describe('Round Amount', () => {
  test('should round amount by default mode', () => {
    const amount = money(24.9945, USD);
    const roundedAmount = round(amount);

    expect(roundedAmount.getAmount().toNumber()).toEqual(24.99);
  });

  test('should round amount up', () => {
    const amount = money(24.9945, USD);
    const roundedAmount = round(amount, ROUND_UP);

    expect(roundedAmount.getAmount().toNumber()).toBe(25);
  });

  test('should round amount down', () => {
    const amount = money(24.9945, USD);
    const roundedAmount = round(amount, ROUND_DOWN);

    expect(roundedAmount.getAmount().toNumber()).toBe(24.99);
  });

  test('should round to the nearest neighbor, rounding up if equidistant', () => {
    const amount = money(24.9945, USD);
    const roundedAmount = round(amount, ROUND_HALF_UP);

    expect(roundedAmount.getAmount().toNumber()).toBe(24.99);
  });

  test('should round to the nearest neighbor, rounding down if equidistant', () => {
    const amount = money(24.995, USD);
    const roundedAmount = round(amount, ROUND_HALF_DOWN);

    expect(roundedAmount.getAmount().toNumber()).toBe(24.99);
  });

  test('should round to the nearest neighbor, rounding to the nearest even number if equidistant', () => {
    const amount1 = money(24.995, USD);

    const roundedAmount1 = round(amount1, ROUND_HALF_EVEN);
    expect(roundedAmount1.getAmount().toNumber()).toBe(25);

    const amount2 = money(24.985, USD);
    const roundedAmount2 = round(amount2, ROUND_HALF_EVEN);
    expect(roundedAmount2.getAmount().toNumber()).toBe(24.98);
  });

  test('should handle amounts exactly at the precision boundary', () => {
    const amount = money(24.999, USD);
    const roundedAmount = round(amount, ROUND_HALF_UP);

    expect(roundedAmount.getAmount().toNumber()).toBe(25);
  });

  test('should handle zero amounts', () => {
    const amount = money(0.0, USD);
    const roundedAmount = round(amount, ROUND_HALF_UP);

    expect(roundedAmount.getAmount().toNumber()).toBe(0);
  });

  test('should handle large numbers', () => {
    const amount = money(1234567.891, USD);
    const roundedAmount = round(amount, ROUND_HALF_UP);

    expect(roundedAmount.getAmount().toNumber()).toBe(1234567.89);
  });

  test('should handles very small numbers', () => {
    const amount = money(0.0000001, USD);
    const roundedAmount = round(amount, ROUND_HALF_UP);

    expect(roundedAmount.getAmount().toNumber()).toBe(0);
  });
});
