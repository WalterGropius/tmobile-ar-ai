export const TECHNOLOGY_ITEMS = {
  DSL: { title: 'DSL', subTitle: <>Jde o připojení modemu do telefonní zásuvkyv rámci tarifů xDSL.</> },
  OPTIC: { title: 'Optic', subTitle: <>Případ, kdy je modem připojen do optického převodníku v rámci tarifů FTTx.</> },
  WAN: { title: 'DSL přes terminátor', subTitle: <>Připojení modemu přes takzvaný Terminátor.</> },
} as const;

export type ConnectionType = keyof typeof TECHNOLOGY_ITEMS;
