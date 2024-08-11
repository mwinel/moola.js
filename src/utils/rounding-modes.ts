import { Decimal } from 'decimal.js';

// Define RoundingMode enum based on Decimal rounding modes
export enum RoundingMode {
  ROUND_UP = Decimal.ROUND_UP,
  ROUND_DOWN = Decimal.ROUND_DOWN,
  ROUND_HALF_UP = Decimal.ROUND_HALF_UP,
  ROUND_HALF_DOWN = Decimal.ROUND_HALF_DOWN,
  ROUND_HALF_EVEN = Decimal.ROUND_HALF_EVEN,
}

export const ROUND_UP = Decimal.ROUND_UP;
export const ROUND_DOWN = Decimal.ROUND_DOWN;
export const ROUND_HALF_UP = Decimal.ROUND_HALF_UP;
export const ROUND_HALF_DOWN = Decimal.ROUND_HALF_DOWN;
export const ROUND_HALF_EVEN = Decimal.ROUND_HALF_EVEN;
