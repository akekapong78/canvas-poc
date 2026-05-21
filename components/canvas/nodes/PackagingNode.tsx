import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import { Box, Flex, Text } from '@chakra-ui/react';

export type PackagingNodeData = {
  label: string;
  subtitle: string;
  units: number;
  kgCo2e: number;
};

type PackagingNodeType = Node<PackagingNodeData, 'packaging'>;

export default function PackagingNode({ data, selected }: NodeProps<PackagingNodeType>) {
  return (
    <Box
      bg="white"
      border="1.5px solid"
      borderColor={selected ? '#2162C5' : '#E2E7EE'}
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
          bg="#E2F1FF"
          borderRadius="8px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontSize="16px"
        >
          📦
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

      {/* Stats */}
      <Box borderTop="1px solid #F0F3F9" px="12px" py="8px">
        <Flex gap="16px">
          <Box>
            <Text fontSize="9px" color="#647081" fontWeight="600" letterSpacing="0.05em" mb="2px">
              UNITS
            </Text>
            <Text fontSize="13px" fontWeight="700" color="#1E252F">
              {data.units.toLocaleString()}
            </Text>
          </Box>
          <Box>
            <Text fontSize="9px" color="#647081" fontWeight="600" letterSpacing="0.05em" mb="2px">
              KG CO2E
            </Text>
            <Text fontSize="13px" fontWeight="700" color="#1E252F">
              {data.kgCo2e}
            </Text>
          </Box>
        </Flex>
      </Box>

      <Handle type="target" position={Position.Left} style={{ background: '#2162C5' }} />
    </Box>
  );
}
