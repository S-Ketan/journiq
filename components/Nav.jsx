'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { useSession, signIn, signOut } from 'next-auth/react';

const Navbar = React.memo(() => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [selectedPage, setSelectedPage] = useState('Home');
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    setSidebarOpen(false);
    // Set selected page based on pathname
    const pageMap = {
      '/': 'Home',
      '/services': 'Services',
      '/aboutus': 'About Us',
      '/mybookings': 'My Bookings',
      '/expenses': 'Expenses',
    };
    setSelectedPage(pageMap[pathname] || 'Home');
  }, [pathname]);

  const handlePageChange = (page) => setSelectedPage(page);

  const handleGoogleSignIn = async () => {
    try {
      await signIn('google', { callbackUrl: '/mybookings' });
    } catch (error) {
      console.error('Sign-in failed:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: '/' });
      setSelectedPage('Home');
    } catch (error) {
      console.error('Sign-out failed:', error);
    }
  };

  const navItems = ['Home', 'Services', 'About Us', 'My Bookings', 'Expenses'];

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
                  selectedPage === page ? 'border-b-4 border-cyan-500' : ''
                }`}
              >
                <Link
                  href={`/${page.replace(/\s+/g, '').toLowerCase()}`}
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
          {status === 'authenticated' ? (
            <>
              <p className="text-center h-full flex items-center p-3">
                { session.user.email }
              </p>
              <button
                onClick={handleSignOut}
                className="bg-black text-white px-4 py-2 rounded cursor-pointer"
              >
                Sign Out
              </button>
            </>
          ) : (
            <button
              onClick={handleGoogleSignIn}
              className="flex items-center bg-black text-white px-4 py-2 rounded cursor-pointer"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1.02.68-2.29 1.08-3.71 1.08-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C4.01 20.73 7.74 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.74 1 4.01 3.27 2.18 6.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign in with Google
            </button>
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
                  href={`/${page.replace(/\s+/g, '').toLowerCase()}`}
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
                {status === 'authenticated' ? (
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left block text-lg font-semibold text-gray-800 hover:text-yellow-500 transition cursor-pointer"
                  >
                    Sign Out
                  </button>
                ) : (
                  <button
                    onClick={handleGoogleSignIn}
                    className="w-full text-left block text-lg font-semibold text-gray-800 hover:text-yellow-500 transition cursor-pointer"
                  >
                    Sign in with Google
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