// app/dashboard/page.tsx
'use client';
import { 
  Box, Heading, SimpleGrid, Card, Text, Badge, 
  Table, Stack, Icon, Flex, Progress, Circle
} from "@chakra-ui/react";
import { 
  AlertTriangle, 
  Activity, 
  Ban, 
  Users, 
  ArrowUpRight, 
  TrendingDown 
} from "lucide-react";

export default function DashboardOverview() {
  return (
    <Stack gap={10}>
      {/* Header Section */}
      <Flex justify="space-between" align="center">
        <Box>
          <Heading size="2xl" fontWeight="medium" color="gray.800" letterSpacing="tight">
            Dashboard
          </Heading>
          <Text color="gray.500" fontSize="sm" mt={1}>
            Monitoring 34 active endpoints across the infrastructure.
          </Text>
        </Box>
        
        {/* Sleek, understated status indicator */}
        <Flex align="center" gap={2} px={3} py={1.5} border="1px solid" borderColor="gray.200" borderRadius="full" bg="white">
          <Circle size="2" bg="blue.500" />
          <Text fontSize="xs" color="gray.600" fontWeight="medium">Proxy Latency: 12ms</Text>
        </Flex>
      </Flex>

      {/* 1. Minimalist Stats Grid */}
      <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap={6}>
        <StatCard 
          label="Traffic Intercepted" 
          value="1,240,882" 
          icon={Activity} 
          trend="+12.5%" 
          isUp={true} 
        />
        <StatCard 
          label="Active Warnings" 
          value="14" 
          icon={AlertTriangle} 
          trend="-2" 
          isUp={false} 
          color="orange.500" 
        />
        <StatCard 
          label="Automated Blocks" 
          value="2,401" 
          icon={Ban} 
          trend="+18%" 
          isUp={true} 
          color="red.500" 
        />
        <StatCard 
          label="Unique Clients" 
          value="342" 
          icon={Users} 
          trend="Stable" 
          isUp={null} 
        />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, lg: 3 }} gap={6}>
        {/* 2. Critical Sunsets */}
        <Card.Root variant="outline" borderColor="gray.200" gridColumn={{ lg: "span 2" }} borderRadius="xl" bg="white">
          <Card.Header borderBottom="1px solid" borderColor="gray.100" py={5} px={6}>
            <Flex justify="space-between" align="center">
              <Box>
                <Text fontSize="lg" fontWeight="medium" color="gray.800">Critical Sunsets</Text>
                <Text fontSize="sm" color="gray.500" mt={0.5}>Intervention required for high-risk endpoints.</Text>
              </Box>
              <Badge variant="subtle" colorPalette="red" fontWeight="medium" borderRadius="md">
                Urgent
              </Badge>
            </Flex>
          </Card.Header>
          <Card.Body p={0}>
            <Table.Root size="md" variant="line">
              <Table.Header>
                <Table.Row bg="transparent">
                  <Table.ColumnHeader px={6} color="gray.400" fontWeight="medium">Endpoint</Table.ColumnHeader>
                  <Table.ColumnHeader color="gray.400" fontWeight="medium">Consumers</Table.ColumnHeader>
                  <Table.ColumnHeader color="gray.400" fontWeight="medium">Cutoff</Table.ColumnHeader>
                  <Table.ColumnHeader px={6} color="gray.400" fontWeight="medium">Risk Level</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <SunsetRow path="POST /v1/charge" clients="128" date="Apr 15" progress={85} />
                <SunsetRow path="GET /v1/auth/guest" clients="45" date="May 02" progress={62} />
                <SunsetRow path="POST /v1/refund" clients="12" date="Jun 10" progress={30} />
                <SunsetRow path="GET /v1/tokens" clients="2" date="Jun 12" progress={12} />
              </Table.Body>
            </Table.Root>
          </Card.Body>
        </Card.Root>

        {/* 3. Traffic Distribution */}
        <Card.Root variant="outline" borderColor="gray.200" borderRadius="xl" bg="white">
          <Card.Header borderBottom="1px solid" borderColor="gray.100" py={5} px={6}>
            <Text fontSize="lg" fontWeight="medium" color="gray.800">Version Adoption</Text>
            <Text fontSize="sm" color="gray.500" mt={0.5}>v1 vs v2 distribution</Text>
          </Card.Header>
          <Card.Body py={8} px={6}>
            <Stack gap={8}>
               <Box>
                 <Flex justify="space-between" mb={3}>
                   <Text fontSize="sm" fontWeight="medium" color="gray.700">v2.0 (Stable)</Text>
                   <Text fontSize="sm" color="gray.500">88%</Text>
                 </Flex>
                 <Progress.Root value={88} size="xs" colorPalette="blue">
                    <Progress.Track bg="gray.100"><Progress.Range /></Progress.Track>
                 </Progress.Root>
               </Box>
               <Box>
                 <Flex justify="space-between" mb={3}>
                   <Text fontSize="sm" fontWeight="medium" color="gray.700">v1.0 (Deprecated)</Text>
                   <Text fontSize="sm" color="gray.500">12%</Text>
                 </Flex>
                 <Progress.Root value={12} size="xs" colorPalette="orange">
                    <Progress.Track bg="gray.100"><Progress.Range /></Progress.Track>
                 </Progress.Root>
               </Box>
               <Box pt={6} mt={2} borderTop="1px solid" borderColor="gray.100">
                  <Text fontSize="xs" color="gray.400" textAlign="center" fontWeight="medium">
                    Projected 100% v2 migration by August 2026
                  </Text>
               </Box>
            </Stack>
          </Card.Body>
        </Card.Root>
      </SimpleGrid>
    </Stack>
  );
}

