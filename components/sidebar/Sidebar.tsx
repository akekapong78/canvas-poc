import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import StageItemCard from './StageItem';
import { stageItems } from '@/lib/stageItems';

const navItems = [
  { label: 'Home', icon: '🏠' },
  { label: 'Dashboard', icon: '📊' },
  { label: 'Inventory', icon: '☰' },
  { label: 'Life Cycle', icon: '♻️', active: true },
  { label: 'Reduction Target', icon: '📈' },
  { label: 'Supply Chain', icon: '🔗' },
  { label: 'Reports', icon: '📄' },
];

const bottomNavItems = [
  { label: 'Support', icon: '💬' },
  { label: 'Settings', icon: '⚙️' },
];

export default function Sidebar() {
  return (
    <Flex
      direction="column"
      w="240px"
      minW="240px"
      h="100%"
      bg="white"
      borderRight="1px solid #e5e7eb"
      overflow="hidden"
    >
      {/* Logo */}
      <Flex align="center" gap="8px" px="16px" py="14px" borderBottom="1px solid #f3f4f6">
        <Box
          w="28px"
          h="28px"
          bg="#1a56db"
          borderRadius="6px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="white"
          fontSize="14px"
          fontWeight="700"
        >
          C
        </Box>
        <Box>
          <Text fontSize="12px" fontWeight="700" color="#111827" lineHeight="1">carbon</Text>
          <Text fontSize="12px" fontWeight="700" color="#111827" lineHeight="1">form</Text>
        </Box>
      </Flex>

      {/* Main nav */}
      <VStack gap="2px" align="stretch" px="8px" py="8px">
        {navItems.map((item) => (
          <Flex
            key={item.label}
            align="center"
            gap="10px"
            px="10px"
            py="8px"
            borderRadius="6px"
            bg={item.active ? '#1a56db' : 'transparent'}
            cursor="pointer"
            _hover={{ bg: item.active ? '#1e40af' : '#f9fafb' }}
          >
            <Text fontSize="14px">{item.icon}</Text>
            <Text
              fontSize="13px"
              fontWeight={item.active ? '600' : '400'}
              color={item.active ? 'white' : '#374151'}
            >
              {item.label}
            </Text>
          </Flex>
        ))}
      </VStack>

      {/* Lifecycle Stages panel */}
      <Box px="12px" py="10px" borderTop="1px solid #f3f4f6" flex={1} overflow="auto">
        <Text fontSize="10px" fontWeight="700" color="#374151" letterSpacing="0.08em" mb="4px">
          LIFECYCLE STAGES
        </Text>
        <Text fontSize="10px" color="#9ca3af" mb="10px">DRAG TO CANVAS</Text>
        <VStack gap="8px" align="stretch">
          {stageItems.map((item) => (
            <StageItemCard key={item.type} item={item} isSelected={item.type === 'production'} />
          ))}
        </VStack>

        {/* Multi-output */}
        <Box mt="16px" pt="12px" borderTop="1px solid #f3f4f6">
          <Text fontSize="10px" fontWeight="700" color="#374151" letterSpacing="0.08em" mb="8px">
            MULTI-OUTPUT
          </Text>
          <VStack gap="6px" align="stretch">
            {['ALLOCATION SPLIT', 'BY-PRODUCT'].map((label) => (
              <Flex
                key={label}
                align="center"
                justify="space-between"
                px="10px"
                py="7px"
                border="1px dashed #d1d5db"
                borderRadius="6px"
                cursor="pointer"
              >
                <Text fontSize="10px" color="#6b7280" fontWeight="600" letterSpacing="0.04em">
                  {label}
                </Text>
                <Text fontSize="12px" color="#9ca3af">↗</Text>
              </Flex>
            ))}
          </VStack>
        </Box>

        {/* Expert tip */}
        <Box mt="16px" p="10px" bg="#eff6ff" borderRadius="8px" border="1px solid #bfdbfe">
          <Text fontSize="10px" fontWeight="700" color="#1a56db" mb="4px">📍 EXPERT TIP</Text>
          <Text fontSize="10px" color="#374151" lineHeight="1.5">
            Connect nodes by dragging from output ports (right) to input ports (left) to define carbon transfer flows.
          </Text>
        </Box>
      </Box>

      {/* Bottom nav */}
      <VStack gap="2px" align="stretch" px="8px" py="8px" borderTop="1px solid #f3f4f6">
        {bottomNavItems.map((item) => (
          <Flex
            key={item.label}
            align="center"
            gap="10px"
            px="10px"
            py="8px"
            borderRadius="6px"
            cursor="pointer"
            _hover={{ bg: '#f9fafb' }}
          >
            <Text fontSize="14px">{item.icon}</Text>
            <Text fontSize="13px" color="#374151">{item.label}</Text>
          </Flex>
        ))}
      </VStack>
    </Flex>
  );
}
