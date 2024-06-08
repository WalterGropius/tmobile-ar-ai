import { ConnectionType, TECHNOLOGY_ITEMS } from '../../types/connection';

export const resolveConnectionType = (haystack: string): ConnectionType => {
  const type = haystack.toUpperCase();
  if (!TECHNOLOGY_ITEMS[type as ConnectionType])
    throw Error(
      `Haystack "${type}" is not valid connection type. Did you mean "${Object.keys(TECHNOLOGY_ITEMS).join('", "')}"?`
    );

  return type as ConnectionType;
};
