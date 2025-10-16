import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import SingleMovie from "./SingleMovie";
import Genre from "./Genre";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/movie/:id",
    element: <SingleMovie />,
  },
  { path: "/genre/:id", element: <Genre /> },
]);
