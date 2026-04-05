// app/dashboard/page.tsx
'use client';

import { 
  Box, Heading, SimpleGrid, Card, Text, Badge, 
  Table, Stack, Flex, Circle, Code
} from "@chakra-ui/react";
import { 
  Activity, 
  Ban, 
  Users, 
  ArrowUpRight, 
  TrendingDown,
  Terminal,
  Route,
  Clock,
  ShieldCheck
} from "lucide-react";

export default function DashboardOverview() {
  return (
    <Stack gap={10}>
      {/* HEADER SECTION */}
      <Flex justify="space-between" align="center">
        <Box>
          <Heading size="2xl" fontWeight="medium" color="gray.900" letterSpacing="tight">
            Dashboard
          </Heading>
          <Text color="gray.500" fontSize="sm" mt={1}>
            Monitoring interceptor traffic across 34 active endpoints.
          </Text>
        </Box>
        
        <Flex 
          align="center" 
          gap={3} 
          px={4} 
          py={2} 
          bg="gray.50" 
          border="1px solid" 
          borderColor="gray.200" 
          borderRadius="full"
        >
          <Circle size="2" bg="green.500" />
          <Text fontSize="xs" color="gray.600" fontWeight="medium">
            Proxy Latency: 12ms
          </Text>
        </Flex>
      </Flex>

      {/* STATS GRID */}
      <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap={6}>
        <StatCard 
          label="Total Intercepts" 
          value="1,240,882" 
          icon={Activity} 
          trend="+12.5%" 
          isUp={true} 
        />
        <StatCard 
          label="Policy Matches" 
          value="842" 
          icon={ShieldCheck} 
          trend="+5%" 
          isUp={true} 
          color="#3B82F6" 
        />
        <StatCard 
          label="Automated Blocks" 
          value="2,401" 
          icon={Ban} 
          trend="+18%" 
          isUp={true} 
          color="#EF4444" 
        />
        <StatCard 
          label="Unique Consumers" 
          value="342" 
          icon={Users} 
          trend="Stable" 
          isUp={null} 
        />
      </SimpleGrid>

      {/* ACTIVITY OVERVIEW TABLE */}
      <Card.Root variant="outline" borderColor="gray.200" borderRadius="xl" bg="white" overflow="hidden">
        <Card.Header borderBottom="1px solid" borderColor="gray.100" py={5} px={6} bg="white">
          <Flex justify="space-between" align="center">
            <Box>
              <Text fontSize="lg" fontWeight="medium" color="gray.900">Activity Overview</Text>
              <Text fontSize="sm" color="gray.500" mt={0.5}>Real-time stream of intercepted API requests and proxy actions.</Text>
            </Box>
            <Badge variant="outline" colorPalette="blue" borderRadius="md">Live Stream</Badge>
          </Flex>
        </Card.Header>
        <Card.Body p={0}>
          <Table.Root size="md" variant="line">
            <Table.Header>
              <Table.Row bg="transparent">
                <Table.ColumnHeader px={6} color="gray.400" fontWeight="medium">API Endpoint</Table.ColumnHeader>
                <Table.ColumnHeader color="gray.400" fontWeight="medium">Consumer</Table.ColumnHeader>
                <Table.ColumnHeader color="gray.400" fontWeight="medium">Action Taken</Table.ColumnHeader>
                <Table.ColumnHeader color="gray.400" fontWeight="medium">Status</Table.ColumnHeader>
                <Table.ColumnHeader px={6} color="gray.400" fontWeight="medium">Timestamp</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <ActivityRow 
                method="POST" 
                path="/v1/payments/charge" 
                consumer="Mobile-iOS-Client" 
                action="warn" 
                status={201} 
                time="Just now" 
              />
              <ActivityRow 
                method="GET" 
                path="/v1/users/profile" 
                consumer="Legacy-Web-App" 
                action="block" 
                status={403} 
                time="2 mins ago" 
              />
              <ActivityRow 
                method="PATCH" 
                path="/v1/assets/update" 
                consumer="Internal-Service-Auth" 
                action="let" 
                status={200} 
                time="5 mins ago" 
              />
              <ActivityRow 
                method="GET" 
                path="/v1/config" 
                consumer="Unknown-Origin" 
                action="block" 
                status={401} 
                time="12 mins ago" 
              />
            </Table.Body>
          </Table.Root>
        </Card.Body>
      </Card.Root>
    </Stack>
  );
}

