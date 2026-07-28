import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Routes>
        <Route path="/" element={<div className="p-8"><h1 className="text-2xl font-bold">Developer Productivity Suite</h1><p className="mt-2 text-gray-600">Coming soon.</p></div>} />
      </Routes>
    </div>
  );
}

export default App;
