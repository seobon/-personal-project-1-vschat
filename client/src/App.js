import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SBProjectChat from "./components/SBProjectChat";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
// import Chat from "./components/Chat";


export default function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/chat" element={<SBProjectChat />} />
            </Routes>
        </Router>
    );
}

