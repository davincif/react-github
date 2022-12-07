import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.sass";
import Search from "./pages/search/search";
import ShowUsers from "./pages/showUser/showUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Search />}></Route>
        <Route path="/user" element={<ShowUsers />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
