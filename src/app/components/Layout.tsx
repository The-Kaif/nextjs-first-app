// Import React and the necessary components
import React, { ReactNode } from "react";
import NavBar from "./Navbar";
import SideBar from "./SideBar";

// Define the prop types for the Layout component
interface LayoutProps {
  children: ReactNode; // ReactNode allows rendering any valid JSX
}

// Define the Layout component
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      {/* Include the navigation bar */}
      <NavBar />

      {/* Include the sidebar */}
      <SideBar />

      {/* Main content area */}
      <div className="p-4 sm:ml-64">
        {/* Border and styling for the content */}
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          {/* Render the children components, which are the actual content */}
          {children}
        </div>
      </div>
    </div>
  );
};

// Export the Layout component
export default Layout;
