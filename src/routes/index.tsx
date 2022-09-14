import { Button } from "@mui/material";
import { Routes, Route, Link, Navigate } from "react-router-dom";

export const AppRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<Button>Teste</Button>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
}