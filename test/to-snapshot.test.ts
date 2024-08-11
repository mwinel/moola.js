import { money } from '../src/money';
import { toSnapshot } from '../src/to-snapshot';
import { USD, UGX } from './test-utils';

describe('Money Snapshot', () => {
  test('should convert money object to a db snapshot', () => {
    const amount = money(24.99, USD);
    const snapshot = toSnapshot(amount);

    expect(snapshot.amount).toEqual(24.99);
    expect(snapshot.currency).toEqual('USD');
    expect(snapshot.precision).toEqual(2);
  });

  test('should convert money object with no sub units to a db snapshot', () => {
    const amount = money(20000, UGX);
    const snapshot = toSnapshot(amount);

    expect(snapshot.amount).toEqual(20000);
    expect(snapshot.currency).toEqual('UGX');
    expect(snapshot.precision).toEqual(0);
  });
});
