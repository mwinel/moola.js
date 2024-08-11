import { Money } from './money';
import { Currency } from './currency';

/**
 * Converts a Money object to another currency using the provided exchange rates.
 * @param amount - The Money object to convert.
 * @param targetCurrency - The target Currency object to convert to.
 * @param rates - An object containing the exchange rates with currency codes as keys.
 * @returns A new Money object in the target currency.
 * @throws Error if the conversion rate is not available for the target currency.
 * @example
 * const USD = new Currency('USD', 2, 'en-US');
 * const EUR = new Currency('EUR', 2, 'en-DE);
 * const amount = money(100, usd); // $100.00
 * const rates = {
 *   USD: { code: 'USD', value: 1 },
 *   EUR: { code: 'EUR', value: 0.85 }
 * };
 * const convertedAmount = convert(amount, EUR, rates);
 * console.log(convertedAmount.format()); // Outputs: "85.00 €"
 */
export const convert = (
  amount: Money,
  targetCurrency: Currency,
  rates: Record<string, { code: string; value: number }>
): Money => {
  if (!rates[targetCurrency.code]) {
    throw new Error(
      `Exchange rate for currency ${targetCurrency.code} not available`
    );
  }

  const targetRate = rates[targetCurrency.code].value;
  const sourceRate = rates[amount.getCurrency().code].value;
  const baseAmount = amount.getAmount().div(sourceRate);
  const convertedAmount = baseAmount.mul(targetRate);

  return new Money(convertedAmount.toNumber(), targetCurrency);
};
