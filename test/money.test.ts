import { money } from '../src/money';
import { USD, EUR, JPY, INR, CLP } from './test-utils';

describe('Money', () => {
  test('should format USD correctly with precision 2', () => {
    const amount = money(24, USD);
    expect(amount.format()).toBe('$24.00');
  });

  test('should format JPY correctly with no decimal places', () => {
    const amount = money(1000, JPY);
    expect(amount.format()).toBe('￥1,000');
  });

  test('should format EUR correctly with precision 2 in German locale', () => {
    const amount = money(1234.56, EUR);
    expect(amount.format()).toBe('1.234,56 €');
  });

  test('should format amounts with high precision correctly', () => {
    const amount = money(24.9999, USD);
    expect(amount.format()).toBe('$25.00');
  });

  test('should format amounts with low precision correctly', () => {
    const amount = money(24.01, USD);
    expect(amount.format()).toBe('$24.01');
  });

  test('should format zero amount correctly', () => {
    const amount = money(0, USD);
    expect(amount.format()).toBe('$0.00');
  });

  test('should format very large amounts correctly', () => {
    const amount = money(1234567890.12, USD);
    expect(amount.format()).toBe('$1,234,567,890.12');
  });

  test('should format very small amounts correctly', () => {
    const amount = money(0.01, USD);
    expect(amount.format()).toBe('$0.01');
  });

  test('should format using custom locale and currency', () => {
    const amount = money(100000.5, INR);
    expect(amount.format()).toBe('₹1,00,000.50');
  });

  test('should format amount with different precision than 2', () => {
    const amount = money(1500, CLP);
    expect(amount.format()).toBe('$1.500');
  });

  test('should add two money objects correctly', () => {
    const priceInUSD1 = money(10.01, USD);
    const priceInUSD2 = money(14.2556, USD);
    const result = priceInUSD1.add(priceInUSD2);

    expect(result.getAmount().toNumber()).toEqual(24.2656);
  });

  test('should throw an error when adding two money objects of different currencies', () => {
    const priceInUSD = money(10.0, USD);
    const priceInEUR = money(14.25, EUR);
    expect(() => priceInUSD.add(priceInEUR)).toThrow(
      'Currencies must match for this operation'
    );
  });

  test('should subtract a money object from another money object', () => {
    const price = money(100, USD);
    const discount = money(20, USD);
    const result = price.subtract(discount);

    expect(result.getAmount().toNumber()).toEqual(80);
  });

  test('should multiply money object by a factor', () => {
    const price = money(25, USD);
    const quantity = 4;
    const result = price.multiply(quantity);

    expect(result.getAmount().toNumber()).toEqual(100);
  });

  test('should check if money object is equal to another money object', () => {
    const amount = money(100, USD);
    const amountPaid = money(100, USD);
    expect(amount.isEqualTo(amountPaid)).toBe(true);
    expect(amount.isGreaterThanOrEqualTo(amountPaid)).toBe(true);
    expect(amount.isLessThanOrEqualTo(amountPaid)).toBe(true);
  });

  test('should check if money object is less than another money object', () => {
    const amount = money(100, USD);
    const amountPaid = money(10, USD);

    expect(amountPaid.isLessThan(amount)).toBe(true);
    expect(amountPaid.isLessThanOrEqualTo(amount)).toBe(true);
  });

  test('should check if money object is greater than another money object', () => {
    const amount = money(100, USD);
    const amountPaid = money(10, USD);
    const balance = amount.subtract(amountPaid);

    expect(balance.isGreaterThan(amountPaid)).toBe(true);
    expect(balance.isGreaterThanOrEqualTo(amountPaid)).toBe(true);
  });

  test('should add a percentage to a money object', () => {
    const amount = money(100, USD);
    const taxes = 18; // 18 percent VAT
    const result = amount.addPercentage(taxes);

    expect(result.getAmount().toNumber()).toEqual(118.0);
  });

  test('should subtract a percentage from a money object', () => {
    const amount = money(100, USD);
    const discount = 20; // 20 percent discount
    const taxes = 18; // 18 percent VAT
    const subtotal = amount.subtractPercentage(discount);
    const total = subtotal.addPercentage(taxes);

    expect(subtotal.getAmount().toNumber()).toEqual(80);
    expect(total.getAmount().toNumber()).toEqual(94.4);
  });

  test('should handle zero amount correctly', () => {
    const zeroAmount = money(0, USD);
    expect(zeroAmount.getAmount().toNumber()).toEqual(0.0);
  });

  test('should handle very large amounts correctly', () => {
    const largeAmount = money(1e12, USD);
    expect(largeAmount.getAmount().toNumber()).toEqual(1000000000000.0);
  });

  test('should throw an error for negative amounts', () => {
    expect(() => money(-100, USD)).toThrow(
      'Amount must be a non-negative number'
    );
  });

  test('should throw an error for invalid currency', () => {
    const invalidCurrency = { code: '', locale: 'en-US', precision: 2 };
    expect(() => money(100, invalidCurrency)).toThrow('Invalid currency');
  });
});
