import {
  Avatar,
  Box,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { FiBell, FiChevronDown, FiMenu } from "react-icons/fi";
import { UserNavogateIcons } from "./UserNavigateIcons";
import { useContextValue } from "../../Context/Contect";
import { useNavigate } from "react-router-dom";

export const MobileNav = ({ onOpen, ...rest }) => {
  const navigate = useNavigate();
  const { loginType, isLogin, logOutUser, userDetails } = useContextValue();

  const FormateName = (name) => {
    let sortname = "";
    if (!name) return "N A";
    let splitStr = [];
    if (name) {
      splitStr = name.split(" ");
    }

    if (splitStr.length == 2) {
      sortname =
        name.split(" ")[0].charAt(0).toUpperCase() +
        name.split(" ")[1].charAt(0).toUpperCase();
    } else if (splitStr.length < 2) {
      sortname =
        splitStr[0].charAt(0).toUpperCase() +
        " " +
        splitStr[0].charAt(1).toUpperCase();
    }

    return sortname;
  };
  return (
    <Flex
      height="20"
      alignItems="center"
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={"space-between"}
      {...rest}
    >
      {loginType==="User"&&<IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />}

       <Text
       
        display={{ base: "block", md: "flex" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        <h1     onClick={()=>navigate("/")}
          className="cursor-pointer text-2xl sm:text-3xl font-bold text-blue-600"
        >
          Stays<span className="text-black">Mate</span>
        </h1>
      </Text> 

      {loginType === "User" && <UserNavogateIcons />}

      <HStack spacing={{ base: "1", md: "6" }}>
        <div className="hidden sm:block">
          <IconButton
            size="lg"
            variant="ghost"
            aria-label="open menu"
            icon={<FiBell />}
          />
        </div>
        <Flex alignItems={"center"}>
          {!isLogin ? (
            <div className="flex">
              <button
                onClick={() => navigate("/login")}
                className="bg-blue-600 mr-2 text-white py-0 px-2 md:px-4 h-10 rounded hover:bg-blue-500"
              >
                LogIn
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="bg-blue-600 mr-2 text-white py-0 px-2 md:px-4 h-10 rounded hover:bg-blue-500"
              >
                SignUp
              </button>
            </div>
          ) : (
            <Menu>
              <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: "none" }}
              >
                <HStack>
                  {userDetails?.profile_photo ? (
                    <Avatar
                      pr={"2"}
                      size={"sm"}
                      src={userDetails?.profile_photo}
                    />
                  ) : (
                    <Box className="rounded-full p-3 bg-blue-600">
                      {FormateName(userDetails.name)}
                    </Box>
                  )}
                  <VStack
                    display={{ base: "none", md: "flex" }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2"
                  >
                    <Text fontSize="sm">{userDetails?.name}</Text>
                    <Text fontSize="xs" color="gray.600">
                      {loginType}
                    </Text>
                  </VStack>
                  <Box display={{ base: "none", md: "flex" }}>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList>
                {loginType === "User" ? (
                  <MenuItem onClick={() => navigate("/profile")}>
                    Profile ❤️
                  </MenuItem>
                ) : (
                  <MenuItem onClick={() => navigate("/admin/dashboard")}>
                    Dashboard ❤️
                  </MenuItem>
                )}
                <MenuDivider />
                <MenuItem
                  onClick={() => {
                    logOutUser();
                    navigate("/login");
                  }}
                >
                  Sign out
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </Flex>
      </HStack>
    </Flex>
  );
};
