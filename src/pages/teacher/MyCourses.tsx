import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Video,
  Plus,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Users,
  Star,
  Loader2,
  BookOpen,
  CheckCircle,
  Clock,
} from "lucide-react";
import { useMyCoursesTeacher, useDeleteCourse, usePublishCourse } from "@/hooks/useCourses";
import { useToast } from "@/hooks/use-toast";

const MyCourses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: coursesData, isLoading, refetch } = useMyCoursesTeacher();
  const deleteMutation = useDeleteCourse();
  const publishMutation = usePublishCourse();

  const courses = coursesData?.data || [];

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async () => {
    if (!courseToDelete) return;

    try {
      await deleteMutation.mutateAsync(courseToDelete);
      toast({
        title: "Course Deleted",
        description: "Your course has been deleted successfully.",
      });
      refetch();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Delete Failed",
        description: "Failed to delete course. Please try again.",
      });
    } finally {
      setDeleteDialogOpen(false);
      setCourseToDelete(null);
    }
  };

  const handlePublish = async (courseId: string) => {
    try {
      await publishMutation.mutateAsync(courseId);
      toast({
        title: "Course Published",
        description: "Your course is now visible to students.",
      });
      refetch();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Publish Failed",
        description: error.response?.data?.message || "Failed to publish course.",
      });
    }
  };

  const openDeleteDialog = (courseId: string) => {
    setCourseToDelete(courseId);
    setDeleteDialogOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-16 px-4 bg-secondary">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">My Courses</h1>
              <p className="text-muted-foreground">
                Manage and track your published courses
              </p>
            </div>
            <Link to="/teacher/create-course">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create New Course
              </Button>
            </Link>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Courses</p>
                    <p className="text-2xl font-bold">{courses.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Published</p>
                    <p className="text-2xl font-bold">
                      {courses.filter((c) => c.isPublished).length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="bg-yellow-100 p-3 rounded-lg">
                    <Clock className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Drafts</p>
                    <p className="text-2xl font-bold">
                      {courses.filter((c) => !c.isPublished).length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Students</p>
                    <p className="text-2xl font-bold">
                      {courses.reduce((sum, c) => sum + (c._count?.enrollments || 0), 0)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Courses List */}
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2 text-muted-foreground">Loading courses...</span>
            </div>
          ) : filteredCourses.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Video className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  {searchQuery ? "No courses found" : "No courses yet"}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {searchQuery
                    ? "Try adjusting your search terms"
                    : "Create your first course to start teaching"}
                </p>
                {!searchQuery && (
                  <Link to="/teacher/create-course">
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Course
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-muted relative">
                    {(course.thumbnail || course.thumbnailImage) ? (
                      <img
                        src={course.thumbnail || course.thumbnailImage}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        <Video className="h-12 w-12 text-muted-foreground" />
                      </div>
                    )}
                    <div className="absolute top-2 left-2">
                      <Badge variant={course.isPublished ? "default" : "secondary"}>
                        {course.isPublished ? "Published" : "Draft"}
                      </Badge>
                    </div>
                    <div className="absolute top-2 right-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="secondary" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => navigate(`/courses/${course.id}`)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => navigate(`/teacher/edit-course/${course.id}`)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          {!course.isPublished && (
                            <DropdownMenuItem onClick={() => handlePublish(course.id)}>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Publish
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => openDeleteDialog(course.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {course.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm">
                      <Badge variant="outline">{course.category}</Badge>
                      <span className="font-semibold text-primary">₹{course.price}</span>
                    </div>
                    <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{course._count?.enrollments || 0} students</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration} min</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the course
              and remove all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MyCourses;
