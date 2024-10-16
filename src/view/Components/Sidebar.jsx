import {
  Box,
  CloseButton,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { NavItem } from "./NavBarItems";
import { UserNavogateIcons } from "./UserNavigateIcons";

export const SidebarContent = ({ onClose, LinkItems, ...rest }) => {
  const navigate = useNavigate();
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text
          display={{ base: "block", md: "flex" }}
          fontSize="2xl"
          fontFamily="monospace"
          fontWeight="bold"

        >
          <h1 className="cursor-pointer text-2xl sm:text-3xl font-bold text-blue-600">
            Stays<span className="text-black">Mate</span>
          </h1>
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>

      {LinkItems?.map((link) => (
        <NavItem
          onClick={() => {
            navigate(link.path);
            onClose();
          }}
          sx={{
            transition: "all 0.2s",
            _hover: {
              bg: "blue.500",
              transform: "scale(1.05)",
            },
          }}
          key={link.name}
          icon={link.icon}
        >
          {link.name}
        </NavItem>
      ))}

      <UserNavogateIcons />
    </Box>
  );
};
