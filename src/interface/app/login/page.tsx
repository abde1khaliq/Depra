// app/login/page.tsx
'use client';
import { 
  Box, Button, Container, Heading, Input, Stack, Text, Center, 
  Field, Alert, Flex
} from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Command, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid credentials. Check your email and password.");
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <Box bg="gray.50" minH="100vh">
      <Center minH="100vh">
        <Container maxW="md">
          {/* Brand Identity Lockup */}
          <Flex direction="column" align="center" mb={8}>
            <Box 
              bg="white" 
              p={2} 
              borderRadius="lg" 
              border="1px solid" 
              borderColor="gray.200" 
              mb={4}
              boxShadow="sm"
            >
              <Command size={24} color="#111827" strokeWidth={1.5} />
            </Box>
            <Heading size="xl" fontWeight="medium" color="gray.900" letterSpacing="tight">
              Sign in to Depra
            </Heading>
            <Text color="gray.500" fontSize="sm" mt={2}>
              Enter your credentials to access the Payd Admin Panel
            </Text>
          </Flex>

          {/* Login Card */}
          <Box 
            bg="white" 
            p={8} 
            borderRadius="xl" 
            border="1px solid" 
            borderColor="gray.200"
          >
            <form onSubmit={handleLogin}>
              <Stack gap={6}>
                {error && (
                  <Alert.Root status="error" variant="subtle" borderRadius="md">
                    <Alert.Title fontSize="xs" fontWeight="medium">{error}</Alert.Title>
                  </Alert.Root>
                )}

                <Field.Root>
                  <Field.Label fontSize="xs" color="gray.500" fontWeight="medium" mb={1.5}>
                    Email address
                  </Field.Label>
                  <Input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@payd.com" 
                    variant="outline"
                    bg="gray.50"
                    borderColor="gray.200"
                    fontSize="sm"
                    h="11"
                    _focus={{ bg: "white", borderColor: "gray.900", ring: "none" }}
                  />
                </Field.Root>

                <Field.Root>
                  <Flex justify="space-between" align="center" mb={1.5}>
                    <Field.Label fontSize="xs" color="gray.500" fontWeight="medium" m={0}>
                      Password
                    </Field.Label>
                    <Text as="a" fontSize="xs" color="gray.400" _hover={{ color: "gray.900" }}>
                      Forgot?
                    </Text>
                  </Flex>
                  <Input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••" 
                    variant="outline"
                    bg="gray.50"
                    borderColor="gray.200"
                    fontSize="sm"
                    h="11"
                    _focus={{ bg: "white", borderColor: "gray.900", ring: "none" }}
                  />
                </Field.Root>

                <Button 
                  type="submit"
                  loading={loading}
                  bg="gray.900" 
                  color="white"
                  w="full"
                  h="11"
                  fontSize="sm"
                  fontWeight="medium"
                  _hover={{ bg: "black" }}
                  transition="all 0.2s"
                >
                  <Flex align="center" gap={2}>
                    Continue
                    <ArrowRight size={16} strokeWidth={2} />
                  </Flex>
                </Button>
              </Stack>
            </form>
          </Box>

          <Text textAlign="center" fontSize="xs" color="gray.400" mt={8}>
            &copy; 2026 Depra Infrastructure Inc.
          </Text>
        </Container>
      </Center>
    </Box>
  );
}