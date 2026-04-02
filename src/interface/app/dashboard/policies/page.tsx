'use client';

import { 
  Box, Heading, Button, Table, Badge, Input, 
  Stack, Flex, Card, Text, Group, Spinner, Center,
  Field, NativeSelect, Dialog, Portal
} from "@chakra-ui/react";
import { 
  Plus, Search, Filter, MoreHorizontal, 
  Terminal, AlertCircle, Check, Calendar 
} from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// --- VALIDATION SCHEMA ---
const policySchema = z.object({
  name: z.string().min(1, "Path is required").startsWith("/", "Must start with /"),
  replacement_name: z.string().optional(),
  expiry_date: z.string().min(1, "Expiry date is required"),
  status: z.enum(["active", "inactive", "deprecated"]),
  action: z.enum(["let", "block", "warn"]),
});

type PolicyFormValues = z.infer<typeof policySchema>;

interface ApiEndpoint extends PolicyFormValues {
  id: number;
  owner_id: number;
}

export default function PoliciesPage() {
  const { data: session } = useSession();
  const [endpoints, setEndpoints] = useState<ApiEndpoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { 
    register, 
    handleSubmit, 
    reset, 
    formState: { errors, isSubmitting } 
  } = useForm<PolicyFormValues>({
    resolver: zodResolver(policySchema),
    defaultValues: {
      status: 'active',
      action: 'let',
    }
  });

  const fetchData = useCallback(async () => {
    if (!session?.accessToken) return;
    try {
      const response = await fetch("http://127.0.0.1:8000/endpoints", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.accessToken}`
        }
      });
      if (!response.ok) throw new Error("Fetch failed");
      const data = await response.json();
      setEndpoints(data);
      setError(false);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [session?.accessToken]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onSubmit = async (values: PolicyFormValues) => {
    if (!session?.accessToken) return;
    try {
      const response = await fetch("http://127.0.0.1:8000/endpoints", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session.accessToken}`
        },
        body: JSON.stringify({
          ...values,
          owner_id: session?.user?.id,
          expiry_date: new Date(values.expiry_date).toISOString(),
        }),
      });

      if (!response.ok) throw new Error("Post failed");
      
      setIsDialogOpen(false);
      reset();
      fetchData(); 
    } catch (err) {
      console.error("Submission error:", err);
    }
  };

  return (
    <Stack gap={10}>
      <Flex justify="space-between" align="center">
        <Box>
          <Heading size="2xl" fontWeight="medium" color="gray.900" letterSpacing="tight">
            Policies
          </Heading>
          <Text color="gray.500" fontSize="sm" mt={1}>
            Manage deprecation rules and proxy-level intervention.
          </Text>
        </Box>

        <Dialog.Root open={isDialogOpen} onOpenChange={(e) => setIsDialogOpen(e.open)}>
          <Dialog.Trigger asChild>
            <Button bg="gray.900" color="white" size="sm" px={4} _hover={{ bg: "black" }}>
              <Plus size={16} strokeWidth={2.5} />
              <Text fontSize="xs" fontWeight="medium" ml={2}>New Policy</Text>
            </Button>
          </Dialog.Trigger>
          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content borderRadius="xl" border="1px solid" borderColor="gray.200" boxShadow="xl" p={0} overflow="hidden">
                <Box p={6} borderBottom="1px solid" borderColor="gray.100">
                  <Dialog.Title fontSize="lg" fontWeight="medium">New Endpoint Policy</Dialog.Title>
                  <Dialog.Description fontSize="xs" color="gray.500">Configure how the proxy handles legacy traffic.</Dialog.Description>
                </Box>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <Stack gap={5} p={6}>
                    <Field.Root invalid={!!errors.name}>
                      <Field.Label fontSize="xs" color="gray.500" fontWeight="medium">Endpoint Path</Field.Label>
                      <Input 
                        {...register("name")}
                        placeholder="/v1/users/create" 
                        bg="gray.50" fontSize="sm" h="10" border="1px solid" borderColor="gray.200"
                        _focus={{ bg: "white", borderColor: "gray.900", ring: "none" }}
                      />
                      {errors.name && <Field.ErrorText fontSize="10px">{errors.name.message}</Field.ErrorText>}
                    </Field.Root>

                    <Field.Root>
                      <Field.Label fontSize="xs" color="gray.500" fontWeight="medium">Successor Path</Field.Label>
                      <Input 
                        {...register("replacement_name")}
                        placeholder="/v2/users/create" 
                        bg="gray.50" fontSize="sm" h="10" border="1px solid" borderColor="gray.200"
                        _focus={{ bg: "white", borderColor: "gray.900", ring: "none" }}
                      />
                    </Field.Root>

                    <Flex gap={4}>
                      <Field.Root invalid={!!errors.expiry_date} flex={1}>
                        <Field.Label fontSize="xs" color="gray.500" fontWeight="medium">Sunset Date</Field.Label>
                        <Input 
                          {...register("expiry_date")}
                          type="date" bg="gray.50" fontSize="sm" h="10" border="1px solid" borderColor="gray.200"
                        />
                      </Field.Root>
                      <Field.Root flex={1}>
                        <Field.Label fontSize="xs" color="gray.500" fontWeight="medium">Proxy Action</Field.Label>
                        <NativeSelect.Root size="sm">
                          <NativeSelect.Field {...register("action")} bg="gray.50" h="10" border="1px solid" borderColor="gray.200">
                            <option value="let">LET (Allow)</option>
                            <option value="warn">WARN (Header)</option>
                            <option value="block">BLOCK (403)</option>
                          </NativeSelect.Field>
                        </NativeSelect.Root>
                      </Field.Root>
                    </Flex>

                    <Field.Root>
                      <Field.Label fontSize="xs" color="gray.500" fontWeight="medium">Lifecycle Status</Field.Label>
                      <NativeSelect.Root size="sm">
                        <NativeSelect.Field {...register("status")} bg="gray.50" h="10" border="1px solid" borderColor="gray.200">
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                          <option value="deprecated">Deprecated</option>
                        </NativeSelect.Field>
                      </NativeSelect.Root>
                    </Field.Root>
                  </Stack>

                  <Flex bg="gray.50" p={4} justify="flex-end" gap={3}>
                    <Dialog.CloseTrigger asChild>
                      <Button variant="ghost" size="sm" fontSize="xs">Cancel</Button>
                    </Dialog.CloseTrigger>
                    <Button 
                      type="submit" bg="gray.900" color="white" size="sm" px={6}
                      loading={isSubmitting} _hover={{ bg: "black" }}
                    >
                      Save Policy
                    </Button>
                  </Flex>
                </form>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
      </Flex>

      <Card.Root variant="outline" borderColor="gray.200" borderRadius="xl" bg="white" overflow="hidden">
        <Box p={4} borderBottom="1px solid" borderColor="gray.100" bg="white">
          <Flex gap={3}>
            <Group attached grow maxW="400px">
              <Box position="relative" w="full">
                <Flex align="center" pos="absolute" left={3} top="50%" transform="translateY(-50%)" zIndex={1}>
                  <Search size={14} color="#9CA3AF" />
                </Flex>
                <Input 
                  placeholder="Search endpoints..." 
                  fontSize="sm" pl={9} h="9" bg="gray.50" borderColor="gray.200"
                  _focus={{ bg: "white", borderColor: "gray.900", ring: "none" }}
                />
              </Box>
            </Group>
            <Button variant="outline" borderColor="gray.200" h="9" px={3}>
              <Filter size={14} />
              <Text fontSize="xs" fontWeight="medium" color="gray.600" ml={2}>Filters</Text>
            </Button>
          </Flex>
        </Box>

        {loading ? (
          <Center p={20}><Spinner size="sm" color="gray.400" /></Center>
        ) : error ? (
          <Center p={20} flexDir="column" gap={2}>
            <AlertCircle size={20} color="red" />
            <Text fontSize="sm" color="gray.500">Service temporarily unavailable.</Text>
          </Center>
        ) : (
          <Table.Root size="md" variant="line">
            <Table.Header>
              <Table.Row bg="transparent">
                <Table.ColumnHeader px={6} color="gray.400" fontWeight="medium">API Endpoint</Table.ColumnHeader>
                <Table.ColumnHeader color="gray.400" fontWeight="medium">Status</Table.ColumnHeader>
                <Table.ColumnHeader color="gray.400" fontWeight="medium">Action</Table.ColumnHeader>
                <Table.ColumnHeader color="gray.400" fontWeight="medium">Expiry</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="right" px={6}></Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {endpoints.map((item) => (
                <PolicyRow key={item.id} data={item} />
              ))}
            </Table.Body>
          </Table.Root>
        )}
      </Card.Root>
    </Stack>
  );
}

