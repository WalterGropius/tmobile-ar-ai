type ColorGroup = {
  name: string;
  colors: ColorDescription[];
};

export type ColorDescription = {
  name: string;
  color: string;
};

const firstUpper = (str: string): string => (str ? `${str.charAt(0).toUpperCase()}${str.slice(1)}` : '');

export const formatColorsForDocumentation = (colorEnum: [string, string][]): ColorGroup[] => {
  const formatGroupName = (name: string): string => (name.match(/^[a-z]+/g) || [''])[0];
  const groupCandidates = Object.values(colorEnum).map(([name]) => formatGroupName(name));

  return groupCandidates
    .filter((element, index) => groupCandidates.indexOf(element) === index)
    .map((group) => ({
      name: firstUpper(group),
      colors: Object.values(colorEnum)
        .filter(([name]) => formatGroupName(name) === group)
        .map((item) => ({ name: item[0], color: item[1] })),
    }));
};
