import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.sass";
import Search from "./pages/search/search";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Search />}></Route>
        <Route path="/user/:nick"></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
