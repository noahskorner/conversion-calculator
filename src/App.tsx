import useWindowSize from "./hooks/useWindowSize";
import Calculator from "./components/ui/Calculator";

function App() {
  const { width, height } = useWindowSize();
  return (
    <div
      className="App w-screen h-screen bg-gray-900 flex justify-center items-center p-4 text-white"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <Calculator />
    </div>
  );
}

export default App;
