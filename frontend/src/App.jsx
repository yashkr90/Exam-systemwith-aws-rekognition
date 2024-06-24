import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import ExamDashboard from './components/pages/exam_dashboard';
import ExamDashboard1 from './components/pages/exam_dashboard1';
import RootLayout from "./components/RootLayout";
import Home from "./components/pages/Home";
import LoginForm from "./components/pages/LoginForm";
import CameraTake from "./components/pages/CameraTake";
// import LoginForm2 from "./components/pages/LoginPage2";

import './App.css'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} >
      <Route path="/" element={<LoginForm />} />
      <Route path="/cameraauth" element={<CameraTake/>} />
      <Route path="/exam_dashboard" element={<ExamDashboard1 />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
