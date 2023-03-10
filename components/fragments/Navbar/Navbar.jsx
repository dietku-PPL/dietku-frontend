import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Avatar,
  HStack,
  Image,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import { AuthModal } from "../AuthModal/AuthModal";
import { getUserAuth } from "@/utils/axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getUserData } from "@/utils/common";

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const {
    onOpen: onOpenAuthModal,
    onClose: onCloseAuthModal,
    isOpen: isOpenAuthModal,
  } = useDisclosure();
  const [userInfo, setUserInfo] = useState();
  const router = useRouter();

  useEffect(() => {
    const userData = getUserData();
    if (userData) {
      getUserAuth().then((res) => {
        setUserInfo(res.data.user);
      });
    } else {
      setUserInfo(null);
    }
  }, [userInfo]);

  return (
    <Box>
      <Flex
        bg={"white"}
        color={"gray.600"}
        minH={{ base: "70px", md: "80px" }}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={"gray.200"}
        align={"center"}
      >
        <Flex
          flex={{ md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex
          flex={{ base: 1 }}
          justify={{ base: "center", md: "space-between" }}
          maxW={"container.xl"}
          mx={"auto"}
          align={"center"}
        >
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
          >
            <Image
              src="/dietku-logo.png"
              alt="logo"
              w="100px"
              cursor={"pointer"}
              onClick={() => router.push("/")}
              ml={{ base: -5 }}
            />
          </Text>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>

          {!userInfo ? (
            <Button
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"sm"}
              fontWeight={600}
              colorScheme={"green"}
              href={"#"}
              onClick={onOpenAuthModal}
            >
              Masuk
            </Button>
          ) : (
            <HStack
              display={{ base: "none", md: "flex" }}
              py={2}
              px={3}
              bgColor={"gray.200"}
              _hover={{ bgColor: "green.100" }}
              rounded={"md"}
              cursor={"pointer"}
              onClick={() => router.push("/profile")}
            >
              <Avatar
                size={"sm"}
                name={userInfo.username}
                backgroundColor={"green.300"}
              />
              <Text fontWeight={"semibold"}>{userInfo.username}</Text>
            </HStack>
          )}
        </Flex>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
        {!userInfo ? (
          <Button
            width={{ base: "full" }}
            mb={{ base: 5 }}
            fontSize={"sm"}
            fontWeight={600}
            colorScheme={"green"}
            href={"#"}
            onClick={onOpenAuthModal}
          >
            Masuk
          </Button>
        ) : (
          <HStack
            py={2}
            px={3}
            mb={{ base: 5 }}
            bgColor={"gray.200"}
            _hover={{ bgColor: "green.100" }}
            rounded={"md"}
            cursor={"pointer"}
            onClick={() => router.push("/profile")}
          >
            <Avatar
              size={"sm"}
              name={userInfo.username}
              backgroundColor={"green.300"}
            />
            <Text fontWeight={"semibold"}>{userInfo.username}</Text>
          </HStack>
        )}
      </Collapse>

      <AuthModal
        isOpenAuthModal={isOpenAuthModal}
        onCloseAuthModal={onCloseAuthModal}
      />
    </Box>
  );
}

const DesktopNav = () => {
  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                as={NextLink}
                p={2}
                href={navItem.href ?? "#"}
                fontSize={"md"}
                fontWeight={"semibold"}
                color={"black"}
                _hover={{
                  textDecoration: "none",
                  color: "green.500",
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link as={NextLink} key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const NAV_ITEMS = [
  {
    label: "Beranda",
    href: "/",
  },
  {
    label: "Program",
    href: "/program",
  },
  {
    label: "Kalkulator",
    href: "/calculator",
  },
];
