import { money } from '../src/money';
import { sum } from '../src/sum';
import { USD, EUR } from './test-utils';

describe('SumMoneyCollection', () => {
  test('should sum up a collection of money objects', () => {
    const amount1 = money(100, USD);
    const amount2 = money(24.99, USD);
    const amount3 = money(18.25, USD);
    const lineItems = [amount1, amount2, amount3];
    const result = sum(lineItems);

    expect(result.format()).toEqual('$143.24');
  });

  test('should throw an error if money objects are not of the same currency', () => {
    const amount1 = money(100, USD);
    const amount2 = money(24.99, EUR);
    const amount3 = money(18.25, USD);
    const lineItems = [amount1, amount2, amount3];
 
    expect(() => sum(lineItems)).toThrow(
      'All Money objects must have the same currency.'
    );
  });
});
