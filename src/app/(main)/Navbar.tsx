import SearchField from "../../components/SearchField";
import UserButton from "../../components/UserButton";
import Link from "next/link";
import NavItems from "./NavItems";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 bg-card shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 px-5 py-3">
        <Link href="/" className="text-2xl font-bold text-primary">
          ZB
        </Link>
        {/* <SearchField /> */}
        <div className="flex items-center gap-2 right-0">
        <NavItems className=" hidden h-fit space-y-3  md:flex lg:px-5 " />
        <UserButton className="sm:ms-auto" />
        </div>
      </div>
    </header>
  );
}
