import Logo from "../../Components/Logo/Logo";
import { NavLink } from "react-router";
import { Link } from "react-router";
import useAuth from "../../Hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const handleLogOut = () => {
    logOut()
      .then()
      .catch((error) => {
        console.log(error.message);
      });
  };
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/allScholarShip" className="mx-6">
          Scholarship
        </NavLink>
      </li>
    </>
  );
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <div className="btn btn-ghost text-xl h-[50px] w-[80px]">
            <Logo></Logo>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end mr-5">
          {user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} className="m-1">
                <img className="w-[60px] h-[50px] rounded-full" src={user?.photoURL} alt="photoURL" />
              </div>
              <ul
                tabIndex="-1"
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
              >
                <li>
                  <button onClick={handleLogOut}>Log Out</button>
                </li>
                <li>
                 <Link to='/dashboard'>
                  <button className="btn btn-primary">Dashboard</button>
                 </Link>
                </li>
              </ul>
            </div>
          ) : (
            <div>
              <p className="btn">
                <Link to="/login">Log In</Link>
              </p>
              <p className="btn">
                <Link to="/register">Register</Link>
              </p>{" "}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
