import { Star, BarChart3, QrCode } from "lucide-react";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-50 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white transition-colors duration-300">
      <NavBar />
      <main className="container mx-auto px-4 py-12 pt-24">
        <section className="mb-16 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Help Improve Your University Experience
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Your feedback helps us enhance the quality of service across all
            departments at Ghana Communication Technology University.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="bg-gray-50 dark:bg-gray-950">
            <CardHeader className="flex flex-col items-center">
              <QrCode className="h-10 w-10 text-blue-600 dark:text-blue-400 mb-2" />
              <h3 className="text-xl font-semibold mb-2">Scan & Rate</h3>
              <p className="text-gray-600 dark:text-gray-400 text-center">
                Scan the QR code at any department to quickly provide feedback
                about your experience.
              </p>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="mx-auto rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 flex items-center justify-center h-[200px]">
                  <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <QrCode className="h-16 w-16 text-gray-500 dark:text-gray-400" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-blue-600 text-white">
                View Sample QR
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-gray-50 dark:bg-gray-950">
            <CardHeader className="flex flex-col items-center">
              <Star className="h-10 w-10 text-blue-600 dark:text-blue-400 mb-2" />
              <h3 className="text-xl font-semibold mb-2">Rate Staff Members</h3>
              <p className="text-gray-600 dark:text-gray-400 text-center">
                Provide honest feedback about your interaction with university
                staff.
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center space-x-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="h-10 w-10 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-center">
                Your ratings help us recognize excellent service and identify
                areas for improvement.
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-blue-600 text-white">
                Try Demo Rating
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-gray-50 dark:bg-gray-950">
            <CardHeader className="flex flex-col items-center">
              <BarChart3 className="h-10 w-10 text-blue-600 dark:text-blue-400 mb-2" />
              <h3 className="text-xl font-semibold mb-2">Impact Dashboard</h3>
              <p className="text-gray-600 dark:text-gray-400 text-center">
                See how your feedback is helping improve university services.
              </p>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
                <BarChart3 className="h-16 w-16 text-gray-500 dark:text-gray-400" />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500 hover:bg-blue-50 dark:hover:bg-gray-800"
              >
                Learn More
              </Button>
            </CardFooter>
          </Card>
        </section>

        <section className="bg-blue-100 dark:bg-gray-800 rounded-xl p-8 mb-16">
          <h2 className="text-2xl font-bold mb-4">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-200 dark:bg-gray-700 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <span className="text-blue-600 dark:text-blue-400 font-bold">
                  1
                </span>
              </div>
              <h3 className="text-lg font-medium mb-2">Scan QR Code</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Scan the QR code displayed in the department after receiving
                service.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-200 dark:bg-gray-700 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <span className="text-blue-600 dark:text-blue-400 font-bold">
                  2
                </span>
              </div>
              <h3 className="text-lg font-medium mb-2">Select Staff</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Choose the staff member you want to rate from the list.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-200 dark:bg-gray-700 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <span className="text-blue-600 dark:text-blue-400 font-bold">
                  3
                </span>
              </div>
              <h3 className="text-lg font-medium mb-2">Submit Rating</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Rate your experience and provide optional comments for
                improvement.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
