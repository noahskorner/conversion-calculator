import { useEffect, useState } from "react";
import {
  UNIT_TYPE,
  getAcceptedConversions,
  convert,
} from "../../utils/conversions";
import { getKeyFromValue } from "../../utils/getKeyFromValue";
import { capitalize } from "../../utils/capitalize";

const Calculator = () => {
  const [quantity, setQuantity] = useState(1);
  const [sourceUnit, setSourceUnit] = useState(UNIT_TYPE.GALLON);
  const [desiredUnit, setDesiredUnit] = useState(UNIT_TYPE.GALLON);
  const [conversion, setConversion] = useState<number>(1);

  const convertUnits = () => {
    setConversion(convert(quantity, sourceUnit, desiredUnit));
  };

  const handleQuantityChange = (value: string) => {
    const newQuantity = parseFloat(value);
    setQuantity(newQuantity);
  };

  const handleSourceUnitChange = (value: string) => {
    const newSourceUnit = value as UNIT_TYPE;
    const acceptedConversions = getAcceptedConversions(newSourceUnit);
    setSourceUnit(newSourceUnit);
    if (acceptedConversions && !acceptedConversions.includes(desiredUnit)) {
      setDesiredUnit(acceptedConversions[0]);
    }
  };

  const handleDesiredUnitChange = (value: string) => {
    const newDesiredUnit = value as UNIT_TYPE;
    setDesiredUnit(newDesiredUnit);
  };

  const getCapitalizedKey = (value: UNIT_TYPE): string => {
    const capitalizedKey = getKeyFromValue(value);
    return capitalizedKey === undefined ? "" : capitalize(capitalizedKey);
  };

  useEffect(convertUnits, [quantity, sourceUnit, desiredUnit]);

  return (
    <div className="w-full max-w-md bg-gray-800 mb-32 rounded shadow-xl p-8 flex flex-col space-y-6">
      <h1 className="font-semibold text-2xl">Conversion Calculator</h1>
      <div className="space-y-2">
        {/* Quantity */}
        <div className="w-full space-y-2">
          <label htmlFor="" className="w-full">
            Quantity
          </label>
          <input
            className="w-full rounded bg-gray-700 border border-gray-600 px-2 h-11"
            type="number"
            value={quantity}
            onChange={(event) => handleQuantityChange(event.target.value)}
          />
        </div>
        {/* Source Units */}
        <div className="w-full space-y-2">
          <label htmlFor="" className="w-full">
            Source Units
          </label>
          <select
            onChange={(event) => handleSourceUnitChange(event.target.value)}
            className="w-full rounded bg-gray-700 border border-gray-600 px-2 h-11"
          >
            {(Object.keys(UNIT_TYPE) as Array<keyof typeof UNIT_TYPE>).map(
              (unitType) => {
                return (
                  <option
                    key={unitType}
                    value={UNIT_TYPE[unitType]}
                  >{`${capitalize(unitType)} (${UNIT_TYPE[unitType]})`}</option>
                );
              }
            )}
          </select>
        </div>
        {/* Desired Units */}
        <div className="w-full space-y-2">
          <label htmlFor="" className="w-full">
            Desired Units
          </label>
          <select
            onChange={(event) => handleDesiredUnitChange(event.target.value)}
            className="w-full rounded bg-gray-700 border border-gray-600 px-2 h-11"
            value={desiredUnit}
          >
            {getAcceptedConversions(sourceUnit)?.map((unitTypeVal) => {
              return (
                <option
                  key={unitTypeVal}
                  value={unitTypeVal}
                >{`${getCapitalizedKey(unitTypeVal)} (${unitTypeVal})`}</option>
              );
            })}
          </select>
        </div>
      </div>
      {!isNaN(conversion) && (
        <span className="w-full p-2 rounded border border-blue-600 text-center">
          {quantity}&nbsp;
          {sourceUnit} is{" "}
          <span className="font-bold">
            {conversion.toFixed(2)}&nbsp;
            {desiredUnit}
          </span>
        </span>
      )}
    </div>
  );
};

export default Calculator;
