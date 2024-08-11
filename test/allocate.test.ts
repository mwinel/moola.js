import { money } from '../src/money';
import { allocate } from '../src/allocate';
import { USD } from './test-utils';

describe('Allocate Money', () => {
  test('should allocate money correctly with simple ratios', () => {
    const amount = money(100, USD);
    const allocations = allocate(amount, [1, 3]);

    expect(allocations.map(a => a.getAmount().toNumber())).toEqual([25, 75]);
  });

  test('should allocate money correctly with percentage ratios', () => {
    const amount = money(1003, USD);
    const allocations = allocate(amount, [50, 50]);

    expect(allocations.map(a => a.getAmount().toNumber())).toEqual([502, 501]);
  });

  test('should allocate money correctly with zero ratios', () => {
    const amount = money(1003, USD);
    const allocations = allocate(amount, [0, 50, 50]);

    expect(allocations.map(a => a.getAmount().toNumber())).toEqual([
      0,
      502,
      501,
    ]);
  });

  test('should throw error if all ratios are zero', () => {
    const amount = money(100, USD);

    expect(() => allocate(amount, [0, 0])).toThrowError(
      'At least one ratio must be positive.'
    );
  });

  test('should distribute remainder as evenly as possible', () => {
    const amount = money(1005, USD);
    const allocations = allocate(amount, [1, 1, 1]);

    expect(allocations.map(a => a.getAmount().toNumber())).toEqual([
      335,
      335,
      335,
    ]);
  });
});
