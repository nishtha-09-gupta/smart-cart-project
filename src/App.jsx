import { useState } from "react";
import { GroceryProvider } from "./context/groceryContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import Home from "./pages/Home.jsx";
import ListPage from "./pages/List.jsx";
import Recipes from "./pages/Recipes.jsx";
import Contact from "./pages/Contact.jsx";
import NotFound from "./pages/NotFound.jsx";
import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";
import Login from "./components/auth/Login.jsx";
import Signup from "./components/auth/Signup.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import PageLayout from "./components/layout/PageLayout.jsx";

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [isLoginForm, setIsLoginForm] = useState(true);

  const toggleAuthForm = () => {
    setIsLoginForm(!isLoginForm);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home setCurrentPage={setCurrentPage} />;
      case "list":
        return <ListPage setCurrentPage={setCurrentPage} />;
      case "recipes":
        return <Recipes setCurrentPage={setCurrentPage} />;
      case "contact":
        return <Contact setCurrentPage={setCurrentPage} />;
      case "login":
        return (
          <PageLayout isAuthPage={true}>
            <Login 
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </PageLayout>
        );
      case "signup":
        return (
          <PageLayout isAuthPage={true}>
            <Signup 
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </PageLayout>
        );
      case "dashboard":
        return <Dashboard />;
      default:
        return <NotFound setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        <GroceryProvider>
          <div className="app">
            <Navbar setCurrentPage={setCurrentPage} currentPage={currentPage} />
            <main className="page-main">
              {renderPage()}
            </main>
            <Footer setCurrentPage={setCurrentPage} />
          </div>
        </GroceryProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
