import Image from 'next/image';
import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import StageItemCard from './StageItem';
import { stageItems } from '@/lib/stageItems';

const navItems = [
  { label: 'Home', icon: '/icons/home.svg' },
  { label: 'Dashboard', icon: '/icons/bar-chart.svg' },
  { label: 'Inventory', icon: '/icons/list.svg' },
  { label: 'Life Cycle', icon: '/icons/layers.svg', active: true },
  { label: 'Reduction Target', icon: '/icons/reduce-arrow.svg' },
  { label: 'Supply Chain', icon: '/icons/switch-arrow.svg' },
  { label: 'Reports', icon: '/icons/report.svg' },
];

const bottomNavItems = [
  { label: 'Support', icon: '/icons/featured-icon.svg' },
  { label: 'Settings', icon: '/icons/dot.svg' },
];

export default function Sidebar() {
  return (
    <Flex
      direction="column"
      w="240px"
      minW="240px"
      h="100%"
      bg="white"
      borderRight="1px solid #E2E7EE"
      overflow="hidden"
    >
      {/* Logo */}
      <Flex align="center" px="16px" py="14px" borderBottom="1px solid #F0F3F9">
        <Image src="/carbonform-logo.svg" alt="Carbonform" width={130} height={28} style={{ objectFit: 'contain' }} />
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
            bg={item.active ? '#2162C5' : 'transparent'}
            cursor="pointer"
            _hover={{ bg: item.active ? '#164C9A' : '#F3F8FD' }}
          >
            <Box w="16px" h="16px" flexShrink={0} display="flex" alignItems="center" justifyContent="center"
              style={{ filter: item.active ? 'brightness(0) invert(1)' : 'none' }}
            >
              <Image src={item.icon} alt={item.label} width={16} height={16} />
            </Box>
            <Text
              fontSize="13px"
              fontWeight={item.active ? '600' : '400'}
              color={item.active ? 'white' : '#373E4A'}
            >
              {item.label}
            </Text>
          </Flex>
        ))}
      </VStack>

      {/* Lifecycle Stages panel */}
      <Box px="12px" py="10px" borderTop="1px solid #F0F3F9" flex={1} overflow="auto">
        <Text fontSize="10px" fontWeight="700" color="#373E4A" letterSpacing="0.08em" mb="4px">
          LIFECYCLE STAGES
        </Text>
        <Text fontSize="10px" color="#929CAA" mb="10px">DRAG TO CANVAS</Text>
        <VStack gap="8px" align="stretch">
          {stageItems.map((item) => (
            <StageItemCard key={item.type} item={item} isSelected={item.type === 'production'} />
          ))}
        </VStack>

        {/* Multi-output */}
        <Box mt="16px" pt="12px" borderTop="1px solid #F0F3F9">
          <Text fontSize="10px" fontWeight="700" color="#373E4A" letterSpacing="0.08em" mb="8px">
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
                border="1px dashed #D2D8DF"
                borderRadius="6px"
                cursor="pointer"
              >
                <Text fontSize="10px" color="#647081" fontWeight="600" letterSpacing="0.04em">
                  {label}
                </Text>
                <Text fontSize="12px" color="#929CAA">↗</Text>
              </Flex>
            ))}
          </VStack>
        </Box>

        {/* Expert tip */}
        <Box mt="16px" p="10px" bg="#E2F1FF" borderRadius="8px" border="1px solid #B9D3F9">
          <Text fontSize="10px" fontWeight="700" color="#2162C5" mb="4px">📍 EXPERT TIP</Text>
          <Text fontSize="10px" color="#373E4A" lineHeight="1.5">
            Connect nodes by dragging from output ports (right) to input ports (left) to define carbon transfer flows.
          </Text>
        </Box>
      </Box>

      {/* Bottom nav */}
      <VStack gap="2px" align="stretch" px="8px" py="8px" borderTop="1px solid #F0F3F9">
        {bottomNavItems.map((item) => (
          <Flex
            key={item.label}
            align="center"
            gap="10px"
            px="10px"
            py="8px"
            borderRadius="6px"
            cursor="pointer"
            _hover={{ bg: '#F3F8FD' }}
          >
            <Box w="16px" h="16px" flexShrink={0} display="flex" alignItems="center" justifyContent="center">
              <Image src={item.icon} alt={item.label} width={16} height={16} />
            </Box>
            <Text fontSize="13px" color="#373E4A">{item.label}</Text>
          </Flex>
        ))}
      </VStack>
    </Flex>
  );
}
