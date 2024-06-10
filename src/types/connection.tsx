export const TECHNOLOGY_ITEMS = {
  DSL: { title: 'DSL', subTitle: <>Jde o připojení modemu do telefonní zásuvkyv rámci tarifů xDSL.</> ,imgSrc:"/ui/fromfigma/dsl.png"},
  OPTIC: { title: 'Optic', subTitle: <>Případ, kdy je modem připojen do optického převodníku v rámci tarifů FTTx.</>,imgSrc:"/ui/fromfigma/optic.png" },
  WAN: { title: 'DSL přes terminátor', subTitle: <>Připojení modemu přes takzvaný Terminátor.</>,imgSrc:"/ui/fromfigma/wan.jpg" },
} as const;

export type ConnectionType = keyof typeof TECHNOLOGY_ITEMS;
