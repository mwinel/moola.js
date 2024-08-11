import { money } from '../src/money';
import { Currency } from '../src/currency';
import {
  validateAmount,
  validateCurrency,
  validatePercentage,
  validateNonEmptyMoneyArray,
  validateSameCurrency,
} from '../src/utils/validations';
import { USD, EUR } from './test-utils';

describe('Validations', () => {
  describe('Validate Currency', () => {
    it('should not throw for valid currency', () => {
      const validCurrency: Currency = {
        code: 'USD',
        locale: 'en-US',
        precision: 2,
      };
      expect(() => validateCurrency(validCurrency)).not.toThrow();
    });

    it('should throw for invalid currency', () => {
      const invalidCurrency: Currency = {
        code: '',
        locale: 'en-US',
        precision: 2,
      };
      expect(() => validateCurrency(invalidCurrency)).toThrow(
        'Invalid currency'
      );
    });
  });

  describe('Validate Amount', () => {
    it('should not throw for valid amount', () => {
      expect(() => validateAmount(100)).not.toThrow();
    });

    it('should throw for negative amount', () => {
      expect(() => validateAmount(-100)).toThrow(
        'Amount must be a non-negative number'
      );
    });

    it('should throw for NaN', () => {
      expect(() => validateAmount(NaN)).toThrow(
        'Amount must be a non-negative number'
      );
    });
  });

  describe('Validate Percentage', () => {
    it('should not throw for valid percentage', () => {
      expect(() => validatePercentage(50)).not.toThrow();
    });

    it('should throw for negative percentage', () => {
      expect(() => validatePercentage(-10)).toThrow(
        'Percentage must be non-negative'
      );
    });
  });

  describe('Validate Non Empty Money Collection', () => {
    it('should throw an error if the array is empty', () => {
      expect(() => validateNonEmptyMoneyArray([])).toThrow(
        'No Money objects provided'
      );
    });

    it('should not throw an error if the array is not empty', () => {
      const amount1 = money(100, USD);
      const amount2 = money(85, EUR);
      const moneyCollection = [amount1, amount2];

      expect(moneyCollection.length).toBe(2);
      expect(() => validateNonEmptyMoneyArray(moneyCollection)).not.toThrow();
    });
  });

  describe('Validate Same Currency', () => {
    it('should throw an error if the array is empty', () => {
      expect(() => validateSameCurrency([])).toThrow(
        'No Money objects provided'
      );
    });

    it('should throw an error if Money objects have different currencies', () => {
      const amount1 = money(100, USD);
      const amount2 = money(85, EUR);
      const moneyCollection = [amount1, amount2];
      expect(() => validateSameCurrency(moneyCollection)).toThrow(
        'All Money objects must have the same currency'
      );
    });

    it('should not throw an error if all Money objects have the same currency', () => {
      const amount1 = money(100, USD);
      const amount2 = money(85, USD);
      const moneyCollection = [amount1, amount2];

      expect(moneyCollection.length).toBe(2);
      expect(() => validateSameCurrency(moneyCollection)).not.toThrow();
    });
  });
});
