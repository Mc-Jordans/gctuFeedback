import gctuLogo from "../assets/gctuLogo.png";
import { Link } from "react-router-dom";
export function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-900 py-8 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <img src={gctuLogo} alt="Logo" width={50} />
          <span className="text-lg font-bold text-white">GCTU Feedback</span>
        </div>
        <div className="text-sm text-center text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} Ghana Communication Technology
          University. All rights reserved.
          <Link to="/departments/staffs">R</Link>
        </div>
      </div>
    </footer>
  );
}
