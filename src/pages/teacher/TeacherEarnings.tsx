import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  IndianRupee,
  TrendingUp,
  Calendar,
  Download,
  Loader2,
  Wallet,
  PiggyBank,
  CreditCard,
  BookOpen,
  Users,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { useTeacherEarnings } from "@/hooks/useTeacher";
import { useMyCoursesTeacher } from "@/hooks/useCourses";

const TeacherEarnings = () => {
  const [period, setPeriod] = useState("all");
  
  const { data: earningsData, isLoading: isLoadingEarnings } = useTeacherEarnings();
  const { data: coursesData, isLoading: isLoadingCourses } = useMyCoursesTeacher();

  const earnings = earningsData?.data?.earnings || [];
  const totalEarnings = earningsData?.data?.total || 0;
  const courses = coursesData?.data || [];

  // Calculate stats
  const thisMonthEarnings = earnings
    .filter((e) => {
      const date = new Date(e.createdAt);
      const now = new Date();
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    })
    .reduce((sum, e) => sum + (e.course?.price || 0), 0);

  const lastMonthEarnings = earnings
    .filter((e) => {
      const date = new Date(e.createdAt);
      const now = new Date();
      const lastMonth = now.getMonth() === 0 ? 11 : now.getMonth() - 1;
      const lastMonthYear = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();
      return date.getMonth() === lastMonth && date.getFullYear() === lastMonthYear;
    })
    .reduce((sum, e) => sum + (e.course?.price || 0), 0);

  const growthPercentage = lastMonthEarnings > 0 
    ? ((thisMonthEarnings - lastMonthEarnings) / lastMonthEarnings * 100).toFixed(1)
    : thisMonthEarnings > 0 ? "100" : "0";

  const isGrowthPositive = Number(growthPercentage) >= 0;

  const totalStudents = courses.reduce((sum, c) => sum + (c._count?.enrollments || 0), 0);

  // Filter earnings by period
  const filteredEarnings = earnings.filter((e) => {
    if (period === "all") return true;
    const date = new Date(e.createdAt);
    const now = new Date();
    
    switch (period) {
      case "today":
        return date.toDateString() === now.toDateString();
      case "week":
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return date >= weekAgo;
      case "month":
        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
      case "year":
        return date.getFullYear() === now.getFullYear();
      default:
        return true;
    }
  });

  const filteredTotal = filteredEarnings.reduce((sum, e) => sum + (e.course?.price || 0), 0);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const isLoading = isLoadingEarnings || isLoadingCourses;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-16 px-4 bg-secondary">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Earnings</h1>
              <p className="text-muted-foreground">
                Track your revenue and course performance
              </p>
            </div>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2 text-muted-foreground">Loading earnings...</span>
            </div>
          ) : (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Earnings</p>
                        <p className="text-3xl font-bold mt-1">₹{totalEarnings.toLocaleString()}</p>
                      </div>
                      <div className="bg-green-100 p-3 rounded-full">
                        <Wallet className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">This Month</p>
                        <p className="text-3xl font-bold mt-1">₹{thisMonthEarnings.toLocaleString()}</p>
                        <div className={`flex items-center mt-1 text-sm ${isGrowthPositive ? 'text-green-600' : 'text-red-600'}`}>
                          {isGrowthPositive ? (
                            <ArrowUpRight className="h-4 w-4" />
                          ) : (
                            <ArrowDownRight className="h-4 w-4" />
                          )}
                          <span>{growthPercentage}% from last month</span>
                        </div>
                      </div>
                      <div className="bg-blue-100 p-3 rounded-full">
                        <TrendingUp className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Students</p>
                        <p className="text-3xl font-bold mt-1">{totalStudents}</p>
                      </div>
                      <div className="bg-purple-100 p-3 rounded-full">
                        <Users className="h-6 w-6 text-purple-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Active Courses</p>
                        <p className="text-3xl font-bold mt-1">
                          {courses.filter((c) => c.isPublished).length}
                        </p>
                      </div>
                      <div className="bg-orange-100 p-3 rounded-full">
                        <BookOpen className="h-6 w-6 text-orange-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Earnings Table */}
              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardTitle>Transaction History</CardTitle>
                      <CardDescription>
                        View all your course enrollments and earnings
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-4">
                      <Select value={period} onValueChange={setPeriod}>
                        <SelectTrigger className="w-[180px]">
                          <Calendar className="h-4 w-4 mr-2" />
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Time</SelectItem>
                          <SelectItem value="today">Today</SelectItem>
                          <SelectItem value="week">This Week</SelectItem>
                          <SelectItem value="month">This Month</SelectItem>
                          <SelectItem value="year">This Year</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {filteredEarnings.length === 0 ? (
                    <div className="text-center py-12">
                      <PiggyBank className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">No transactions yet</h3>
                      <p className="text-muted-foreground">
                        {period === "all" 
                          ? "Start creating and publishing courses to earn money"
                          : "No transactions found for the selected period"}
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Date</TableHead>
                              <TableHead>Course</TableHead>
                              <TableHead>Student</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredEarnings.map((earning) => (
                              <TableRow key={earning.id}>
                                <TableCell className="text-muted-foreground">
                                  {formatDate(earning.createdAt)}
                                </TableCell>
                                <TableCell className="font-medium">
                                  {earning.course?.title || "N/A"}
                                </TableCell>
                                <TableCell>
                                  {earning.student?.user?.name || "N/A"}
                                </TableCell>
                                <TableCell>
                                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                    <CreditCard className="h-3 w-3 mr-1" />
                                    Completed
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-right font-semibold text-green-600">
                                  +₹{earning.course?.price?.toLocaleString() || 0}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>

                      {/* Summary */}
                      <div className="flex items-center justify-between mt-4 pt-4 border-t">
                        <p className="text-muted-foreground">
                          Showing {filteredEarnings.length} transaction(s)
                        </p>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">
                            {period === "all" ? "Total" : "Period Total"}
                          </p>
                          <p className="text-2xl font-bold text-green-600">
                            ₹{filteredTotal.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Top Performing Courses */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Top Performing Courses</CardTitle>
                  <CardDescription>
                    Your courses ranked by number of enrollments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {courses.filter(c => c.isPublished).length === 0 ? (
                    <div className="text-center py-8">
                      <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">No published courses yet</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {courses
                        .filter(c => c.isPublished)
                        .sort((a, b) => (b._count?.enrollments || 0) - (a._count?.enrollments || 0))
                        .slice(0, 5)
                        .map((course, index) => (
                          <div key={course.id} className="flex items-center gap-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white
                              ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-amber-600' : 'bg-muted text-muted-foreground'}`}>
                              {index + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate">{course.title}</p>
                              <p className="text-sm text-muted-foreground">
                                {course._count?.enrollments || 0} students enrolled
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">₹{course.price}</p>
                              <p className="text-sm text-green-600">
                                ₹{((course._count?.enrollments || 0) * course.price).toLocaleString()} earned
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TeacherEarnings;
