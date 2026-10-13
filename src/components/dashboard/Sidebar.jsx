import {
  LayoutDashboard,
  WalletCards,
  ArrowLeftRight,
  CreditCard,
  Receipt,
  Settings,
  LogOut,
  X,
} from "lucide-react";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
export default function Sidebar({ mobileOpen, setMobileOpen }) {
   const navigate = useNavigate();
  const menuItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      active: true,
    },
    {
      label: "Accounts",
      icon: WalletCards,
    },
    {
      label: "Transfers",
      icon: ArrowLeftRight,
    },
    {
      label: "Cards",
      icon: CreditCard,
    },
    {
      label: "Payments",
      icon: Receipt,
    },
    {
      label: "Settings",
      icon: Settings,
    },
  ];
   const logOut = async() => { 
      try { 
      await signOut(auth);
      alert('Signout succesfull')
      // Temporary demo navigation
    navigate("/");
    } catch (error) {
    
    } 
  }

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`
          fixed lg:sticky
          top-0 left-0
          z-50
          h-screen
          w-72
          bg-white
          border-r border-slate-200
          flex flex-col
          transition-transform duration-300
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo */}
        <div className="h-20 px-7 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
              N
            </div>

            <span className="font-bold text-xl tracking-tight text-slate-900">
              NOVABANK
            </span>
          </div>

          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden text-slate-500"
          >
            <X size={22} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-3 mb-3">
            Menu
          </p>

          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.label}
                  className={`
                    w-full
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                    rounded-xl
                    text-sm
                    font-medium
                    transition
                    ${
                      item.active
                        ? "bg-blue-50 text-blue-600"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                    }
                  `}
                >
                  <Icon size={19} />
                  {item.label}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-slate-100">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-500 hover:bg-red-50 hover:text-red-600 transition"
          onClick ={logOut}>
            <LogOut size={19} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}