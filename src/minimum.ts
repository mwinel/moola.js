import { Money } from './money';
import {
  validateNonEmptyMoneyArray,
  validateSameCurrency,
} from './utils/validations';

/**
 * Finds the minimum Money object among the provided Money objects.
 *
 * All Money objects must have the same currency.
 *
 * @param moneyCollection - An array of Money objects to compare.
 * @returns The Money object with the smallest amount.
 * @throws Error if the array is empty or if the Money objects have different currencies.
 * @example
 * const USD = new Currency('USD', 2);
 * const money1 = money(100, USD); // $100.00
 * const money2 = money(250, USD); // $250.00
 * const money3 = money(50, USD);  // $50.00
 * const minMoney = minimum([money1, money2, money3]);
 * console.log(minMoney.format()); // Outputs: "$50.00"
 */
export const minimum = (moneyCollection: Money[]): Money => {
  validateNonEmptyMoneyArray(moneyCollection);
  validateSameCurrency(moneyCollection);

  return moneyCollection.reduce((min, current) => {
    return current.isLessThan(min) ? current : min;
  });
};
