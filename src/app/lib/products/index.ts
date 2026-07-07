// lib/products/index.ts
import { elektroMuhobijkaConfig } from './elektro-muhobijka';
import { kinokiConfig } from './kinoki-patches';
import { lenyesConfig } from './lenyes-px163';
import { pressureWasherConfig } from './pressure-washer';
import { soapDispenserConfig } from './soap-dispenser';

export const allProducts = [
  elektroMuhobijkaConfig,
  kinokiConfig,
  lenyesConfig,
  pressureWasherConfig,
  soapDispenserConfig,
];