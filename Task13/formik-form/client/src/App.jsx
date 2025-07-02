import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StripeRedirectHandler from "./pages/StripeRedirectHandler.jsx";
import SuccessPage from "./pages/SuccessPage";
import CheckoutForm from "./pages/CheckoutForm";
import FailurePage from "./pages/FailurePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CheckoutForm />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/failure" element={<FailurePage />} />
        <Route path="/stripe-redirect-handler" element={<StripeRedirectHandler />} />
      </Routes>
    </Router>
  );
}

export default App;
