import { Link, NavLink } from "react-router";
import Logo from "../../Components/Logo/Logo";
import useAuth from "../../Hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => {
        console.log(error.message);
      });
  };

  // Navigation links
  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `font-medium transition-colors ${
              isActive
                ? "text-primary font-semibold"
                : "text-base-content hover:text-primary"
            }`
          }
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/allScholarShip"
          className={({ isActive }) =>
            `font-medium transition-colors ${
              isActive
                ? "text-primary font-semibold"
                : "text-base-content hover:text-primary"
            }`
          }
        >
          All Scholarships
        </NavLink>
      </li>

      {/* Dashboard only for logged-in users */}
      {user && (
        <li>
          <NavLink
            to="/dashboard/myProfile"
            className={({ isActive }) =>
              `font-medium transition-colors ${
                isActive
                  ? "text-primary font-semibold"
                  : "text-base-content hover:text-primary"
              }`
            }
          >
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="navbar min-h-[72px] bg-base-100/95 backdrop-blur-md shadow-sm px-4 lg:px-8">
        {/* ================= LEFT SIDE ================= */}
        <div className="navbar-start">
          {/* Mobile Menu */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 w-56 rounded-2xl bg-base-100 p-3 shadow-lg"
            >
              {links}
            </ul>
          </div>

          {/* Logo */}

          <div className="w-20 md:w-20">
            <Link to="/">
              <Logo />
            </Link>
          </div>
        </div>

        {/* ================= CENTER ================= */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal items-center gap-2 px-1">
            {links}
          </ul>
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="navbar-end gap-2">
          {user ? (
            /* ================= LOGGED IN ================= */
            <div className="dropdown dropdown-end">
              {/* Profile Image */}
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle p-0"
              >
                <div className="avatar">
                  <div className="w-11 rounded-full ring-2 ring-primary/20 ring-offset-2 ring-offset-base-100">
                    <img
                      src={
                        user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"
                      }
                      alt={user?.displayName || "User"}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Profile Dropdown */}
              <ul
                tabIndex={0}
                className="dropdown-content z-50 mt-3 w-64 rounded-2xl bg-base-100 p-3 shadow-xl"
              >
                {/* User Info */}
                <li className="mb-2">
                  <div className="flex cursor-default items-center gap-3 rounded-xl px-3 py-3 hover:bg-transparent">
                    <div className="avatar">
                      <div className="w-10 rounded-full">
                        <img
                          src={
                            user?.photoURL ||
                            "https://i.ibb.co/4pDNDk1/avatar.png"
                          }
                          alt={user?.displayName || "User"}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-semibold">
                        {user?.displayName || "ScholarHub User"}
                      </p>

                      <p className="truncate text-xs text-base-content/60">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                </li>

                <div className="divider my-1"></div>

                {/* Dashboard */}
                <li>
                  <Link
                    to="/dashboard/myProfile"
                    className="rounded-xl font-medium"
                  >
                    <span>📊</span>
                    Dashboard
                  </Link>
                </li>

                {/* Logout */}
                <li>
                  <button
                    onClick={handleLogOut}
                    className="rounded-xl font-medium text-error hover:bg-error/10"
                  >
                    <span>↪</span>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            /* ================= NOT LOGGED IN ================= */
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="btn btn-ghost btn-sm px-4 font-medium"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="btn btn-primary btn-sm rounded-lg px-5 font-medium"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
