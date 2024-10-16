import {
  Box,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
} from "@chakra-ui/react";
import { FiHome, FiTrendingUp, FiCompass, FiStar } from "react-icons/fi";
import { SidebarContent } from "./Components/Sidebar";
import { MobileNav } from "./Components/MobileNavbar";
import { useContextValue } from "../Context/Contect";
import { useLocation, useParams } from "react-router-dom";


const UserLinkItems = [
  { name: "Home", icon: FiHome, path: "/" },
  { name: "Contact", icon: FiTrendingUp, path: "/contact" },
  { name: "Hotel", icon: FiCompass, path: "/hotel" },
  { name: "About", icon: FiCompass, path: "/about" },
  { name: "Services", icon: FiCompass, path: "/services" },
];

const Header = () => {
const { isOpen, onOpen, onClose } = useDisclosure();
  const { loginType, setUserdetals } = useContextValue();
  const location = useLocation();
  return (
    <Box pl={"2"} className="bg-headerColor sticky top-0 z-10">
      <SidebarContent onClose={() => onClose} display={{ base: "none" }} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          {loginType === "User" && (
            <SidebarContent LinkItems={UserLinkItems} onClose={onClose} />
          )}
            
        </DrawerContent>
      </Drawer>
      {location.pathname !== "/admin/login"&&<MobileNav onOpen={onOpen} />}
      <Box ml={{ base: 0, md: 60 }} p="4"></Box>
    </Box>
  );
};

export default Header;
