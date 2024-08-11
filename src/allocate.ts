import Decimal from 'decimal.js';
import { Money } from './money';

/**
 * Allocates a Money object across a list of ratios.
 *
 * Monetary values have indivisible units, meaning you can't always exactly split them.
 * With `allocate`, you can split a monetary amount then distribute the remainder as evenly as possible.
 *
 * You can use percentage or ratio style for ratios:
 * - [25, 75] and,
 * - [1, 3] do the same thing.
 *
 * You can also pass zero ratios (such as [0, 50, 50]). If there's a remainder to distribute,
 * zero ratios are skipped and return a Money object with amount zero.
 *
 * All ratios must be positive, and you can't only pass zero ratios.
 *
 * @param money - The Money object to allocate.
 * @param ratios - An array of ratios to allocate the amount. Ratios can be numbers or objects with amount and scale properties.
 * @returns An array of Money objects with allocated amounts.
 * @example
 * // Allocate $100.00 across ratios [2, 3, 5]
 * const usd = new Currency('USD', 2);
 * const money = money(100, usd); // $100.00
 *
 * const ratios = [2, 3, 5];
 * const allocations = allocate(money, ratios);
 * allocations.forEach((allocation, index) => {
 *   console.log(`Allocation ${index + 1}: ${allocation.format()}`);
 * });
 * // Outputs:
 * // Allocation 1: $20.00
 * // Allocation 2: $30.00
 * // Allocation 3: $50.00
 */
export const allocate = (money: Money, ratios: number[]): Money[] => {
  if (ratios.length === 0 || ratios.every(r => r <= 0)) {
    throw new Error('At least one ratio must be positive.');
  }

  const totalRatio = ratios.reduce((acc, r) => acc + r, 0);
  const amount = money.getAmount();
  const currency = money.getCurrency();

  const allocations: Decimal[] = ratios.map(ratio =>
    amount
      .times(ratio)
      .dividedBy(totalRatio)
      .floor()
  );

  // Calculate the remainder to be distributed
  const remainder = amount.minus(
    allocations.reduce(
      (acc, allocation) => acc.plus(allocation),
      new Decimal(0)
    )
  );

  // Distribute the remainder as evenly as possible
  let remainderToDistribute = remainder;
  const moneyAllocations = allocations.map((allocation, index) => {
    const extra =
      remainderToDistribute.greaterThan(0) && ratios[index] > 0
        ? new Decimal(1)
        : new Decimal(0);
    remainderToDistribute = remainderToDistribute.minus(extra);
    return new Money(allocation.plus(extra).toNumber(), currency);
  });

  return moneyAllocations;
};
