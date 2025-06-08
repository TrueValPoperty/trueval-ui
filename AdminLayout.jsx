import { Link, Outlet, useLocation } from 'react-router-dom';

const tabs = [
  { name: "Dashboard", path: "/" },
  { name: "Logs", path: "/logs" },
  { name: "Users", path: "/users" },
  { name: "Settings", path: "/settings" }
];

export default function AdminLayout() {
  const { pathname } = useLocation();

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4 space-y-4">
        <h2 className="text-lg font-bold">TrueVal Admin</h2>
        <nav className="space-y-2">
          {tabs.map(tab => (
            <Link
              key={tab.name}
              to={tab.path}
              className={`block px-2 py-1 rounded ${
                pathname === tab.path ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
            >
              {tab.name}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
