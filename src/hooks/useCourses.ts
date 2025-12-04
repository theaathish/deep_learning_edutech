import { useQuery, useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import api from '@/lib/api';
import type {
  Course,
  CreateCourseInput,
  CourseFilters,
  ApiResponse,
  PaginatedResponse,
} from '@/types';

// Query keys
export const courseKeys = {
  all: ['courses'] as const,
  lists: () => [...courseKeys.all, 'list'] as const,
  list: (filters: CourseFilters) => [...courseKeys.lists(), filters] as const,
  details: () => [...courseKeys.all, 'detail'] as const,
  detail: (id: string) => [...courseKeys.details(), id] as const,
  myCoursesTeacher: () => [...courseKeys.all, 'my-courses-teacher'] as const,
  myCoursesStudent: () => [...courseKeys.all, 'my-courses-student'] as const,
};

// Fetch all courses with optional filters
export function useCourses(filters?: CourseFilters, options?: Omit<UseQueryOptions<ApiResponse<PaginatedResponse<Course>>>, 'queryKey' | 'queryFn'>) {
  return useQuery({
    queryKey: courseKeys.list(filters || {}),
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.category) params.append('category', filters.category);
      if (filters?.search) params.append('search', filters.search);
      if (filters?.minPrice !== undefined) params.append('minPrice', String(filters.minPrice));
      if (filters?.maxPrice !== undefined) params.append('maxPrice', String(filters.maxPrice));
      if (filters?.teacherId) params.append('teacherId', filters.teacherId);
      if (filters?.page) params.append('page', String(filters.page));
      if (filters?.limit) params.append('limit', String(filters.limit));
      
      const response = await api.get<ApiResponse<PaginatedResponse<Course>>>(`/courses?${params.toString()}`);
      return response.data;
    },
    ...options,
  });
}

// Fetch single course by ID
export function useCourse(id: string, options?: Omit<UseQueryOptions<ApiResponse<Course>>, 'queryKey' | 'queryFn'>) {
  return useQuery({
    queryKey: courseKeys.detail(id),
    queryFn: async () => {
      const response = await api.get<ApiResponse<Course>>(`/courses/${id}`);
      return response.data;
    },
    enabled: !!id,
    ...options,
  });
}

// Fetch teacher's courses
export function useMyCoursesTeacher() {
  return useQuery({
    queryKey: courseKeys.myCoursesTeacher(),
    queryFn: async () => {
      const response = await api.get<ApiResponse<Course[]>>('/teacher/my-courses');
      return response.data;
    },
  });
}

// Create course mutation
export function useCreateCourse() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: CreateCourseInput) => {
      const response = await api.post<ApiResponse<Course>>('/courses', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: courseKeys.all });
    },
  });
}

// Update course mutation
export function useUpdateCourse() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<CreateCourseInput> }) => {
      const response = await api.put<ApiResponse<Course>>(`/courses/${id}`, data);
      return response.data;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: courseKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: courseKeys.lists() });
    },
  });
}

// Delete course mutation
export function useDeleteCourse() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.delete<ApiResponse<null>>(`/courses/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: courseKeys.all });
    },
  });
}

// Publish course mutation
export function usePublishCourse() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.post<ApiResponse<Course>>(`/courses/${id}/publish`);
      return response.data;
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: courseKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: courseKeys.lists() });
    },
  });
}
