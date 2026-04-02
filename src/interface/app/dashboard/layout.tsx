// app/dashboard/layout.tsx
'use client';
import { 
  Box, Flex, Stack, Text, Link as ChakraLink, 
  Icon, Avatar, Button, Separator
} from "@chakra-ui/react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  ShieldAlert, 
  LogOut, 
  Command, 
  ChevronsUpDown,
  Activity,
  Settings
} from "lucide-react";

// Extremely subtle, low-weight navigation items
const NavItem = ({ icon: IconItem, label, href }: { icon: any, label: string, href: string }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <ChakraLink 
      asChild 
      px={3} 
      py={2} 
      borderRadius="md" 
      bg={isActive ? "gray.100" : "transparent"}
      color={isActive ? "gray.900" : "gray.500"}
      _hover={{ bg: "gray.100", color: "gray.900" }} 
      transition="all 0.1s ease-in-out"
      outline="none"
    >
      <Link href={href}>
        <Flex align="center" gap={3}>
          <IconItem size={16}/>
          <Text fontSize="sm" fontWeight={isActive ? "medium" : "normal"}>{label}</Text>
        </Flex>
      </Link>
    </ChakraLink>
  );
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  return (
    <Flex minH="100vh" bg="gray.50">
      {/* SIDEBAR: Unified Light Theme */}
      <Box 
        w="260px" 
        bg="gray.50" 
        p={4} 
        position="fixed" 
        h="full" 
        zIndex="overlay"
        borderRight="1px solid"
        borderColor="gray.200"
      >
        <Flex direction="column" h="full">
          
          {/* Workspace Switcher Mockup (Replaces standard logo) */}
          <Flex 
            align="center" 
            justify="space-between" 
            gap={3} 
            mb={8} 
            px={2} 
            py={1.5}
            borderRadius="md"
            cursor="pointer"
            _hover={{ bg: "gray.100" }}
          >
            <Flex align="center" gap={2.5}>
              <Box bg="gray.200" p={1} borderRadius="md" border="1px solid" borderColor="gray.300">
                <Command size={14} color="#374151" strokeWidth={2} />
              </Box>
              <Text fontSize="sm" fontWeight="medium" color="gray.800" letterSpacing="tight">
              DEPRA
              </Text>
            </Flex>
            <ChevronsUpDown size={14} color="#9CA3AF" />
          </Flex>
          
          {/* Main Nav */}
          <Stack gap={1}>
            <NavItem icon={LayoutDashboard} label="Overview" href="/dashboard" />
            <NavItem icon={ShieldAlert} label="Policies" href="/dashboard/policies" />
          </Stack>

          {/* User Section at Bottom */}
          <Box mt="auto">
            <Separator my={4} borderColor="gray.200" />
            
            <Flex 
              align="center" 
              justify="space-between"
              p={2} 
              borderRadius="md"
              _hover={{ bg: "gray.100" }}
              cursor="pointer"
              mb={2}
            >
              <Flex align="center" gap={3}>
                <Avatar.Root size="xs" shape="rounded">
                  <Avatar.Fallback name={session?.user?.name || "U"} bg="gray.200" color="gray.600" />
                </Avatar.Root>
                <Box overflow="hidden">
                  <Text fontSize="sm" fontWeight="medium" color="gray.700" truncate>
                    {session?.user?.name || "Admin"}
                  </Text>
                </Box>
              </Flex>
            </Flex>

            <Button 
              variant="ghost" 
              w="full" 
              justifyContent="flex-start" 
              gap={3}
              color="gray.500"
              _hover={{ color: "gray.900", bg: "gray.100" }}
              onClick={() => signOut({ callbackUrl: "/login" })}
              px={3}
              py={2}
              h="auto"
            >
              <LogOut size={16} strokeWidth={1.5} />
              <Text fontSize="sm" fontWeight="normal">Sign out</Text>
            </Button>
          </Box>
        </Flex>
      </Box>

      {/* MAIN CONTENT AREA */}
      <Box ml="260px" flex="1" bg="white">
        {/* Minimalist Top Header / Breadcrumb */}
        <Flex 
          h="56px" 
          bg="white" 
          borderBottom="1px solid" 
          borderColor="gray.200"
          align="center"
          px={8}
          position="sticky"
          top={0}
          zIndex="docked"
          justify="space-between"
        >
          <Flex align="center" gap={2} fontSize="sm" color="gray.500">
            <Text>DEPRA</Text>
            <Text>/</Text>
            <Text color="gray.900" fontWeight="medium">Overview</Text>
          </Flex>
          
          <Text fontSize="xs" color="gray.400">v2.4.1</Text>
        </Flex>

        {/* Content Body */}
        <Box p={8} maxW="1200px" mx="auto">
          {children}
        </Box>
      </Box>
    </Flex>
  );
}