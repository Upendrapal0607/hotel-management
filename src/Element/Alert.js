import { useToast } from "@chakra-ui/react";

export const AlertToastMessage = () => {
  const toast = useToast();
  const statuses = ["success", "error", "warning", "info"];
  const showToast = (title, description, status, position = "top") => {
    toast({
      title,
      description,
      status,
      duration: 5000,
      isClosable: true,
      position,
    });
  };

  return { showToast };
};
