import { Decimal } from 'decimal.js';
import { Money, RoundingMode } from './money';

/**
 * Rounds the Money object to the specified precision according to the given rounding mode.
 *
 * @param money - The Money object to round.
 * @param mode - The rounding mode to use (default is RoundingMode.ROUND_HALF_UP).
 * @returns A new Money object with the amount rounded to the specified precision.
 * @example
 * const USD = new Currency('USD', 2);
 * const money = money(100.55, USD); // $100.55
 * const roundedMoney = round(money, ROUND_HALF_UP);
 * console.log(roundedMoney.format()); // Outputs: "$100.56"
 */
export const round = (
  money: Money,
  mode: RoundingMode = RoundingMode.ROUND_HALF_UP
): Money => {
  const currency = money.getCurrency();
  const amount = money.getAmount();
  const precision = currency.precision;
  const factor = new Decimal(Math.pow(10, precision));
  const roundedAmount = amount
    .mul(factor)
    .toDecimalPlaces(0, mode as Decimal.Rounding)
    .div(factor);

  return new Money(roundedAmount.toNumber(), currency);
};
