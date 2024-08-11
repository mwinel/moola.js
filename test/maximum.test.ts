import { money } from '../src/money';
import { maximum } from '../src/maximum';
import { USD, EUR } from './test-utils';

describe('MaximumMoneyObject', () => {
  test('should get the lowest of passed money objects', () => {
    const amount1 = money(100, USD);
    const amount2 = money(24.99, USD);
    const amount3 = money(18.25, USD);
    const minimumAmount = maximum([amount1, amount2, amount3]);

    expect(minimumAmount.format()).toEqual('$100.00');
  });

  it('should work correctly with all equal amounts', () => {
    const amount1 = money(100, USD);
    const amount2 = money(100, USD);
    const amount3 = money(100, USD);
    const maximumAmount = maximum([amount1, amount2, amount3]);

    expect(maximumAmount.getAmount().toNumber()).toBe(100);
    expect(maximumAmount.format()).toEqual('$100.00');
  });

  test('should throw an error if money objects collection is empty', () => {
    expect(() => maximum([])).toThrow('No Money objects provided');
  });

  test('should throw an error if money objects are not of the same currency', () => {
    const amount1 = money(100, USD);
    const amount2 = money(24.99, EUR);
    const amount3 = money(18.25, USD);

    expect(() => maximum([amount1, amount2, amount3])).toThrow(
      'All Money objects must have the same currency'
    );
  });
});
