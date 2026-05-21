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
      border={isSelected ? '1.5px solid #1a56db' : '1px solid #e5e7eb'}
      borderRadius="8px"
      bg="white"
      cursor="grab"
      draggable
      onDragStart={onDragStart}
      _hover={{ borderColor: '#1a56db', boxShadow: 'sm' }}
      userSelect="none"
    >
      <Box
        w="28px"
        h="28px"
        bg="#eff6ff"
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
        <Text fontSize="13px" fontWeight="600" color="#111827" lineHeight="1.2">
          {item.label}
        </Text>
        <Text fontSize="10px" color="#9ca3af" letterSpacing="0.04em">
          {item.sublabel}
        </Text>
      </Box>
    </Flex>
  );
}
