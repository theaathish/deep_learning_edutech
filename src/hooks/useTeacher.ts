import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";

// Types
interface TeacherProfile {
  id: string;
  userId: string;
  bio: string | null;
  expertise: string[];
  isVerified: boolean;
  verificationDocument: string | null;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    avatar: string | null;
  };
}

interface Earning {
  id: string;
  courseId: string;
  studentId: string;
  createdAt: string;
  course: {
    id: string;
    title: string;
    price: number;
  };
  student: {
    id: string;
    user: {
      name: string;
      email: string;
    };
  };
}

interface EarningsData {
  earnings: Earning[];
  total: number;
}

interface UpdateProfileData {
  bio?: string;
  expertise?: string[];
}

// Fetch teacher profile
export const useTeacherProfile = () => {
  return useQuery<{ data: TeacherProfile }>({
    queryKey: ["teacher", "profile"],
    queryFn: async () => {
      const response = await api.get("/teacher/profile");
      return response.data;
    },
    retry: 1,
  });
};

// Update teacher profile
export const useUpdateTeacherProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateProfileData) => {
      const response = await api.put("/teacher/profile", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teacher", "profile"] });
    },
  });
};

// Upload verification document
export const useUploadVerificationDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await api.post("/teacher/verification-document", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teacher", "profile"] });
    },
  });
};

// Fetch teacher earnings
export const useTeacherEarnings = () => {
  return useQuery<{ data: EarningsData }>({
    queryKey: ["teacher", "earnings"],
    queryFn: async () => {
      const response = await api.get("/teacher/earnings");
      return response.data;
    },
    retry: 1,
  });
};

// Fetch teacher stats (dashboard)
export const useTeacherStats = () => {
  return useQuery({
    queryKey: ["teacher", "stats"],
    queryFn: async () => {
      const response = await api.get("/teacher/stats");
      return response.data;
    },
    retry: 1,
  });
};
