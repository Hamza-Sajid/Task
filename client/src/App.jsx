import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import InstallmentDetails from "./pages/InstallmentDetails";
function App() {
  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-900 w-screen h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/installment/:id" element={<InstallmentDetails />} />
      </Routes>
      {/* className="w-screen h-screen bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900" */}
    </div>
  );
}

export default App;
