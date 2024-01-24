import logo from "./logo.svg";
import "./App.css";
import Todolist from "./components/todo";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Todolist />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
