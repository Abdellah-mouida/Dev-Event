import Image from "next/image";
import Link from "next/link";
import React from "react";

const NavBar = () => {
  return (
    <header>
      <nav>
        <Link href="/" aria-label="Dev Event" className="logo">
          <Image
            src="/icons/logo.png"
            alt="Dev Event Logo"
            width={24}
            height={24}
          />
          Dev Event
        </Link>
      </nav>
    </header>
  );
};

export default NavBar;
