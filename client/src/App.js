import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Topbar from "./components/topbar/Topbar"
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Create from "./pages/create/Create";
import List from "./pages/list/List"
import Update from "./pages/update/Update"

function App() {
  return (
    <Router>
      <Topbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Register />} />
        <Route path="/create" element={<Create />} />
        <Route path="/list" element={<List />} />
        <Route path="/update/:id" element={<Update />} />
      </Routes>
    </Router>
  );
}

export default App;
