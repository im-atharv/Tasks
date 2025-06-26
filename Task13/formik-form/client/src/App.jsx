import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CheckoutForm from "./pages/CheckoutForm";
import SuccessPage from "./pages/SuccessPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CheckoutForm />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </Router>
  );
}

export default App;
