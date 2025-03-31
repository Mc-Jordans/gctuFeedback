import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { ModeToggle } from "./modeToggle";
import gctuLogo from "../assets/gctuLogo.png";

export function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 dark:bg-gray-900 backdrop-blur-md shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center gap-3">
          <img
            src={gctuLogo}
            alt="GCTU Logo"
            className="h-10 w-10 object-contain"
          />
          <Link to="/" className="flex items-center">
            <h1 className="text-xl font-bold text-blue-900 dark:text-white hover:text-primary transition-colors ">
              GCTU Feedback
            </h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6">
          <Link
            to="/"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link
            to="/departments"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Departments
          </Link>
        </nav>

        {/* Mobile Menu Button and Theme Toggle */}
        <div className="flex items-center gap-2">
          <button
            className="p-2 text-foreground hover:bg-muted rounded-md md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
          <ModeToggle />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden dark:bg-gray-900 backdrop-blur-md shadow-lg">
          <nav className="flex flex-col items-center py-4 gap-2">
            <Link
              to="/"
              className="py-2 px-4 text-sm font-medium text-foreground hover:text-primary hover:bg-muted w-full text-center transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/departments"
              className="py-2 px-4 text-sm font-medium text-foreground hover:text-primary hover:bg-muted w-full text-center transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Departments
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
