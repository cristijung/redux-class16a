import Link from "next/link";
import NavBar from "../navBar/NavBar";
import { FaShoppingCart } from "react-icons/fa";

export default function Header() {
  return (
    <header className="bg-red-800 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-red-400 font-bold text-xl">
          <span className="text-white">React</span> Redux RTK
        </div>
        <NavBar />
        <div className="text-white mr-4 cursor-pointer p-2 rounded-full hover:bg-red-900">
          <Link href="/loja" legacyBehavior>
            <FaShoppingCart size={24} />
          </Link>
        </div>
      </div>
    </header>
  );
}
