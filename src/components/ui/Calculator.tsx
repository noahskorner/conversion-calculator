const Calculator = () => {
  return (
    <div className="w-full max-w-md bg-gray-800 mb-32 rounded shadow-xl p-4 flex flex-col space-y-6">
      <h1 className="font-semibold text-2xl">Conversion Calculator</h1>
      <div className="space-y-2">
        <div className="w-full space-y-2">
          <label htmlFor="" className="w-full">
            Quantity
          </label>
          <input
            className="w-full rounded bg-gray-700 border border-gray-600 p-2"
            type="text"
          />
        </div>
        <div className="w-full space-y-2">
          <label htmlFor="" className="w-full">
            Quantity
          </label>
          <input
            className="w-full rounded bg-gray-700 border border-gray-600 p-2"
            type="text"
          />
        </div>
        <div className="w-full space-y-2">
          <label htmlFor="" className="w-full">
            Quantity
          </label>
          <input
            className="w-full rounded bg-gray-700 border border-gray-600 p-2"
            type="text"
          />
        </div>
      </div>
      <button className="w-full rounded p-2 bg-blue-600 hover:bg-blue-700 block">
        Convert!
      </button>
    </div>
  );
};

export default Calculator;
