import Decimal from 'decimal.js';
import { Money } from './money';

/**
 * Sums up a collection of Money objects.
 * All Money objects in the collection must have the same currency.
 *
 * @param moneyCollection An array of Money objects to sum up.
 * @returns A new Money object representing the total sum.
 * @throws Error if the collection is empty or contains Money objects with different currencies.
 *
 * @example
 * const USD = new Currency('USD', 2);
 * const amount1 = money(100, USD); // $100.00
 * const amount2 = money(250, USD); // $250.00
 * const amount3 = money(50, USD);  // $50.00
 * const total = sum([amount1, amount2, amount3]);
 * console.log(total.format()); // Outputs: "$400.00"
 */
export const sum = (moneyCollection: Money[]): Money => {
  const firstMoneyObject = moneyCollection[0];
  if (moneyCollection.length === 0 || !firstMoneyObject) {
    throw new Error('The collection is empty.');
  }

  const currency = firstMoneyObject.getCurrency();
  const totalAmount = moneyCollection.reduce((acc, money) => {
    if (money.getCurrency().code !== currency.code) {
      throw new Error('All Money objects must have the same currency.');
    }

    return acc.plus(money.getAmount());
  }, new Decimal(0));

  return new Money(totalAmount.toNumber(), currency);
};
