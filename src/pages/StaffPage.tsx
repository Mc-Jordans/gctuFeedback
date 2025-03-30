import { StaffReview } from "@/components/StaffReview";
import { Footer } from "@/components/Footer";
import { ModeToggle } from "@/components/modeToggle";
import { useState, useEffect } from "react";
import logo from "../assets/gctuLogo.png";

interface Department {
  id: number;
  name: string;
}

const departments: Department[] = [
  { id: 1, name: "Computer Science" },
  { id: 2, name: "Business Administration" },
  { id: 3, name: "Marketing" },
  { id: 4, name: "Information Technology" },
  { id: 5, name: "Finance" },
  { id: 6, name: "Library" },
];

export function StaffPage() {
  const [currentDepartment, setCurrentDepartment] = useState<Department | null>(
    departments[0]
  );
  const [showModal, setShowModal] = useState(true);
  const [understood, setUnderstood] = useState(false);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showModal]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-50 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white transition-colors duration-300">
      <header className="bg-white dark:bg-gray-900 shadow-sm py-4 fixed w-full z-10">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="relative flex px-1 gap-0.5">
            <img src={logo} alt="GCTU Logo" className="h-12 w-12 self-center" />
            <h1 className="text-2xl font-bold mt-2">
              GCTU Staff Review
              {currentDepartment && (
                <span className="text-blue-600 dark:text-blue-400 ml-2">
                  | {currentDepartment.name}
                </span>
              )}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 pt-24">
        <StaffReview currentDepartment={currentDepartment} />

        {/* Fullscreen Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
                Tips for Providing Effective Feedback
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-200 dark:bg-gray-700 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">
                      1
                    </span>
                  </div>
                  <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">
                    Be Specific
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Provide concrete examples of what went well or could be
                    improved.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-200 dark:bg-gray-700 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">
                      2
                    </span>
                  </div>
                  <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">
                    Be Constructive
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Focus on actions and behaviors rather than personal
                    criticism.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-200 dark:bg-gray-700 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">
                      3
                    </span>
                  </div>
                  <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">
                    Be Balanced
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Include both positive aspects and suggestions for
                    improvement.
                  </p>
                </div>
              </div>

              {/* Checkbox and Continue Button */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={understood}
                    onChange={(e) => setUnderstood(e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600"
                  />
                  <span className="text-gray-900 dark:text-white">
                    I understand
                  </span>
                </label>
                <button
                  onClick={() => setShowModal(false)}
                  disabled={!understood}
                  className={`px-6 py-2 rounded-lg font-medium ${
                    understood
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
