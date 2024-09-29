import numeral from "numeral";

export const formatNumberWithNumeral = (val: number | string): string => {
  try {
    const formattedInteger = numeral(val).format("0,0");

    const originalString = val.toString();
    const decimalIndex = originalString.indexOf(".");
    const decimalPart =
      decimalIndex !== -1 ? originalString.slice(decimalIndex) : "";

    return formattedInteger + decimalPart;
  } catch {
    return "0";
  }
};
