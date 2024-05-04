import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage/HomePage";
import QuizPage from "../pages/QuizPage/QuizPage";
import InfoPage from "../pages/InfoPage/InfoPage";
import GuessNumberPage from "../pages/GamePage/GuessNumberPage";
import AdminLogin from "../pages/AdminPages/AdminLogin";
import AdminExplore from "../pages/AdminPages/AdminExplore";
import ManageQuestions from "../pages/AdminPages/ManageQuestions";
import ManageOptions from "../pages/AdminPages/ManageOptions";
import ManageAreas from "../pages/AdminPages/ManageAreas";


export const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <App/>,
            children: [
                {path: "", element: <HomePage/>},
                {path: "quiz", element: <QuizPage/>},
                {path: "info", element: <InfoPage/>},
                {path: "game", element: <GuessNumberPage/>},
                {path: "admin", element: <AdminLogin/>},
                {path: "adminexplore", element: <AdminExplore/>},
                {path: "managequestions", element: <ManageQuestions/>},
                {path: "manageoptions", element: <ManageOptions/>},
                {path: "manageareas", element: <ManageAreas/>}
            ]
        }
    ]
)