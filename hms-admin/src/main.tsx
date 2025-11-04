import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./dashboard/layout.tsx";
import { Outlet } from "react-router";
import App from "./App.tsx";
import BedsPage from "./pages/BedsPage.tsx";
import InventoryPage from "./pages/InventoryPage.tsx";
import OpdQueuePage from "./pages/opd-queue.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route
        element={
          <Layout>
            <Outlet />
          </Layout>
        }
      >
        <Route path="/" element={<App />} />
        <Route path="/beds" element={<BedsPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/opd-queue" element={<OpdQueuePage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
