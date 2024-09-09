import { ConnectionType } from './connection';

export const STEP = {
  start: 'start',
  //arFront: 'arFront',
  //arBack: 'arBack',
  aiFront: 'aiFront',
  aiBackCab: 'aiBackCab',
  aiBackPow: 'aiBackPow',
  powButt: 'powButt',
  cableAnim: 'cableAnim',
  powerAnim: 'powerAnim',
  finish: 'finish',
} as const;

export const WARNING_MESSAGE_BY_TYPE = {
  FLIP: 'Otočte modem na DRUHOU stranu.',
  POW: 'Zapněte modem(je vypnutý)',
  INCOMP: 'Na tomto zařízení není podpora AR(rozšířené realita)',
  AI: 'Chyba AI analýzy',
} as const;

export type Step = keyof typeof STEP;

export type StepInfoItem = {
  title: string;
  subtitle: string;
  list: string[];
};

export type Detection = {
  yPos: number;
  label: string;
  score: number;
};

export type ModelationArFrontPageProps = {
  loaded: boolean;
};

export type ModelationAiBackPowPageProps = {
  labeledDetections: Detection[];
  handleExecute: () => void;
};

export type ModelationAiBackCabPageProps = {
  labeledDetections: Detection[];
  handleExecute: () => void;
};
