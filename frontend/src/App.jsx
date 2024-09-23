import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/Error/ErrorPage";
import Blogs from "./components/Home/Blogs/Blogs";
import CreateBlog from "./components/Home/CreateBlogs/CreateBlog";
import Form from "./components/Home/CreateBlogs/Form/Form";
import Home from "./components/Home/Home";
import RootLayout from "./components/RootLayout/RootLayout";
import CreateUser from "./components/Users/CreateUser/CreateUser";
import Login from "./components/Users/Login/Login";
import ShowUsers from "./components/Users/ShowUsers/ShowUsers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "users",
        element: <CreateUser />,
      },
      {
        path: "users/details",
        element: <ShowUsers />,
      },
      {
        path: "signin",
        element: <Login />,
      },
      {
        path: "/blog/create",
        element: <CreateBlog />,
      },
      {
        path: "/blog",
        element: <Blogs />,
      },
      {
        path: "/blog/:id",
        element: <Form />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
