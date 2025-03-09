import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import logo from "../../public/webkorps.webp";

function Navbar() {
  const employee = useAppSelector((state) => state.user);
  const admin = useAppSelector((state) => state.admin);

  const user = admin.fname ? admin : employee;

  console.log(user);

  return (
    <div className="flex items-center justify-between mx-2 mt-1 rounded-2xl bg-neutral-950 text-white px-6 py-2">
      <div className="w-1/4">
        <img src={logo} className="h-[6vh] w-[6vh]" alt="WebKorps Logo" />
      </div>
      <nav className="w-1/2 flex justify-around items-center">
        <Link to="/home" className="hover:text-gray-400 transition">
          Home
        </Link>
        <Link to="/profile" className="hover:text-gray-400 transition">
          Profile
        </Link>
      </nav>
      <div className="w-1/4 flex justify-end">
        <Link to={'/profile'}>
          <img
            src={user.profileImage || "https://via.placeholder.com/64"}
            className="rounded-full h-[6vh] w-[6vh] object-cover"
            alt="User Avatar"
          />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
