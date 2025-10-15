import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import SingleMovie from "./SingleMovie";
import Genres from "./Genres";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/movie/:id",
    element: <SingleMovie />,
  },
  { path: "/genres", element: <Genres /> },
]);
