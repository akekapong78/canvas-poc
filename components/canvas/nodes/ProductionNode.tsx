import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import { Box, Flex, Text } from '@chakra-ui/react';

export type ProductionNodeData = {
  label: string;
  subtitle: string;
  loadMetric: number;
};

type ProductionNodeType = Node<ProductionNodeData, 'production'>;

export default function ProductionNode({ data, selected }: NodeProps<ProductionNodeType>) {
  return (
    <Box
      bg="white"
      border="2px solid"
      borderColor={selected ? '#1e3a8a' : '#e2e8f0'}
      borderRadius="12px"
      w="220px"
      boxShadow={selected ? '0 0 0 3px #bfdbfe' : 'sm'}
      overflow="hidden"
    >
      {/* Header */}
      <Flex align="center" gap="8px" p="12px" pb="8px">
        <Box
          w="32px"
          h="32px"
          bg="#eff6ff"
          borderRadius="8px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontSize="16px"
        >
          🏭
        </Box>
        <Box flex={1}>
          <Text fontWeight="700" fontSize="13px" color="#111827" lineHeight="1.2">
            {data.label}
          </Text>
          <Text fontSize="10px" color="#6b7280" lineHeight="1.2">
            {data.subtitle}
          </Text>
        </Box>
        <Text fontSize="12px" color="#9ca3af" cursor="pointer">×</Text>
      </Flex>

      {/* Load metric */}
      <Box borderTop="1px solid #f3f4f6" px="12px" py="10px">
        <Flex align="center" justify="space-between" mb="6px">
          <Text fontSize="10px" color="#6b7280" fontWeight="600" letterSpacing="0.05em">
            LOAD METRIC
          </Text>
          <Text fontSize="11px" fontWeight="700" color="#111827">
            {data.loadMetric}%
          </Text>
        </Flex>
        {/* Progress bar */}
        <Box bg="#e5e7eb" borderRadius="full" h="6px" overflow="hidden">
          <Box
            bg="#1a56db"
            h="100%"
            borderRadius="full"
            style={{ width: `${data.loadMetric}%` }}
          />
        </Box>
      </Box>

      <Handle type="target" position={Position.Left} style={{ background: '#1a56db' }} />
      <Handle type="source" position={Position.Right} style={{ background: '#1a56db' }} />
    </Box>
  );
}
