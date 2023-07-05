import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import useAuthCheck from "./hooks/useAuthCheck.js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  toggleCollapsed,
  toggleShowBtn,
} from "./redux/features/sidebar/sidebarSlice.js";

function App() {
  const authChecked = useAuthCheck();
  const dispatch = useDispatch();

  useEffect(() => {
    window.addEventListener("resize", (e) => {
      if (e?.target?.innerWidth > 991) {
        dispatch(toggleCollapsed({ show: false }));
        dispatch(toggleShowBtn({ show: false }));
      } else {
        dispatch(toggleShowBtn({ show: true }));
      }
    });
  }, [dispatch]);

  return authChecked ? (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
      </Routes>
    </BrowserRouter>
  ) : (
    <div>Checking Authentication...</div>
  );
}

export default App;
