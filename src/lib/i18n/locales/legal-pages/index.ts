export { legalPagesEn } from './en';

import { legalPagesEs as legalPagesEsBase } from './es';
import { legalPagesEsSupplement } from './es-supplement';
export const legalPagesEs = { ...legalPagesEsBase, ...legalPagesEsSupplement };

import { legalPagesTr as legalPagesTrBase } from './tr';
import { legalPagesTrSupplement } from './tr-supplement';
export const legalPagesTr = { ...legalPagesTrBase, ...legalPagesTrSupplement };

import { legalPagesAr as legalPagesArBase } from './ar';
import { legalPagesArSupplement } from './ar-supplement';
export const legalPagesAr = { ...legalPagesArBase, ...legalPagesArSupplement };
