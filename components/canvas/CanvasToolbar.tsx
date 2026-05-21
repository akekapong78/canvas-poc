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
        border="1px solid #E2E7EE"
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
          color="#373E4A"
          cursor="pointer"
          _hover={{ bg: '#F3F8FD' }}
          onClick={() => zoomOut()}
          border="none"
          bg="transparent"
        >
          −
        </Box>
        <Text fontSize="12px" fontWeight="600" color="#373E4A" px="4px" minW="44px" textAlign="center">
          250%
        </Text>
        <Box
          as="button"
          px="10px"
          py="6px"
          fontSize="16px"
          color="#373E4A"
          cursor="pointer"
          _hover={{ bg: '#F3F8FD' }}
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
        border="1px solid #E2E7EE"
        borderRadius="8px"
        px="12px"
        py="6px"
        fontSize="12px"
        fontWeight="600"
        color="#373E4A"
        cursor="pointer"
        boxShadow="sm"
        _hover={{ bg: '#F3F8FD' }}
        onClick={() => fitView({ padding: 0.2 })}
      >
        FIT TO VIEW
      </Box>

      {/* Load Template */}
      <Flex
        as="button"
        bg="#2162C5"
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
        _hover={{ bg: '#164C9A' }}
        border="none"
      >
        <Text>⚡</Text>
        <Text>LOAD TEMPLATE</Text>
      </Flex>
    </Box>
  );
}
