import { Routes, Route, Link, Navigate } from "react-router-dom";

export const AppRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<p>Teste</p>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
}