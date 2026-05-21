'use client';

import { useState } from 'react';
import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import StageItemCard from './StageItem';
import { stageItems } from '@/lib/stageItems';
import { assetPath } from '@/lib/asset-path';

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
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Flex
      direction="column"
      w={collapsed ? '56px' : '240px'}
      minW={collapsed ? '56px' : '240px'}
      h="100%"
      bg="white"
      borderRight="1px solid #E2E7EE"
      overflow="hidden"
      position="relative"
      style={{ transition: 'width 0.2s ease, min-width 0.2s ease' }}
    >
      {/* Logo */}
      <Flex align="center" px={collapsed ? '12px' : '16px'} py="14px" borderBottom="1px solid #F0F3F9" justify={collapsed ? 'center' : 'space-between'}>
        {!collapsed && (
          <img src={assetPath('/carbonform-logo.svg')} alt="Carbonform" width={130} height={28} style={{ objectFit: 'contain' }} />
        )}
        {collapsed && (
          <img src={assetPath('/icons/layers.svg')} alt="Carbonform" width={20} height={20} style={{ opacity: 0.6 }} />
        )}
        <Box
          as="button"
          w="24px"
          h="24px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="4px"
          cursor="pointer"
          flexShrink={0}
          ml={collapsed ? '0' : '8px'}
          color="#647081"
          fontSize="14px"
          _hover={{ bg: '#F3F8FD', color: '#2162C5' }}
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? '›' : '‹'}
        </Box>
      </Flex>

      {/* Main nav */}
      <VStack gap="2px" align="stretch" px="8px" py="8px">
        {navItems.map((item) => (
          <Flex
            key={item.label}
            align="center"
            gap={collapsed ? '0' : '10px'}
            px={collapsed ? '0' : '10px'}
            py="8px"
            borderRadius="6px"
            bg={item.active ? '#2162C5' : 'transparent'}
            cursor="pointer"
            justify={collapsed ? 'center' : 'flex-start'}
            title={collapsed ? item.label : undefined}
            _hover={{ bg: item.active ? '#164C9A' : '#F3F8FD' }}
          >
            <Box w="16px" h="16px" flexShrink={0} display="flex" alignItems="center" justifyContent="center"
              style={{ filter: item.active ? 'brightness(0) invert(1)' : 'none' }}
            >
              <img src={assetPath(item.icon)} alt={item.label} width={16} height={16} />
            </Box>
            {!collapsed && (
              <Text
                fontSize="13px"
                fontWeight={item.active ? '600' : '400'}
                color={item.active ? 'white' : '#373E4A'}
              >
                {item.label}
              </Text>
            )}
          </Flex>
        ))}
      </VStack>

      {/* Lifecycle Stages panel — hidden when collapsed */}
      {!collapsed && (
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
      )}

      {/* Bottom nav */}
      <VStack gap="2px" align="stretch" px="8px" py="8px" borderTop="1px solid #F0F3F9" mt={collapsed ? 'auto' : '0'}>
        {bottomNavItems.map((item) => (
          <Flex
            key={item.label}
            align="center"
            gap={collapsed ? '0' : '10px'}
            px={collapsed ? '0' : '10px'}
            py="8px"
            borderRadius="6px"
            cursor="pointer"
            justify={collapsed ? 'center' : 'flex-start'}
            title={collapsed ? item.label : undefined}
            _hover={{ bg: '#F3F8FD' }}
          >
            <Box w="16px" h="16px" flexShrink={0} display="flex" alignItems="center" justifyContent="center">
              <img src={assetPath(item.icon)} alt={item.label} width={16} height={16} />
            </Box>
            {!collapsed && <Text fontSize="13px" color="#373E4A">{item.label}</Text>}
          </Flex>
        ))}
      </VStack>
    </Flex>
  );
}
