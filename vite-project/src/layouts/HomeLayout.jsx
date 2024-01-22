import Navbar from "../pages/components/navbar";
import Footer from "../pages/components/footer";
import Sidebar from "../pages/components/sidebar";
import "./HomeLayout.css";

const HomeLayout = (props) => {
  return (
    <div className="components">
      <div className="sidebar-section">
        <Sidebar />
      </div>

      <div className="body-section">
        <Navbar />
        <div>{props.children}</div>
        <Footer />
      </div>
    </div>
  );
};

export default HomeLayout;
