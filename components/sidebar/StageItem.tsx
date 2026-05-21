'use client';

import { Box, Flex, Text } from '@chakra-ui/react';
import type { StageItem } from '@/lib/stageItems';

const iconMap: Record<string, string> = {
  extraction: '🌿',
  production: '⚙️',
  packaging: '📦',
  logistics: '🚚',
};

interface StageItemProps {
  item: StageItem;
  isSelected?: boolean;
}

export default function StageItemCard({ item, isSelected }: StageItemProps) {
  const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('stageType', item.type);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <Flex
      align="center"
      gap="10px"
      p="10px 12px"
      border={isSelected ? '1.5px solid #2162C5' : '1px solid #E2E7EE'}
      borderRadius="8px"
      bg="white"
      cursor="grab"
      draggable
      onDragStart={onDragStart}
      _hover={{ borderColor: '#2162C5', boxShadow: 'sm' }}
      userSelect="none"
    >
      <Box
        w="28px"
        h="28px"
        bg="#E2F1FF"
        borderRadius="6px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontSize="14px"
        flexShrink={0}
      >
        {iconMap[item.type] ?? '📋'}
      </Box>
      <Box>
        <Text fontSize="13px" fontWeight="600" color="#1E252F" lineHeight="1.2">
          {item.label}
        </Text>
        <Text fontSize="10px" color="#929CAA" letterSpacing="0.04em">
          {item.sublabel}
        </Text>
      </Box>
    </Flex>
  );
}
