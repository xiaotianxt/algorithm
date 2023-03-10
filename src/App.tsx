import Header from "@/components/Header";
import Playground from "@/components/Playground/Scene";

function App() {
  return (
    <div className="h-[100vh] flex flex-col">
      <Header className="relative z-10" />
      <Playground className="z-0 w-full h-full" />
    </div>
  );
}

export default App;
