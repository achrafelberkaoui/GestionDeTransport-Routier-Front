import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

function DashboardLayout({
  children,
  user,
  onLogout,
  navigation,
  activeSection,
  setActiveSection,
  title,
}) {
  return (
    <div className="dashboard-layout">
      <Sidebar
        user={user}
        onLogout={onLogout}
        navigation={navigation}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <main className="dashboard-main">
        <Header user={user} title={title} />

        <div className="dashboard-content">
          {children}
        </div>
      <Footer />
      </main>
    </div>
  );
}

export default DashboardLayout;