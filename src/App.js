import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard.js";
import Login from "./components/Login.js";
import MrfForm from "./components/MrfForm.js";
import Test from "./components/QrScanner.js";

function App() {
  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/qrScan" element={<Test />} />
                <Route path="/mrf-form" element={<MrfForm />} />
                <Route
                    path="*"
                    element={
                        <div className="container mt-5">
                            <h1 className="text-center">404 Page Not Found</h1>
                        </div>
                    }
                />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
