"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Hamburger from "./Hamburger";

interface HeaderState {
  initial: boolean | null;
  clicked: boolean | null;
  menuName: string;
}

const Header: React.FC = () => {
  const [state, setState] = useState<HeaderState>({
    initial: false,
    clicked: null,
    menuName: "Menu",
  });
  const [disabled, setDisabled] = useState(false);
  const pathname = usePathname(); // Tracks the current route

  // Reset menu state on route change
  useEffect(() => {
    setState({ initial: null, clicked: false, menuName: "Menu" });
  }, [pathname]); // Trigger when `pathname` changes

  const handleMenu = () => {
    disableMenu();
    if (state.initial === false) {
      setState({ initial: null, clicked: true, menuName: "Close" });
    } else if (state.clicked) {
      setState({ ...state, clicked: false, menuName: "Menu" });
    } else {
      setState({ ...state, clicked: true, menuName: "Close" });
    }
  };

  const disableMenu = () => {
    setDisabled(true);
    setTimeout(() => setDisabled(false), 1200);
  };

  return (
    <header>
      <div className="container">
        <div className="wrapper">
          <div className="inner-header">
            <div className="logo">
              <Link href="/">ZINHLE.</Link>
            </div>
            <div className="menu">
              <button disabled={disabled} onClick={handleMenu}>
                {state.menuName}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Hamburger state={state} />
    </header>
  );
};

export default Header;
