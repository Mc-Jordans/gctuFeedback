import { Button } from "@/components/ui/button";
import { useEffect, useState, useMemo } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Search, Star } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface StaffData {
  id: number;
  title: string;
  firstName: string;
  lastName: string;
  role: string;
  department: string;
  profilePic?: string; // Added optional profile picture
}

interface Department {
  id: number;
  name: string;
}

interface StaffReviewProps {
  currentDepartment: Department | null;
}

// Updated mock data with some profile pictures
const mockStaffMembers: StaffData[] = [
  {
    id: 1,
    title: "Dr.",
    firstName: "John",
    lastName: "Doe",
    role: "Head of Department",
    department: "Computer Science",
    profilePic: "/src/assets/images/chen.jpg", // Example path
  },
  {
    id: 2,
    title: "Mr.",
    firstName: "Philip",
    lastName: "Clark",
    role: "Junior Administrator",
    department: "Computer Science",
    profilePic: "/images/staff/john-doe.jpg", // Example path
  },
  {
    id: 3,
    title: "Mrs.",
    firstName: "Alice",
    lastName: "Brown",
    role: "Senior Software Engineer",
    department: "Computer Science",
    profilePic: "/src/assets/images/sarahJohnson.jpg",
  },
  {
    id: 4,
    title: "Dr.",
    firstName: "Jane",
    lastName: "Sayi",
    role: "Head of Department",
    department: "Marketing",
    profilePic: "/images/staff/john-doe.jpg", // Example path
  },
  {
    id: 5,
    title: "Prof.",
    firstName: "Samuel",
    lastName: "Johnson",
    role: "Senior Lecturer",
    department: "Business Administration",
    profilePic: "/images/staff/john-doe.jpg", // Example path
  },
  {
    id: 6,
    title: "Ms.",
    firstName: "Elizabeth",
    lastName: "Taylor",
    role: "Department Secretary",
    department: "Information Technology",
    profilePic: "/images/staff/john-doe.jpg", // Example path
  },
  {
    id: 7,
    title: "Dr.",
    firstName: "Robert",
    lastName: "Chen",
    role: "Associate Professor",
    department: "Finance",
    profilePic: "/src/assets/images/chen.jpg",
  },
  {
    id: 8,
    title: "Mrs.",
    firstName: "Jennifer",
    lastName: "Adams",
    role: "Head Librarian",
    department: "Library",
    profilePic: "/src/assets/images/rodrigez.jpg", // Example path
  },
];

export function StaffReview({ currentDepartment }: StaffReviewProps) {
  const [staffMembers, setStaffMembers] = useState<StaffData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStaff, setSelectedStaff] = useState<StaffData | null>(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 500));
        setStaffMembers(mockStaffMembers);
      } catch (error) {
        console.error("Failed to fetch staff members:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStaff();
  }, []);

  const filteredStaff = useMemo(() => {
    return staffMembers.filter((staff) => {
      const matchesSearch = `${staff.firstName} ${staff.lastName} ${staff.role}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesDepartment =
        currentDepartment === null ||
        staff.department === currentDepartment.name;
      return matchesSearch && matchesDepartment;
    });
  }, [staffMembers, searchTerm, currentDepartment]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleFeedbackChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedback(e.target.value);
  };

  const handleReviewSubmit = () => {
    console.log({
      staffId: selectedStaff?.id,
      rating,
      feedback,
      timestamp: new Date(),
    });
    setRating(0);
    setFeedback("");
    setDialogOpen(false);
    alert(
      `Review for ${selectedStaff?.title} ${selectedStaff?.firstName} ${selectedStaff?.lastName} submitted successfully!`
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Staff Review Portal
              {currentDepartment && (
                <span className="text-blue-600 dark:text-blue-400">
                  {" - "}
                  {currentDepartment.name}
                </span>
              )}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Rate and provide feedback for department staff members
            </p>
          </div>
          <div className="w-full sm:w-64 relative">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search staff..."
              className="w-full px-4 py-2 pl-10 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
              aria-label="Search staff"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 dark:text-gray-500" />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-10">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 dark:border-blue-400 border-r-transparent"
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Loading staff members...
          </p>
        </div>
      ) : filteredStaff.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-600 dark:text-gray-400">
            No staff members found matching your search
            {currentDepartment &&
              ` in the ${currentDepartment.name} department`}
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-4 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800"
            onClick={() => setSearchTerm("")}
          >
            Clear search
          </Button>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Showing {filteredStaff.length} staff member
            {filteredStaff.length !== 1 ? "s" : ""}
            {currentDepartment && ` in ${currentDepartment.name}`}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredStaff.map((staff) => (
              <StaffCard
                key={staff.id}
                staff={staff}
                onReviewClick={() => {
                  setSelectedStaff(staff);
                  setDialogOpen(true);
                }}
              />
            ))}
          </div>
        </>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white">
              {selectedStaff &&
                `Review ${selectedStaff.title} ${selectedStaff.firstName} ${selectedStaff.lastName}`}
            </DialogTitle>
          </DialogHeader>

          {selectedStaff && (
            <div className="py-4">
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Staff Information:
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedStaff.title} {selectedStaff.firstName}{" "}
                  {selectedStaff.lastName}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedStaff.role}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedStaff.department}
                </p>
              </div>

              <div className="mb-4">
                <h3 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Rating:
                </h3>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRatingChange(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`h-8 w-8 ${
                          star <= (hoverRating || rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300 dark:text-gray-600"
                        } transition-colors duration-150`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Feedback:
                </h3>
                <Textarea
                  value={feedback}
                  onChange={handleFeedbackChange}
                  placeholder="Provide detailed feedback on performance, strengths, and areas for improvement..."
                  className="min-h-32 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              className="border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button
              onClick={handleReviewSubmit}
              disabled={rating === 0 || feedback.trim() === ""}
              className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white"
            >
              Submit Review
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function StaffCard({
  staff,
  onReviewClick,
}: {
  staff: StaffData;
  onReviewClick: () => void;
}) {
  const initials = `${staff.firstName[0]}${staff.lastName[0]}`;

  return (
    <Card className="w-full bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardHeader className="p-4 pb-2 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-2 overflow-hidden">
          {staff.profilePic ? (
            <img
              src={staff.profilePic}
              alt={`${staff.firstName} ${staff.lastName}'s profile`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                const nextSibling = e.currentTarget.nextElementSibling;
                if (nextSibling instanceof HTMLElement) {
                  nextSibling.style.display = "flex";
                }
              }}
            />
          ) : (
            <div className="w-full h-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 text-xl font-bold">
              {initials}
            </div>
          )}
          {/* Hidden fallback initials for image error case */}
          {staff.profilePic && (
            <div className="w-full h-full bg-blue-100 dark:bg-blue-900 items-center justify-center text-blue-600 dark:text-blue-400 text-xl font-bold hidden">
              {initials}
            </div>
          )}
        </div>
        <CardTitle className="text-lg font-semibold text-center text-gray-900 dark:text-white">
          {staff.title} {staff.firstName} {staff.lastName}
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400 text-center">
          {staff.role}
        </CardDescription>
      </CardHeader>
      <CardFooter className="p-4">
        <Button
          onClick={onReviewClick}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          Review & Rate
        </Button>
      </CardFooter>
    </Card>
  );
}
