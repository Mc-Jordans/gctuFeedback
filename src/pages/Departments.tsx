import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";

const useClickOutside = (handler: () => void) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) handler();
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handler]);

  return ref;
};

type Department = {
  id: number;
  name: string;
  image: string;
};

const mockDepartments: Department[] = [
  {
    id: 1,
    name: "Computer Science",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    name: "Business Administration",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    name: "Engineering",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    name: "Student Affairs",
    image: "/placeholder.svg?height=200&width=300",
  },
  { id: 5, name: "Finance", image: "/placeholder.svg?height=200&width=300" },
  { id: 6, name: "Library", image: "/placeholder.svg?height=200&width=300" },
];

export function Departments() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchDepartments = () => {
      setTimeout(() => {
        setDepartments(mockDepartments);
        setLoading(false);
      }, 500);
    };
    fetchDepartments();
  }, []);

  const filteredDepartments = departments.filter((dept) =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsDropdownOpen(true);
  };

  const handleDepartmentSelect = (department: Department) => {
    setSearchTerm(department.name);
    setIsDropdownOpen(false);
  };

  const dropdownRef = useClickOutside(() => setIsDropdownOpen(false));

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-50 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white transition-colors duration-300">
      <NavBar />
      <main className="container mx-auto px-4 py-12 pt-24">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/"
            className="inline-block mb-8 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
          >
            ← Back to Home
          </Link>

          <h1 className="text-3xl font-bold mb-8 text-center">Departments</h1>

          <div className="relative mb-8 max-w-md mx-auto" ref={dropdownRef}>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={() => setIsDropdownOpen(true)}
              placeholder="Search departments..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400"
            />
            {isDropdownOpen && filteredDepartments.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-gray-50 dark:bg-gray-950 rounded-lg shadow-lg max-h-60  border border-gray-200 dark:border-gray-700">
                {filteredDepartments.map((dept) => (
                  <div
                    key={dept.id}
                    onClick={() => handleDepartmentSelect(dept)}
                    className="px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-800 cursor-pointer text-gray-900 dark:text-white transition"
                  >
                    {dept.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 dark:border-blue-400"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDepartments.map((department) => (
                <Card
                  key={department.id}
                  className="bg-gray-50 dark:bg-gray-950 rounded-xl shadow-md p-6 flex flex-col items-center justify-between h-72 transition-all hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="w-full h-40 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                    <img
                      src={department.image || "/placeholder.svg"}
                      alt={department.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <h2 className="text-xl font-semibold text-center mt-4">
                    {department.name}
                  </h2>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
