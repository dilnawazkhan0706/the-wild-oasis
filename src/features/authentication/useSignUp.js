import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { signUp as signUpApi } from "../../services/apiAuth";

export function useSignUp() {
  const { isLoading, mutate: signUp } = useMutation({
    mutationFn: signUpApi,
    onSuccess: (data) => {
      console.log(data);
      toast.success(
        "Account created successfully. Please verify the new account from user's email address"
      );
    },
  });

  return {
    isLoading,
    signUp,
  };
}
