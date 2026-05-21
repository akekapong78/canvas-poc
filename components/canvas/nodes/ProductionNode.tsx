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
      borderColor={selected ? '#164C9A' : '#E2E7EE'}
      borderRadius="12px"
      w="220px"
      boxShadow={selected ? '0 0 0 3px #B9D3F9' : 'sm'}
      overflow="hidden"
    >
      {/* Header */}
      <Flex align="center" gap="8px" p="12px" pb="8px">
        <Box
          w="32px"
          h="32px"
          bg="#E2F1FF"
          borderRadius="8px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontSize="16px"
        >
          🏭
        </Box>
        <Box flex={1}>
          <Text fontWeight="700" fontSize="13px" color="#1E252F" lineHeight="1.2">
            {data.label}
          </Text>
          <Text fontSize="10px" color="#647081" lineHeight="1.2">
            {data.subtitle}
          </Text>
        </Box>
        <Text fontSize="12px" color="#929CAA" cursor="pointer">×</Text>
      </Flex>

      {/* Load metric */}
      <Box borderTop="1px solid #F0F3F9" px="12px" py="10px">
        <Flex align="center" justify="space-between" mb="6px">
          <Text fontSize="10px" color="#647081" fontWeight="600" letterSpacing="0.05em">
            LOAD METRIC
          </Text>
          <Text fontSize="11px" fontWeight="700" color="#1E252F">
            {data.loadMetric}%
          </Text>
        </Flex>
        {/* Progress bar */}
        <Box bg="#E2E7EE" borderRadius="full" h="6px" overflow="hidden">
          <Box
            bg="#2162C5"
            h="100%"
            borderRadius="full"
            style={{ width: `${data.loadMetric}%` }}
          />
        </Box>
      </Box>

      <Handle type="target" position={Position.Left} style={{ background: '#2162C5' }} />
      <Handle type="source" position={Position.Right} style={{ background: '#2162C5' }} />
    </Box>
  );
}
