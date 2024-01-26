import "./App.css";
import TvList from "./components/tvList";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <Routes>
        <Route path="*" element={<TvList />} />
      </Routes>
    </>
  );
}

export default App;
