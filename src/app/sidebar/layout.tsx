import Header from "./components/header";
import Sidebar from "./components/sidebar";

const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Sidebar />
            <Header />
            {children}
        </>
    );
};

export default SidebarLayout;
