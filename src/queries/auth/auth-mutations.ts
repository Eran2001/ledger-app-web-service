// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useNavigate } from "@tanstack/react-router";
// import { AxiosError } from "axios";

// import { Notification } from "@/components/ui/custom-toast";

// import API from "@/services";
// import { useAuthStore } from "@/stores/auth-store";

// /* -------------------- USER LOGIN -------------------- */
// export const useLoginMutation = () => {
//   const { setAuth } = useAuthStore();
//   const navigate = useNavigate();

//   return useMutation({
//     mutationFn: (payload: { email: string; password: string }) =>
//       API.private.onboarding_userLogin(payload),

//     onSuccess: (res) => {
//       if (res.data.code === "OK") {
//         const { user, token } = res.data.data;
//         setAuth(user, token);
//         navigate("/get-started");
//       } else {
//         Notification.error(res.data.message);
//       }
//     },

//     onError: (err: AxiosError<{ message: string }>) => {
//       Notification.error(err.response?.data?.message || err.message);
//     },
//   });
// };