// Flat, Minimalist Stats Card
function StatCard({ label, value, icon: IconItem, trend, isUp, color = "gray.700" }: any) {
  return (
    <Card.Root variant="outline" borderColor="gray.200" borderRadius="xl" bg="white">
      <Card.Body p={6}>
        <Flex justify="space-between" align="flex-start">
          <Stack gap={2}>
            <Text fontSize="sm" fontWeight="medium" color="gray.500">
              {label}
            </Text>
            <Text fontSize="3xl" fontWeight="medium" color="gray.800" letterSpacing="tight">
              {value}
            </Text>
            {trend && (
              <Flex align="center" gap={1.5} mt={1}>
                {isUp !== null && (
                  <Icon 
                    as={isUp ? ArrowUpRight : TrendingDown} 
                    fontSize={14} 
                    color={isUp ? "green.500" : "red.500"} 
                  />
                )}
                <Text fontSize="xs" fontWeight="medium" color={isUp ? "green.500" : isUp === false ? "red.500" : "gray.400"}>
                  {trend}
                </Text>
              </Flex>
            )}
          </Stack>
          <Box p={2.5} border="1px solid" borderColor="gray.100" borderRadius="lg" bg="gray.50">
            <Icon as={IconItem} fontSize={18} color={color} strokeWidth={1.5} />
          </Box>
        </Flex>
      </Card.Body>
    </Card.Root>
  );
}

// Clean Table Row
function SunsetRow({ path, clients, date, progress }: any) {
  const getProgressColor = (val: number) => {
    if (val > 80) return "red";
    if (val > 50) return "orange";
    return "blue";
  };

  return (
    <Table.Row transition="background 0.2s" _hover={{ bg: "gray.50" }} borderBottomColor="gray.100">
      <Table.Cell px={6} py={4}>
        <Text fontFamily="mono" fontSize="sm" color="gray.700">{path}</Text>
      </Table.Cell>
      <Table.Cell py={4}>
        <Text fontSize="sm" color="gray.600">{clients}</Text>
      </Table.Cell>
      <Table.Cell py={4}>
        <Text fontSize="sm" color="gray.600">{date}</Text>
      </Table.Cell>
      <Table.Cell px={6} py={4}>
        <Box width="100px">
          <Progress.Root value={progress} colorPalette={getProgressColor(progress)} size="xs">
            <Progress.Track bg="gray.100"><Progress.Range /></Progress.Track>
          </Progress.Root>
        </Box>
      </Table.Cell>
    </Table.Row>
  );
}