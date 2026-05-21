import { Box, Flex, Text } from '@chakra-ui/react';

const tabs = ['Drafts', 'Verified', 'Archives'];
const activeTab = 'Verified';

export default function TopBar() {
  return (
    <Flex
      align="center"
      px="20px"
      h="52px"
      borderBottom="1px solid #e5e7eb"
      bg="white"
      gap="24px"
      flexShrink={0}
    >
      {/* Project title */}
      <Text fontSize="14px" fontWeight="700" color="#1a56db" whiteSpace="nowrap">
        Project: Carbon Lifecycle #D41243
      </Text>

      {/* Tabs */}
      <Flex align="center" gap="20px">
        {tabs.map((tab) => {
          const isActive = tab === activeTab;
          return (
            <Box key={tab} pb="2px" borderBottom={isActive ? '2px solid #1a56db' : '2px solid transparent'}>
              <Text
                fontSize="13px"
                fontWeight={isActive ? '600' : '400'}
                color={isActive ? '#1a56db' : '#6b7280'}
                cursor="pointer"
              >
                {tab}
              </Text>
            </Box>
          );
        })}
      </Flex>

      {/* Spacer */}
      <Box flex={1} />

      {/* Right actions */}
      <Flex align="center" gap="12px">
        <Text fontSize="18px" color="#6b7280" cursor="pointer">🕐</Text>
        <Text fontSize="18px" color="#6b7280" cursor="pointer">🗺️</Text>
        <Box w="1px" h="20px" bg="#e5e7eb" />
        <Text fontSize="13px" color="#374151" cursor="pointer">Undo</Text>
        <Box
          as="button"
          bg="#1a56db"
          color="white"
          borderRadius="8px"
          px="16px"
          py="7px"
          fontSize="13px"
          fontWeight="600"
          cursor="pointer"
          border="none"
          _hover={{ bg: '#1e40af' }}
        >
          Export Report
        </Box>
        <Box
          w="32px"
          h="32px"
          borderRadius="full"
          bg="#374151"
          overflow="hidden"
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="white"
          fontSize="14px"
          fontWeight="700"
        >
          A
        </Box>
      </Flex>
    </Flex>
  );
}
