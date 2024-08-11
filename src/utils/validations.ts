import { Currency } from '../currency';
import { Money } from '../money';

/**
 * Validates the given currency.
 * @param currency The currency to validate.
 * @throws Error if the currency is invalid.
 */
export function validateCurrency(currency: Currency): void {
  if (!currency || !currency.code) {
    throw new Error('Invalid currency');
  }
}

/**
 * Validates the given amount.
 * @param amount The amount to validate.
 * @throws Error if the amount is invalid.
 */
export function validateAmount(amount: number): void {
  if (isNaN(amount) || amount < 0) {
    throw new Error('Amount must be a non-negative number');
  }
}

/**
 * Validates the given percentage.
 * @param percent The percentage to validate.
 * @throws Error if the percentage is invalid.
 */
export function validatePercentage(percent: number): void {
  if (percent < 0) {
    throw new Error('Percentage must be non-negative');
  }
}

/**
 * Validates that the provided array of Money objects is non-empty.
 * @param moneyCollection An array of Money objects to validate.
 * @throws Error if the array is empty.
 */
export function validateNonEmptyMoneyArray(moneyCollection: Money[]): void {
  if (moneyCollection.length === 0) {
    throw new Error('No Money objects provided');
  }
}

/**
 * Validates that all Money objects in the provided array have the same currency.
 * @param moneyCollection An array of Money objects to validate.
 * @throws Error if the Money objects have different currencies.
 */
export function validateSameCurrency(moneyCollection: Money[]): void {
  validateNonEmptyMoneyArray(moneyCollection);

  const currency = moneyCollection[0]?.getCurrency();
  const allSameCurrency = moneyCollection.every(
    money => money.getCurrency().code === currency?.code
  );

  if (!allSameCurrency) {
    throw new Error('All Money objects must have the same currency');
  }
}
