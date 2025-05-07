'use client';
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

const Navbar = React.memo(() => {
  const router = useRouter();
  const [selectedPage, setSelectedPage] = useState("Home");
  const [user] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const pathname = usePathname();

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  const handlePageChange = (page) => setSelectedPage(page);

  const handleLogout = () => {
    console.log("User logged out");
    // Add your logout logic here
  };

  const navItems = ["Home", "Services", "About Us", "My Bookings", ];

  return (
    <div className="w-full h-[10vh] border-b-2">
      <div className="flex h-full justify-between items-center px-4">
        <Link href="/">
          <div className="h-full flex items-center">
            <Image 
              src="/assets/images/logo.svg" 
              alt="Logo" 
              width={120} 
              height={40}
              className="h-full object-contain"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden sm:block h-full">
          <ul className="flex h-full items-center">
            {navItems.map((page) => (
              <li
                key={page}
                className={`mx-5 h-full font-bold cursor-pointer transition-all duration-300 flex items-center ${
                  selectedPage === page ? "border-b-4 border-cyan-500" : ""
                }`}
              >
                <Link
                  href={`/${page.replace(/\s+/g, "").toLowerCase()}`}
                  className="w-full h-full flex items-center justify-center"
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Auth Section */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <p className="text-center h-full flex items-center p-3">
                {user.username || user.email}
              </p>
              <button 
                onClick={handleLogout} 
                className="bg-black text-white px-4 py-2 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => router.push("/login")}
                className="hidden sm:block text-gray-600 hover:text-black transition"
              >
                Log in
              </button>
              <button
                onClick={() => router.push("/register")}
                className="bg-black text-white px-4 py-2 rounded hidden sm:block"
              >
                Register
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="text-2xl sm:hidden text-black"
          onClick={toggleSidebar}
          aria-label="Open menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex sm:hidden">
          <div className="w-64 bg-white h-full shadow-lg z-50 p-6">
            <nav className="mt-10 space-y-4">
              {navItems.map((page) => (
                <Link
                  key={page}
                  href={`/${page.replace(/\s+/g, "").toLowerCase()}`}
                  onClick={() => {
                    handlePageChange(page);
                    setSidebarOpen(false);
                  }}
                  className="block text-lg font-semibold text-gray-800 hover:text-yellow-500 transition"
                >
                  {page}
                </Link>
              ))}
              <div className="border-t pt-4 mt-4">
                {!user ? (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setSidebarOpen(false)}
                      className="block text-lg font-semibold text-gray-800 hover:text-yellow-500 transition mb-2"
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setSidebarOpen(false)}
                      className="block text-lg font-semibold text-gray-800 hover:text-yellow-500 transition"
                    >
                      Register
                    </Link>
                  </>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="w-full text-left block text-lg font-semibold text-gray-800 hover:text-yellow-500 transition"
                  >
                    Logout
                  </button>
                )}
              </div>
            </nav>
          </div>
          <div className="flex-grow" onClick={() => setSidebarOpen(false)} />
        </div>
      )}
    </div>
  );
});

export default Navbar;