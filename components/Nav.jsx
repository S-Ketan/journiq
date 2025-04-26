"use client";
import React from "react";
import Link from "@node_modules/next/link";
import Image from "@node_modules/next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, getProviders, useSession } from "next-auth/react";

const Nav = () => {
    const { data: session } = useSession();
    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);
  
    useEffect(() => {
      const fetchProviders = async () => {
        const providers = await getProviders();
        setProviders(providers);
      };
      fetchProviders();
    }, []);
  
    return (
      <nav className="flex flex-between w-full pt-3 mb-16 bg-green-400">
        <Link href="/" className="flex flex-center gap-2">
          <Image
            src="/assets/images/logo.svg"
            alt="Logo"
            className="object-contain"
            width={30}
            height={30}
          />
          <p className="">Journiq</p>
        </Link>
  
        <div className="hidden sm:flex">
          {session?.user ? (
            <div className="flex gap-3 md:gap-5">
              <Link href="/create-prompt" className="black_btn">
                Create Prompt
              </Link>
              <button className="outline_btn" type="button" onClick={signOut}>
                Sign Out
              </button>
              <Link href="/profile">
                <Image
                  src={session?.user.image}
                  alt="profile"
                  width={37}
                  height={37}
                  className="rounded-full"
                />
              </Link>
            </div>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider) => (
                  <button
                    className="black_btn"
                    type="button"
                    onClick={() => signIn(provider.id)}
                    key={provider.name}
                  >
                    Sign in with {provider.name}
                  </button>
                ))}
            </>
          )}
        </div>
  
        {/* Mobile Navigation */}
  
        <div className="flex relative sm:hidden">
          {session?.user ? (
            <div className="flex">
              <Image
                src={session?.user.image}
                alt="profile"
                width={37}
                height={37}
                className="rounded-full"
                onClick={() => {
                  setToggleDropdown((prev) => !prev);
                }}
              />
  
              {toggleDropdown && (
                <div className="dropdown">
                  <Link
                    href="/profile"
                    className="dropdown_link"
                    onClick={() => setToggleDropdown(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    href="/create-prompt"
                    className="dropdown_link"
                    onClick={() => setToggleDropdown(false)}
                  >
                    Create Prompt
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setToggleDropdown(false);
                      signOut();
                    }}
                    className="mt-5 w-full black_btn"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider) => (
                  <button
                    className="black_btn"
                    type="button"
                    onClick={() => signIn(provider.id)}
                    key={provider.name}
                  >
                    Sign in with {provider.name}
                  </button>
                ))}
            </>
          )}
        </div>
      </nav>
    );
  };
  
  export default Nav;