export enum PIZZA_KINDS {
  NEAPOLITAN = 'Neapolitan',
  CHICAGO = 'Chicago',
  NEW_YORKSTYLE = 'New York-Style',
  SICILIAN = 'Sicilian',
  DETROIT = 'Detroit',
}

export const PIZZA_KIND_OPTIONS = [
  { label: PIZZA_KINDS.NEAPOLITAN, value: PIZZA_KINDS.NEAPOLITAN },
  { label: PIZZA_KINDS.CHICAGO, value: PIZZA_KINDS.CHICAGO },
  { label: PIZZA_KINDS.NEW_YORKSTYLE, value: PIZZA_KINDS.NEW_YORKSTYLE },
  { label: PIZZA_KINDS.SICILIAN, value: PIZZA_KINDS.SICILIAN },
  { label: PIZZA_KINDS.DETROIT, value: PIZZA_KINDS.DETROIT },
];

export type PizzaKindOptions = `${PIZZA_KINDS}`;
