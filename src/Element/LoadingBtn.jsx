import { Button, Stack } from "@chakra-ui/react";

export const LoadingButton = ({ text }) => {
  return (
    <Stack direction="row" spacing={4} align="center">
      <Button
        isLoading
        loadingText="Loading"
        colorScheme="blue"
        variant="outline"
        spinnerPlacement="start"
      >
        Submit
      </Button>
    </Stack>
  );
};
