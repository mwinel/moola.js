import { Money } from './money';

export type Snapshot = {
  amount: number;
  currency: string;
  precision: number;
  locale: string;
};

/**
 * Converts the Money object into a format suitable for storage in a database.
 *
 * @param money - The Money object to convert.
 * @returns An object representing the Money object in a format suitable for storage in a database.
 *
 * @example
 * const USD = new Currency('USD', 2, 'en-US');
 * const money = money(100, USD); // $100.00
 * const snapshot = toSnapshot(money);
 * console.log(snapshot); // Outputs: { amount: 100, currency: 'USD', precision: 2, locale: 'en-US' }
 */
export const toSnapshot = (money: Money): Snapshot => {
  const amount = money.getAmount().toNumber();
  const currency = money.getCurrency();

  return {
    amount,
    currency: currency.code,
    precision: currency.precision,
    locale: currency.locale,
  };
};
