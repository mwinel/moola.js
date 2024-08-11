## Moola.js

Moola.js is a TypeScript library for handling monetary values and currency conversions, inspired by [Martin Fowler's Money pattern](https://martinfowler.com/eaaCatalog/money.html). It provides a robust and precise way to perform arithmetic operations, comparisons, and conversions between different currencies, ensuring accuracy and consistency in financial calculations.

### Installation

```bash
npm install moola.js
```

### Usage

#### Importing the library

```typescript
import { money, Currency } from 'moola.js';
```

#### Defining Currencies

To begin with, create your currency object(s) using the `Currency` class, specifying the currency code, locale, and precision:

```typescript
const USD = new Currency('USD', 'en-US', 2);
const EUR = new Currency('EUR', 'en-DE', 2);
const UGX = new Currency('UGX', 'en-UG', 0); // Currency with no small units or precision
```

The `Currency` class represents a specific currency used for monetary calculations. It includes essential details about the currency:

- **code:** A string representing the currency code (e.g., "USD" for US Dollar, "EUR" for Euro).
- **locale:** A string specifying the locale associated with the currency (e.g., "en-US" for US English, "de-DE" for German).
- **precision:** A number indicating the number of decimal places used for the currency (e.g., 2 for most currencies).

#### Creating Money Objects

Create a money object using the `Money` object:

```typescript
const priceInUSD = money(100, USD);
const priceInEUR = money(85, EUR);

console.log(priceInUSD);
// Output:
// Money {
//   amount: 100,
//   currency: Currency { code: 'USD', precision: 2, locale: 'en-US' }
// }

console.log(priceInEUR);
// Output:
// Money {
//   amount: 85,
//   currency: Currency { code: 'EUR', precision: 2, locale: 'de-DE' }
// }
```

The `Money` class handles monetary values and provides methods for performing various operations:

**amount:** Represents the monetary value in the smallest unit of currency (e.g., cents for USD). Stored as a `Decimal` for precision.
**currency:** An instance of the Currency class, specifying the currency of the Money object.

**Key Methods:**

`getCurrency()`: Returns the currency of the Money object.

```typescript
console.log(priceInUSD.getCurrency()); // Output: USD
console.log(priceInEUR.getCurrency()); // Output: EUR
```

`getAmount()`: Returns the amount in standard units.

```typescript
console.log(priceInUSD.getAmount()); // Output: 100
console.log(priceInEUR.getAmount()); // Output: 85
```

`format()`: Formats the amount as a currency string according to the locale.

```typescript
console.log(priceInUSD.format()); // Output: '$100.00'
console.log(priceInEUR.format()); // Output: '85,00 €'
```

`add(other: Money)`: Adds another Money object of the same currency.

```typescript
const price = money(100, USD);
const VAT = money(18, USD);

const total = price.add(VAT);
console.log(total.format()); // Output: '$118.00'
```

`subtract(other: Money)`: Subtracts another Money object of the same currency.

```typescript
const price = money(100, USD);
const discount = money(20, USD);

const total = price.subtract(discount);
console.log(total.format()); // Output: '$80.00'
```

`multiply(factor: number)`: Multiplies the amount by a given factor.

```typescript
const price = money(100, USD);
const quantity = 4;

const total = price.multiply(uantity);
console.log(total.format()); // Output: '$400.00'
```

`isEqualTo(other: Money)`: Compares if the Money object is equal to another Money object.

```typescript
const amount = money(100, USD);
const amountPaid = money(100, USD);

console.log(amount.isEqualTo(amountPaid)); // Output: true
```

`isLessThan(other: Money)`: Checks if the Money object is less than another Money object.

```typescript
const amount = money(100, USD);
const amountPaid = money(200, USD);

console.log(amount.isLessThan(amountPaid)); // Output: true
```

`isGreaterThan(other: Money)`: Checks if the Money object is greater than another Money object.

```typescript
const amount = money(100, USD);
const amountPaid = money(200, USD);

console.log(amountPaid.isGreaterThan(amount)); // Output: true
```

`addPercentage(percent: number)`: Adds a percentage to the amount.

```typescript
const price = money(100, USD);
const VAT = 18; // 18% taxes

const total = price.addPercentage(VAT);
console.log(total.format()); // Output: '$118.00'
```

`subtractPercentage(percent: number)`: Subtracts a percentage from the amount.

```typescript
const price = money(100, USD);
const discount = 20; // 20% discount

const total = price.subtractPercentage(discount);
console.log(total.format()); // Output: '$80.00'
```

#### allocate

The `allocate` method divides a given `Money` object across a list of ratios. This is particularly useful when you need to distribute a total amount of money in proportion to specified ratios. The method ensures that the total allocated amounts sum up to the original amount as closely as possible, accounting for indivisible monetary units.

You can use percentage or ratio style for ratios: for example, `[25, 75]` and `[1, 3]` do the same thing.

You can also pass zero ratios (such as `[0, 50, 50]`). If there's a remainder to distribute, zero ratios are skipped and return a money object with amount zero.

All ratios must be positive, and you can't only pass zero ratios.

```typescript
const amount = money(100, USD);
const allocations = allocate(amount, [1, 3]);

// or

const amount = money(100, USD);
const allocations = allocate(amount, [25, 75]);

console.log(allocations[0].format()); // Output: $25.00
console.log(allocations[1].format()); // Output: $75.00
```

If ratios include zeros, the method skips zero ratios and allocates the remainder among non-zero ratios:

```typescript
const amount = money(100, USD);
const allocations = allocate(amount, [0, 50, 50]);

console.log(allocations[0].format()); // Output: $0.00
console.log(allocations[1].format()); // Output: $50.00
console.log(allocations[2].format()); // Output: $50.00
```

#### convert

The `convert` method converts a `Money` object from one currency to another using provided exchange rates. This method is essential for applications dealing with multiple currencies and requires accurate conversion based on current exchange rates.

```typescript
const rates: Record<string, { code: string; value: number }> = {
  EUR: {
    code: 'EUR',
    value: 0.9155001012,
  },
  UGX: {
    code: 'UGX',
    value: 3724.9405801702,
  },
  USD: {
    code: 'USD',
    value: 1,
  },
};

const amount = money(100, USD);
const convertedAmount = convert(amount, EUR, rates);

console.log(convertedAmount.format()); // Output: 91.55 €
```

#### sum

The `sum` function aggregates a collection of `Money` objects into a single `Money` object. This function is useful when you need to calculate the total amount from multiple monetary values, provided they are all in the same currency.

```typescript
const amount1 = new Money(10.5, USD);
const amount2 = new Money(5.75, USD);
const amount3 = new Money(8.25, USD);

const total = sum([amount1, amount2, amount3]);

console.log(total.format()); // Output: $24.50
```

#### round

The `round` function rounds the amount of a `Money` object to the nearest value based on the specified rounding mode. This is useful for ensuring monetary values conform to standard rounding rules in financial applications.

```typescript
import { ROUND_UP } from 'moola.js';

const amount = money(24.9945, USD);
const roundedAmount = round(amount, ROUND_UP);

console.log(roundedAmount.format()); // Output: $25.00
```

The `round` function uses different **_rounding modes_** provided by `Decimal.js`. The default mode is `ROUND_HALF_UP`, but other modes like `ROUND_DOWN`, `ROUND_UP`, `ROUND_HALF_DOWN`, and `ROUND_HALF_EVEN` can be specified.

#### toSnapshot

The `toSnapshot` function converts a `Money` object into a format suitable for storage in a database. This format is typically a plain object that captures the essential properties of the Money instance, making it easy to serialize and persist.

```typescript
const price = money(99.99, USD);
const snapshot = toSnapshot(price);

console.log(snapshot);
// Output: { amount: 99.99, currency: 'USD', precision: 2, locale: 'en-US' }
```

#### fromSnapshot

The `fromSnapshot` function reconstructs a `Money` object from its database snapshot format. This is useful for converting stored data back into a Money instance when retrieving it from a database.

```typescript
const snapshot = {
  amount: 99.99,
  currency: 'USD',
  precision: 2,
  locale: 'en-US',
};
const moneyObject = fromSnapshot(snapshot);

console.log(moneyObject);

// Output:
// Money {
//   amount: 99.99,
//   currency: Currency { code: 'USD', precision: 2, locale: 'en-US' }
// }
```

#### minimum

The `minimum` function finds the smallest `Money` object in a collection of Money objects. This function ensures that all the Money objects in the collection share the same currency, and it returns the Money object with the smallest amount.

```typescript
const amount1 = money(100, USD);
const amount2 = money(24.99, USD);
const amount3 = money(18.25, USD);
const minimumAmount = minimum([amount1, amount2, amount3]);

console.log(minimumAmount.format()); // Output: $18.25
```

#### maximum

The `maximum` function identifies the largest `Money` object within a collection of Money objects. This function ensures that all Money objects being compared share the same currency and returns the Money object with the highest amount.

```typescript
const amount1 = money(100, USD);
const amount2 = money(24.99, USD);
const amount3 = money(18.25, USD);
const maximumAmount = minimum([amount1, amount2, amount3]);

console.log(maximumAmount.format()); // Output: $100.00
```

#### Contributing

Contributions are welcome! Please submit issues, feature requests, and pull requests on GitHub. Follow the [contributing guidelines](CONTRIBUTING.md) to get started.

#### License

[MIT](LICENSE)
