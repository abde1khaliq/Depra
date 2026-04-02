// app/dashboard/policies/page.tsx
'use client';
import { 
  Box, Heading, Button, Table, Badge, Input, 
  Stack, Flex, Card, Text, Group, InputElement
} from "@chakra-ui/react";
import { Plus, Search, Filter, MoreHorizontal, Terminal } from "lucide-react";

export default function PoliciesPage() {
  return (
    <Stack gap={10}>
      {/* Page Header */}
      <Flex justify="space-between" align="center">
        <Box>
          <Heading size="2xl" fontWeight="medium" color="gray.900" letterSpacing="tight">
            Policies
          </Heading>
          <Text color="gray.500" fontSize="sm" mt={1}>
            Define and manage API deprecation lifecycles.
          </Text>
        </Box>
        <Button 
          bg="gray.900" 
          color="white" 
          size="sm" 
          px={4} 
          _hover={{ bg: "black" }}
          borderRadius="md"
        >
          <Flex align="center" gap={2}>
            <Plus size={16} strokeWidth={2.5} />
            <Text fontSize="xs" fontWeight="medium">New Policy</Text>
          </Flex>
        </Button>
      </Flex>

      {/* Main Content Card */}
      <Card.Root variant="outline" borderColor="gray.200" borderRadius="xl" bg="white" overflow="hidden">
        {/* Toolbar */}
        <Box p={4} borderBottom="1px solid" borderColor="gray.100" bg="white">
          <Flex gap={3}>
            <Group attached grow maxW="400px">
              <Box position="relative" w="full">
                <Flex 
                  align="center" 
                  pos="absolute" 
                  left={3} 
                  top="50%" 
                  transform="translateY(-50%)" 
                  zIndex={1}
                >
                  <Search size={14} color="#9CA3AF" />
                </Flex>
                <Input 
                  placeholder="Filter by endpoint..." 
                  fontSize="sm" 
                  pl={9} 
                  h="9" 
                  bg="gray.50"
                  borderColor="gray.200"
                  _focus={{ bg: "white", borderColor: "gray.900", ring: "none" }}
                />
              </Box>
            </Group>
            <Button variant="outline" borderColor="gray.200" h="9" px={3} _hover={{ bg: "gray.50" }}>
              <Flex align="center" gap={2}>
                <Filter size={14} />
                <Text fontSize="xs" fontWeight="medium" color="gray.600">Filters</Text>
              </Flex>
            </Button>
          </Flex>
        </Box>

        {/* Policies Table */}
        <Table.Root size="md" variant="line">
          <Table.Header>
            <Table.Row bg="transparent">
              <Table.ColumnHeader px={6} color="gray.400" fontWeight="medium">API Endpoint</Table.ColumnHeader>
              <Table.ColumnHeader color="gray.400" fontWeight="medium">Status</Table.ColumnHeader>
              <Table.ColumnHeader color="gray.400" fontWeight="medium">Warning Header</Table.ColumnHeader>
              <Table.ColumnHeader color="gray.400" fontWeight="medium">Hard Cutoff</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="right" px={6}></Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <PolicyRow 
              path="POST /v1/charge" 
              status="active" 
              warning="Deprecation: 2026-06-01" 
              cutoff="Dec 31, 2026" 
            />
            <PolicyRow 
              path="GET /v1/customers/:id" 
              status="warning" 
              warning="Sunset: 2026-04-01" 
              cutoff="May 15, 2026" 
            />
            <PolicyRow 
              path="DELETE /v1/tokens" 
              status="deprecated" 
              warning="N/A" 
              cutoff="Expired" 
            />
          </Table.Body>
        </Table.Root>
      </Card.Root>
    </Stack>
  );
}

function PolicyRow({ path, status, warning, cutoff }: any) {
  const getStatusStyle = (s: string) => {
    switch(s) {
      case 'active': return { color: 'blue', label: 'Monitoring' };
      case 'warning': return { color: 'orange', label: 'Warning' };
      default: return { color: 'gray', label: 'Deprecated' };
    }
  };

  const style = getStatusStyle(status);

  return (
    <Table.Row transition="background 0.2s" _hover={{ bg: "gray.50" }}>
      <Table.Cell px={6} py={4}>
        <Flex align="center" gap={3}>
          <Box p={1.5} bg="gray.50" borderRadius="md" border="1px solid" borderColor="gray.100">
            <Terminal size={14} color="#6B7280" />
          </Box>
          <Text fontFamily="mono" fontSize="sm" fontWeight="medium" color="gray.800">{path}</Text>
        </Flex>
      </Table.Cell>
      <Table.Cell py={4}>
        <Badge 
          variant="subtle" 
          colorPalette={style.color} 
          fontWeight="medium" 
          fontSize="10px" 
          px={2} 
          borderRadius="md"
          textTransform="capitalize"
        >
          {style.label}
        </Badge>
      </Table.Cell>
      <Table.Cell py={4}>
        <Text fontSize="xs" color="gray.500" fontWeight="normal">{warning}</Text>
      </Table.Cell>
      <Table.Cell py={4}>
        <Text fontSize="sm" color="gray.600" fontWeight="medium">{cutoff}</Text>
      </Table.Cell>
      <Table.Cell textAlign="right" px={6} py={4}>
        <Button 
          variant="ghost" 
          size="xs" 
          color="gray.400" 
          _hover={{ color: "gray.900", bg: "gray.100" }}
          p={1}
        >
          <MoreHorizontal size={16} />
        </Button>
      </Table.Cell>
    </Table.Row>
  );
}