import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import { Box, Flex, Text } from '@chakra-ui/react';

export type ExtractionNodeData = {
  label: string;
  subtitle: string;
  outputLabel: string;
  outputCount: number;
};

type ExtractionNodeType = Node<ExtractionNodeData, 'extraction'>;

export default function ExtractionNode({ data, selected }: NodeProps<ExtractionNodeType>) {
  return (
    <Box
      bg="white"
      border="1.5px solid"
      borderColor={selected ? '#1a56db' : '#e2e8f0'}
      borderRadius="12px"
      w="200px"
      boxShadow="sm"
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
          🌿
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

      {/* Output section */}
      <Box borderTop="1px solid #f3f4f6" px="12px" py="8px">
        <Flex align="center" justify="space-between">
          <Text fontSize="10px" color="#6b7280" fontWeight="600" letterSpacing="0.05em">
            OUTPUT: {data.outputLabel}
          </Text>
          <Box
            bg="#1a56db"
            color="white"
            borderRadius="full"
            px="6px"
            py="1px"
            fontSize="10px"
            fontWeight="700"
          >
            {data.outputCount}
          </Box>
        </Flex>
      </Box>

      <Handle type="source" position={Position.Right} style={{ background: '#1a56db' }} />
    </Box>
  );
}
