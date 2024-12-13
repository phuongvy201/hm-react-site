import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import routerApp from "./router";
import LayoutSite from "./layouts/LayoutSite";
import Login from "./layouts/LayoutSite/Login";
import SignUp from "./layouts/LayoutSite/SignUp";
import { Provider } from "react-redux";
import { AuthProvider } from "./context/AuthContext";
import ScrollToTop from "./components/ScrollToTop";
import store from "./state/store";
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<LayoutSite />}>
              {routerApp.routerSite.map((route, index) => {
                const Page = route.component;
                return (
                  <Route path={route.path} element={<Page />} key={index} />
                );
              })}
            </Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
