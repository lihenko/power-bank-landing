// lib/products/index.ts
import { elektroMuhobijkaConfig } from './elektro-muhobijka';
import { kinokiConfig } from './kinoki-patches';
import { lenyesConfig } from './lenyes-px163';
import { pressureWasherConfig } from './pressure-washer';
import { soapDispenserConfig } from './soap-dispenser';
import { electroturkaConfig } from './electro-turka';
import { kingPowerKPG508Config } from './king-power-kpg-508';

export const allProducts = [
  kingPowerKPG508Config,
  electroturkaConfig,
  elektroMuhobijkaConfig,
  kinokiConfig,
  lenyesConfig,
  pressureWasherConfig,
  soapDispenserConfig,
];