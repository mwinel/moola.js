import Decimal from 'decimal.js';
import { Currency } from './currency';
import {
  validateAmount,
  validateCurrency,
  validatePercentage,
} from './utils/validations';

export enum RoundingMode {
  ROUND_UP = Decimal.ROUND_UP,
  ROUND_DOWN = Decimal.ROUND_DOWN,
  ROUND_HALF_UP = Decimal.ROUND_HALF_UP,
  ROUND_HALF_DOWN = Decimal.ROUND_HALF_DOWN,
  ROUND_HALF_EVEN = Decimal.ROUND_HALF_EVEN,
}

/**
 * Represents a monetary value in a specific currency.
 */
export class Money {
  private amount: Decimal;
  private currency: Currency;

  constructor(amount: number, currency: Currency) {
    validateCurrency(currency);
    validateAmount(amount);

    this.amount = new Decimal(amount);
    this.currency = currency;
  }

  /**
   * Returns the currency.
   */
  getCurrency(): Currency {
    return this.currency;
  }

  /**
   * Returns the amount in standard units (e.g., dollars for USD).
   */
  getAmount(): Decimal {
    return this.amount;
  }

  /**
   * Formats the money object into a currency string according to the locale.
   * Example: $24.00 for USD in en-US locale.
   * @returns A formatted string.
   */
  format(): string {
    return new Intl.NumberFormat(this.currency.locale, {
      style: 'currency',
      currency: this.currency.code,
      minimumFractionDigits: this.currency.precision,
      maximumFractionDigits: this.currency.precision,
    }).format(this.amount.toNumber());
  }

  /**
   * Adds another Money object to this Money.
   * @param other The Money object to add.
   * @returns A new Money object after addition.
   */
  add(other: Money): Money {
    this.ensureSameCurrency(other);
    const result = this.amount.plus(other.getAmount());
    return new Money(result.toNumber(), this.currency);
  }

  /**
   * Subtracts another Money object to this Money.
   * @param other The Money object to be subtracted.
   * @retur A new Money object after subtraction.
   */
  subtract(other: Money): Money {
    this.ensureSameCurrency(other);
    const result = this.amount.minus(other.getAmount());
    return new Money(result.toNumber(), this.currency);
  }

  /**
   * Multiplies the Money amount by a factor.
   * @param factor The mulplier.
   * @returns A new Money object with the result.
   */
  multiply(factor: number): Money {
    const result = this.amount.mul(factor);
    return new Money(result.toNumber(), this.currency);
  }

  /**
   * Checks if this Money is equal to another Money object.
   * @param other The Money object to compare.
   * @returns True if they are equal, otherwise false.
   */
  isEqualTo(other: Money): boolean {
    return (
      this.amount.equals(other.amount) &&
      this.currency.code === other.currency.code
    );
  }

  /**
   * Checks if this Money is less than another Money object.
   * @param other The Money object to compare.
   * @returns True if this Money is less than the other Money, otherwise false.
   */
  isLessThan(other: Money): boolean {
    this.ensureSameCurrency(other);
    return this.amount.lessThan(other.amount);
  }

  /**
   * Checks if this Money is greater than another Money object.
   * @param other The Money object to compare.
   * @returns True if this Money is greater than the other Money, otherwise false.
   */
  isGreaterThan(other: Money): boolean {
    this.ensureSameCurrency(other);
    return this.amount.greaterThan(other.amount);
  }

  /**
   * Checks if this Money is less than or equal to another Money object.
   * @param other The Money object to compare.
   * @returns True if this Money is less than or equal to the other Money, otherwise false.
   */
  isLessThanOrEqualTo(other: Money): boolean {
    this.ensureSameCurrency(other);
    return this.amount.lessThanOrEqualTo(other.amount);
  }

  /**
   * Checks if this Money is greater than or equal to another Money object.
   * @param other The Money object to compare.
   * @returns True if this Money is greater than or equal to the other Money, otherwise false.
   */
  isGreaterThanOrEqualTo(other: Money): boolean {
    this.ensureSameCurrency(other);
    return this.amount.greaterThanOrEqualTo(other.amount);
  }

  /**
   * Adds a percentage to this Money amount.
   * @param percent The percentage to add, e.g., 10 for 10%.
   * @returns A new Money object with the increased amount.
   */
  addPercentage(percent: number): Money {
    validatePercentage(percent);
    const percentageAmount = this.amount.times(percent / 100);
    const result = this.amount.plus(percentageAmount);
    return new Money(result.toNumber(), this.currency);
  }

  /**
   * Subtracts a percentage from this Money amount.
   * @param percent The percentage to subtract, e.g., 10 for 10%.
   * @returns A new Money object with the decreased amount.
   */
  subtractPercentage(percent: number): Money {
    validatePercentage(percent);
    const percentageAmount = this.amount.times(percent / 100);
    const result = this.amount.minus(percentageAmount);
    return new Money(result.toNumber(), this.currency);
  }

  /**
   * Ensures that the currency of another Money object matches this Money's currency.
   * @param other The other Money object.
   * @throws Error if the currencies do not match.
   */
  private ensureSameCurrency(other: Money): void {
    if (this.currency.code !== other.currency.code)
      throw new Error('Currencies must match for this operation');
  }
}

/**
 * Factory function to create Money instances.
 * @param amount The monetary amount.
 * @param currency The currency for the amount.
 * @returns A new Money instance.
 */
export const money = (amount: number, currency: Currency): Money => {
  return new Money(amount, currency);
};
