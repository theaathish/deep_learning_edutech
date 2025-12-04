import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import type { Enrollment, ApiResponse } from '@/types';

// Query keys
export const enrollmentKeys = {
  all: ['enrollments'] as const,
  myEnrollments: () => [...enrollmentKeys.all, 'my'] as const,
  detail: (id: string) => [...enrollmentKeys.all, 'detail', id] as const,
};

// Fetch student's enrollments
export function useMyEnrollments() {
  return useQuery({
    queryKey: enrollmentKeys.myEnrollments(),
    queryFn: async () => {
      const response = await api.get<ApiResponse<Enrollment[]>>('/enrollments/my-enrollments');
      return response.data;
    },
  });
}

// Check if enrolled in a specific course
export function useEnrollmentStatus(courseId: string) {
  return useQuery({
    queryKey: ['enrollment-status', courseId],
    queryFn: async () => {
      const response = await api.get<ApiResponse<{ isEnrolled: boolean; enrollment?: Enrollment }>>(`/enrollments/status/${courseId}`);
      return response.data;
    },
    enabled: !!courseId,
  });
}

// Update enrollment progress
export function useUpdateProgress() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ enrollmentId, progress }: { enrollmentId: string; progress: number }) => {
      const response = await api.put<ApiResponse<Enrollment>>(`/enrollments/${enrollmentId}/progress`, { progress });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: enrollmentKeys.myEnrollments() });
    },
  });
}

// Mark enrollment as complete
export function useCompleteEnrollment() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (enrollmentId: string) => {
      const response = await api.post<ApiResponse<Enrollment>>(`/enrollments/${enrollmentId}/complete`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: enrollmentKeys.myEnrollments() });
    },
  });
}
