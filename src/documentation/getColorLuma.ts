export const getColorLuma = (color: string): number => {
  const longHex = color.toUpperCase().match(/^#([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})(.*)/u);
  const shortHex = color.toUpperCase().match(/^#([0-9A-F])([0-9A-F])([0-9A-F])$/u);
  const toDecimal = (haystack: string) => parseInt(haystack, 16) & 0xff;

  return longHex
    ? Math.ceil((toDecimal(longHex[1]) + toDecimal(longHex[2]) + toDecimal(longHex[3])) / 3)
    : shortHex
    ? Math.ceil(
        (toDecimal(shortHex[1] + shortHex[1]) +
          toDecimal(shortHex[2] + shortHex[2]) +
          toDecimal(shortHex[3] + shortHex[3])) /
          3
      )
    : 0;
};
