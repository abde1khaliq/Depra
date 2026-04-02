// app/dashboard/policies/page.tsx
'use client';
import { 
  Box, Heading, Button, Table, Badge, Input, 
  Group, InputElement, Stack, Flex, Card, Text
} from "@chakra-ui/react";
import { Plus, Search, Filter } from "lucide-react";

export default function PoliciesPage() {
  return (
    <Stack gap={6}>
      <Flex justify="space-between" align="center">
        <Box>
          <Heading size="lg">Deprecation Policies</Heading>
          <Text color='gray.500'>Configure warning headers and block rules.</Text>
        </Box>
        <Button bg="brand.500" color="white"><Plus size={18}/>
          Register Endpoint
        </Button>
      </Flex>

      <Card.Root>
        <Box p={4} borderBottom="1px solid" borderColor="gray.100">
          <Flex gap={4}>
            <Group attached grow>
              <Input placeholder="Search endpoints (e.g. /v1/...)" />
            </Group>
            <Button variant="outline"><Filter size={16}/> Filters</Button>
          </Flex>
        </Box>

        <Table.Root variant="line">
          <Table.Header bg="gray.50">
            <Table.Row>
              <Table.ColumnHeader>API Endpoint</Table.ColumnHeader>
              <Table.ColumnHeader>Status</Table.ColumnHeader>
              <Table.ColumnHeader>Warning Header</Table.ColumnHeader>
              <Table.ColumnHeader>Hard Cutoff</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="right">Actions</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <PolicyRow 
              path="POST /v1/charge" 
              status="ACTIVE" 
              warning="Deprecation: 2026-06-01" 
              cutoff="2026-12-31" 
            />
            <PolicyRow 
              path="GET /v1/customers/:id" 
              status="WARNING" 
              warning="Sunset: 2026-04-01" 
              cutoff="2026-05-15" 
            />
          </Table.Body>
        </Table.Root>
      </Card.Root>
    </Stack>
  );
}

function PolicyRow({ path, status, warning, cutoff }: any) {
  return (
    <Table.Row _hover={{ bg: "gray.50" }}>
      <Table.Cell fontWeight="bold" fontFamily="mono" fontSize="sm">{path}</Table.Cell>
      <Table.Cell>
        <Badge colorScheme={status === "ACTIVE" ? "green" : "orange"} variant="solid">
          {status}
        </Badge>
      </Table.Cell>
      <Table.Cell color="gray.600" fontSize="xs">{warning}</Table.Cell>
      <Table.Cell fontWeight="medium">{cutoff}</Table.Cell>
      <Table.Cell textAlign="right">
        <Button size="xs" variant="ghost">Edit</Button>
        <Button size="xs" variant="ghost" color="red.500">Kill</Button>
      </Table.Cell>
    </Table.Row>
  );
}