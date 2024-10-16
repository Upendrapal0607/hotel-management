import { Flex } from "@chakra-ui/react";
import React from "react";
import { Link} from "react-router-dom";

export const UserNavogateIcons = () => {

  return (
    <Flex
      justifyContent={"space-between"}
      display={{ base: "none", md: "flex" }}
    >
<ul className=" md:flex hidden space-x-6 text-gray-600">
        <Link to="/" className="hover:text-blue-600">
          Home
        </Link>
        <Link to="/contact" className="hover:text-blue-600">
          Contact
        </Link>
        <Link to="/about" className="hover:text-blue-600">
          About
        </Link>
        <Link to="/services" className="hover:text-blue-600">
          Services
        </Link>
      </ul>
    </Flex>
  );
};
