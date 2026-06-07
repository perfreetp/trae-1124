import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import Dashboard from "@/pages/Dashboard";
import Devices from "@/pages/Devices";
import Tickets from "@/pages/Tickets";
import Inspection from "@/pages/Inspection";
import Emergency from "@/pages/Emergency";
import SpareParts from "@/pages/SpareParts";
import DutyLog from "@/pages/DutyLog";
import Analytics from "@/pages/Analytics";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/devices" element={<Devices />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/inspection" element={<Inspection />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/spare-parts" element={<SpareParts />} />
          <Route path="/duty-log" element={<DutyLog />} />
          <Route path="/analytics" element={<Analytics />} />
        </Route>
      </Routes>
    </Router>
  );
}
