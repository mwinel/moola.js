import { money } from '../src/money';
import { toSnapshot } from '../src/to-snapshot';
import { fromSnapshot } from '../src/from-snapshot';
import { USD, UGX } from './test-utils';

describe('From Snapshot', () => {
  test('should convert snapshot back to money object', () => {
    const amount = money(24.99, USD);
    const snapshot = toSnapshot(amount);
    const moneyObject = fromSnapshot(snapshot);

    expect(moneyObject.getAmount().toNumber()).toEqual(24.99);
    expect(moneyObject.getAmount().toNumber()).not.toBe(2499);
    expect(moneyObject.getAmount()).toEqual(amount.getAmount());
  });

  test('should convert snapshot with precision 0 to money object', () => {
    const amount = money(20000, UGX);
    const snapshot = toSnapshot(amount);
    const moneyObject = fromSnapshot(snapshot);

    expect(moneyObject.getAmount().toNumber()).toEqual(20000);
    expect(moneyObject.getAmount().toNumber()).not.toBe(2000000);
    expect(moneyObject.getAmount()).toEqual(amount.getAmount());
  });
});
