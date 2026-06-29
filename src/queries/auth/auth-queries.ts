// import { useQuery } from "@tanstack/react-query";

// import API from "@/services";
// import { useAuthStore } from "@/stores/auth-store";

// /* -------------------- GET ORGANIZATION USERS -------------------- */
// export const useGetOrganizationUsersQuery = () => {
//   const { currentTenantId } = useAuthStore();

//   return useQuery({
//     queryKey: ["organization-users", currentTenantId],
//     retry: false,
//     refetchOnWindowFocus: false,

//     queryFn: async () => {
//       const res = await API.private.onboarding_getUsers();

//       if (res?.data?.code === "OK") {
//         return res.data.data;
//       }

//       throw new Error(res?.data?.message || "Failed to load users");
//     },
//   });
// };
