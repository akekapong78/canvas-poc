'use client';

import { Box, Flex, Text } from '@chakra-ui/react';
import { useReactFlow } from '@xyflow/react';

export default function CanvasToolbar() {
  const { zoomIn, zoomOut, fitView } = useReactFlow();

  return (
    <Box
      position="absolute"
      top="12px"
      left="12px"
      zIndex={10}
      display="flex"
      gap="8px"
      alignItems="center"
    >
      {/* Zoom controls */}
      <Flex
        bg="white"
        border="1px solid #e5e7eb"
        borderRadius="8px"
        align="center"
        overflow="hidden"
        boxShadow="sm"
      >
        <Box
          as="button"
          px="10px"
          py="6px"
          fontSize="16px"
          color="#374151"
          cursor="pointer"
          _hover={{ bg: '#f9fafb' }}
          onClick={() => zoomOut()}
          border="none"
          bg="transparent"
        >
          −
        </Box>
        <Text fontSize="12px" fontWeight="600" color="#374151" px="4px" minW="44px" textAlign="center">
          250%
        </Text>
        <Box
          as="button"
          px="10px"
          py="6px"
          fontSize="16px"
          color="#374151"
          cursor="pointer"
          _hover={{ bg: '#f9fafb' }}
          onClick={() => zoomIn()}
          border="none"
          bg="transparent"
        >
          +
        </Box>
      </Flex>

      {/* Fit to View */}
      <Box
        as="button"
        bg="white"
        border="1px solid #e5e7eb"
        borderRadius="8px"
        px="12px"
        py="6px"
        fontSize="12px"
        fontWeight="600"
        color="#374151"
        cursor="pointer"
        boxShadow="sm"
        _hover={{ bg: '#f9fafb' }}
        onClick={() => fitView({ padding: 0.2 })}
      >
        FIT TO VIEW
      </Box>

      {/* Load Template */}
      <Flex
        as="button"
        bg="#1a56db"
        color="white"
        borderRadius="8px"
        px="12px"
        py="6px"
        fontSize="12px"
        fontWeight="600"
        align="center"
        gap="6px"
        cursor="pointer"
        boxShadow="sm"
        _hover={{ bg: '#1e40af' }}
        border="none"
      >
        <Text>⚡</Text>
        <Text>LOAD TEMPLATE</Text>
      </Flex>
    </Box>
  );
}
