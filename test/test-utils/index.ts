import { Currency } from '../../src/currency';

export const USD = new Currency('USD', 'en-US', 2);
export const EUR = new Currency('EUR', 'de-DE', 2);
export const UGX = new Currency('UGX', 'en-UG', 0);
export const JFR = new Currency('JFR', 'en-JP', 0);
export const JPY = new Currency('JPY', 'ja-JP', 0);
export const INR = new Currency('INR', 'en-IN', 2);
export const CLP = new Currency('CLP', 'es-CL', 0);

export const rates: Record<string, { code: string; value: number }> = {
  EUR: {
    code: 'EUR',
    value: 0.9155001012,
  },
  GBP: {
    code: 'GBP',
    value: 0.7837400864,
  },
  KES: {
    code: 'KES',
    value: 128.9605432007,
  },
  RWF: {
    code: 'RWF',
    value: 1318.1342203202,
  },
  UGX: {
    code: 'UGX',
    value: 3724.9405801702,
  },
  USD: {
    code: 'USD',
    value: 1,
  },
  ZAR: {
    code: 'ZAR',
    value: 18.287383441,
  },
};
