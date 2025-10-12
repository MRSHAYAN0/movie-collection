import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import SingleMovie from "./SingleMovie";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/movie/:id",
    element: <SingleMovie />,
  },
]);
