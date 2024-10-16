import React, { Suspense, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingSpinner from "./utils/Loader";
import Header from "./view/Header";
import Fotter from "./view/Footer";
import { PublicRoute } from "./view/Routes/PublicRoute";
import { PrivateRoute } from "./view/Routes/PrivateRoute";
import { RouterProvider } from "./view/Routes/RouterProvider";
import { useContextValue } from "./Context/Contect";
import { checkValidationToken } from "./api-service/UserService";
import { Hotel } from "./view/AdminAction/AdminControlePanen";
import { AdminRouterProvider } from "./view/Routes/AdminRouterProvider";

function App() {
  const { loginUser, logOutUser } = useContextValue();

  useEffect(() => {
    (async () => {
      const response = await checkValidationToken();

      if (response?.status) {
        loginUser();
      } else {
        logOutUser();
      }
    })();
  }, []);

  return (
    <>
      <Router>
        <Header />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {PublicRoute?.map((item) => (
              <Route
                key={item.path}
                path={item.path}
                element={<item.element />}
              />
            ))}

            {PrivateRoute?.map((item) => (
              <Route
                key={item.path}
                path={item.path}
                element={
                  <RouterProvider>
                    <item.element />
                  </RouterProvider>
                }
              />
            ))}
            <Route path="/admin/dashboard" element={<AdminRouterProvider>
              <Hotel/>
            </AdminRouterProvider>
            } />
          </Routes>
        </Suspense>
        <Fotter />
      </Router>
    </>
  );
}

export default App;
