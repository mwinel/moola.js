/**
 * Represents a currency with its code, locale and precision.
 */
export class Currency {
  public code: string;
  public locale: string;
  public precision: number;

  constructor(code: string, locale: string, precision: number) {
    this.code = code;
    this.precision = precision;
    this.locale = locale;
  }
}
