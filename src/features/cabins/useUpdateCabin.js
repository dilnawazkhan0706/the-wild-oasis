import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createUpdateCabin } from "../../services/apiCabins";

export function useUpdateCabin() {
  const queryClient = useQueryClient();
  const { mutate: updateCabin, isLoading: isUpdating } = useMutation({
    mutationFn: ({ newCabinData, id }) => createUpdateCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (error) => {
      toast.error(error.meesage);
    },
  });

  return {
    isUpdating,
    updateCabin,
  };
}
