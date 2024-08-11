import { Decimal } from 'decimal.js';
import { Money } from './money';
import { Currency } from './currency';
import { Snapshot } from './to-snapshot';

/**
 * Converts a stored database format back into a Money object.
 *
 * @param snapshot An object representing the stored Money object.
 * @returns A Money object reconstructed from the database format.
 * @example
 * const snapshot = { amount: 99.99, currency: 'USD', precision: 2, locale: 'en-US' };
 * const moneyObject = fromSnapshot(snapshot);
 * console.log(moneyObject); // Output: Money { amount: 99.99, currency: Currency { code: 'USD', precision: 2, locale: 'en-US' }}
 */
export const fromSnapshot = (snapshot: Snapshot): Money => {
  const amount = new Decimal(snapshot.amount);
  const currency = new Currency(
    snapshot.currency,
    snapshot.locale,
    snapshot.precision
  );

  return new Money(amount.toNumber(), currency);
};
