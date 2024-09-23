import { createContext, useState } from "react";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [blog, setBlog] = useState({
    title: "",
    content: "",
    image: "",
    category: "",
  });
  const [editBlog, setEditBlog] = useState(false);

  return (
    <AppContext.Provider
      value={{ token, setToken, blog, setBlog, editBlog, setEditBlog }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