// --- SUB-COMPONENTS ---

function StatCard({ label, value, icon: IconItem, trend, isUp, color = "#4B5563" }: any) {
  return (
    <Card.Root variant="outline" borderColor="gray.200" borderRadius="xl" bg="white">
      <Card.Body p={6}>
        <Flex justify="space-between" align="flex-start">
          <Stack gap={2}>
            <Text fontSize="sm" fontWeight="medium" color="gray.500">{label}</Text>
            <Text fontSize="3xl" fontWeight="medium" color="gray.900" letterSpacing="tight">{value}</Text>
            {trend && (
              <Flex align="center" gap={1.5} mt={1}>
                {isUp !== null && (
                  <Box color={isUp ? "green.500" : "red.500"}>
                    {isUp ? <ArrowUpRight size={14} /> : <TrendingDown size={14} />}
                  </Box>
                )}
                <Text fontSize="xs" fontWeight="medium" color={isUp ? "green.500" : isUp === false ? "red.500" : "gray.400"}>
                  {trend}
                </Text>
              </Flex>
            )}
          </Stack>
          <Box p={2} bg="gray.50" borderRadius="md" border="1px solid" borderColor="gray.100">
            <IconItem size={18} color={color} />
          </Box>
        </Flex>
      </Card.Body>
    </Card.Root>
  );
}

function ActivityRow({ method, path, consumer, action, status, time }: any) {
  // Logic for color-coding status codes
  const getStatusColor = (code: number) => {
    if (code >= 200 && code < 300) return "green";
    if (code >= 400 && code < 500) return "red";
    return "orange";
  };

  // Logic for action badges
  const getActionStyle = (act: string) => {
    switch(act) {
      case 'let': return { color: 'blue', label: 'PASSED' };
      case 'warn': return { color: 'orange', label: 'WARNED' };
      case 'block': return { color: 'red', label: 'BLOCKED' };
      default: return { color: 'gray', label: act.toUpperCase() };
    }
  };

  const actionStyle = getActionStyle(action);

  return (
    <Table.Row transition="background 0.2s" _hover={{ bg: "gray.50" }} borderBottomColor="gray.100">
      <Table.Cell px={6} py={4}>
        <Flex align="center" gap={3}>
          <Box p={1.5} bg="gray.50" borderRadius="md" border="1px solid" borderColor="gray.100">
            <Terminal size={14} color="#6B7280" />
          </Box>
          <Stack gap={0}>
            <Flex align="center" gap={2}>
               <Text fontSize="10px" fontWeight="bold" color="gray.400" fontFamily="mono">{method}</Text>
               <Text fontFamily="mono" fontSize="sm" fontWeight="medium" color="gray.800">{path}</Text>
            </Flex>
          </Stack>
        </Flex>
      </Table.Cell>
      <Table.Cell py={4}>
        <Text fontSize="sm" color="gray.600" fontWeight="medium">{consumer}</Text>
      </Table.Cell>
      <Table.Cell py={4}>
        <Badge variant="subtle" colorPalette={actionStyle.color} fontWeight="medium" fontSize="10px" px={2} borderRadius="md">
          {actionStyle.label}
        </Badge>
      </Table.Cell>
      <Table.Cell py={4}>
        <Badge variant="outline" colorPalette={getStatusColor(status)} size="sm" px={2}>
          {status}
        </Badge>
      </Table.Cell>
      <Table.Cell px={6} py={4}>
        <Flex align="center" gap={2} color="gray.500">
          <Clock size={12} />
          <Text fontSize="xs" fontWeight="medium">{time}</Text>
        </Flex>
      </Table.Cell>
    </Table.Row>
  );
}