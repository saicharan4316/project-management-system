
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Manager from "./pages/Manager";
import Developer from "./pages/Developer";
import Protected from "./components/Protected";
import Activity from "./pages/Activity";
import Forgot from "./pages/Forgot";
import Reset from "./pages/Reset";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/admin" element={
          <Protected role="Admin"><Admin /></Protected>
        }/>

        <Route path="/manager" element={
          <Protected role="Manager"><Manager /></Protected>
        }/>

        <Route path="/developer" element={
          <Protected role="Developer"><Developer /></Protected>
        }/>
        <Route path="/activity" element={
  <Protected role={null}>
    <Activity />
  </Protected>
         }/>
         <Route path="/forgot" element={<Forgot />} />
<Route path="/reset/:token" element={<Reset />} />
      </Routes>
    </BrowserRouter>
  );
}