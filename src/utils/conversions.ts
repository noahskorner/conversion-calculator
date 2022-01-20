enum UNIT_TYPE {
  GALLON = "G",
  LITER = "L",
  INCH = "IN",
  CENTIMETER = "CM",
  POUND = "LB",
  FOOT = "FT",
  YARD = "YD",
  KILOGRAM = "KG",
}

const ACCEPTED_CONVERSIONS = [
  [UNIT_TYPE.GALLON, UNIT_TYPE.LITER, UNIT_TYPE.POUND, UNIT_TYPE.KILOGRAM],
  [UNIT_TYPE.INCH, UNIT_TYPE.CENTIMETER, UNIT_TYPE.FOOT, UNIT_TYPE.YARD],
];

const isAcceptedConversion = (
  sourceUnit: UNIT_TYPE,
  desiredUnit: UNIT_TYPE
): boolean => {
  ACCEPTED_CONVERSIONS.forEach((acceptedConversionList) => {
    if (
      acceptedConversionList.includes(sourceUnit) &&
      acceptedConversionList.includes(desiredUnit)
    ) {
      return true;
    }
  });

  return false;
};

const getAcceptedConversions = (
  sourceUnit: UNIT_TYPE
): Array<UNIT_TYPE> | undefined => {
  return ACCEPTED_CONVERSIONS.find((acceptedConversionList) => {
    return acceptedConversionList.includes(sourceUnit);
  });
};

const convert = (
  quantity: number,
  sourceUnit: UNIT_TYPE,
  desiredUnit: UNIT_TYPE
): number => {
  if (sourceUnit === desiredUnit) return quantity;

  switch (true) {
    case sourceUnit === UNIT_TYPE.GALLON && desiredUnit === UNIT_TYPE.LITER:
      return quantity * 3.8;
    case sourceUnit === UNIT_TYPE.GALLON && desiredUnit === UNIT_TYPE.POUND:
      return quantity * 8;
    case sourceUnit === UNIT_TYPE.KILOGRAM && desiredUnit === UNIT_TYPE.POUND:
      return quantity * 2.2;
    case sourceUnit === UNIT_TYPE.GALLON && desiredUnit === UNIT_TYPE.KILOGRAM:
      return convert(
        convert(quantity, UNIT_TYPE.GALLON, UNIT_TYPE.POUND),
        UNIT_TYPE.POUND,
        UNIT_TYPE.KILOGRAM
      );
    case sourceUnit === UNIT_TYPE.LITER && desiredUnit === UNIT_TYPE.POUND:
      return convert(
        convert(quantity, UNIT_TYPE.LITER, UNIT_TYPE.GALLON),
        UNIT_TYPE.GALLON,
        UNIT_TYPE.POUND
      );
    case sourceUnit === UNIT_TYPE.LITER && desiredUnit === UNIT_TYPE.KILOGRAM:
      return convert(
        convert(quantity, UNIT_TYPE.LITER, UNIT_TYPE.GALLON),
        UNIT_TYPE.GALLON,
        UNIT_TYPE.KILOGRAM
      );
    case sourceUnit === UNIT_TYPE.INCH && desiredUnit === UNIT_TYPE.CENTIMETER:
      return quantity * 2.54;
    case sourceUnit === UNIT_TYPE.FOOT && desiredUnit === UNIT_TYPE.INCH:
      return quantity * 12;
    case sourceUnit === UNIT_TYPE.YARD && desiredUnit === UNIT_TYPE.FOOT:
      return quantity * 3;
    case sourceUnit === UNIT_TYPE.INCH && desiredUnit === UNIT_TYPE.YARD:
      return convert(
        convert(quantity, UNIT_TYPE.INCH, UNIT_TYPE.FOOT),
        UNIT_TYPE.FOOT,
        UNIT_TYPE.YARD
      );
    case sourceUnit === UNIT_TYPE.FOOT && desiredUnit === UNIT_TYPE.CENTIMETER:
      return convert(
        convert(quantity, UNIT_TYPE.FOOT, UNIT_TYPE.INCH),
        UNIT_TYPE.INCH,
        UNIT_TYPE.CENTIMETER
      );
    case sourceUnit === UNIT_TYPE.CENTIMETER && desiredUnit === UNIT_TYPE.YARD:
      return convert(
        convert(quantity, UNIT_TYPE.CENTIMETER, UNIT_TYPE.FOOT),
        UNIT_TYPE.FOOT,
        UNIT_TYPE.YARD
      );
    default:
      return quantity * (1 / convert(1, desiredUnit, sourceUnit));
  }
};

export {
  UNIT_TYPE,
  ACCEPTED_CONVERSIONS,
  isAcceptedConversion,
  getAcceptedConversions,
  convert,
};