function PolicyRow({ data }: { data: ApiEndpoint }) {
  const getStatusStyle = (s: string) => {
    switch(s) {
      case 'active': return { color: 'blue', label: 'Active' };
      case 'inactive': return { color: 'orange', label: 'Inactive' }; // Fixed here
      case 'deprecated': return { color: 'gray', label: 'Deprecated' };
      default: return { color: 'gray', label: s };
    }
  };

  const style = getStatusStyle(data.status);
  const formattedDate = new Date(data.expiry_date).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  });

  return (
    <Table.Row transition="background 0.2s" _hover={{ bg: "gray.50" }}>
      <Table.Cell px={6} py={4}>
        <Flex align="center" gap={3}>
          <Box p={1.5} bg="gray.50" borderRadius="md" border="1px solid" borderColor="gray.100">
            <Terminal size={14} color="#6B7280" />
          </Box>
          <Stack gap={0}>
            <Text fontFamily="mono" fontSize="sm" fontWeight="medium" color="gray.800">{data.name}</Text>
            {data.replacement_name && (
              <Text fontSize="10px" color="gray.400">Upgrade: {data.replacement_name}</Text>
            )}
          </Stack>
        </Flex>
      </Table.Cell>
      <Table.Cell py={4}>
        <Badge variant="subtle" colorPalette={style.color} fontWeight="medium" fontSize="10px" px={2} borderRadius="md">
          {style.label}
        </Badge>
      </Table.Cell>
      <Table.Cell py={4}>
        <Badge variant="outline" size="sm" fontSize="9px" color="gray.500" px={2}>
          {data.action.toUpperCase()}
        </Badge>
      </Table.Cell>
      <Table.Cell py={4}>
        <Text fontSize="sm" color="gray.600" fontWeight="medium">{formattedDate}</Text>
      </Table.Cell>
      <Table.Cell textAlign="right" px={6} py={4}>
        <Button variant="ghost" size="xs" color="gray.400" _hover={{ color: "gray.900", bg: "gray.100" }}>
          <MoreHorizontal size={16} />
        </Button>
      </Table.Cell>
    </Table.Row>
  );
}