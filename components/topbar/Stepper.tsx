import { Box, Flex, Text } from '@chakra-ui/react';

const steps = [
  { id: 1, label: 'PARAMETERS' },
  { id: 2, label: 'BUILD FLOW' },
  { id: 3, label: 'ALLOCATION' },
  { id: 4, label: 'REVIEW' },
];

const activeStep = 2;

export default function Stepper() {
  return (
    <Flex
      align="center"
      justify="center"
      gap="0"
      py="12px"
      borderBottom="1px solid #E2E7EE"
      bg="white"
    >
      {steps.map((step, index) => {
        const isActive = step.id === activeStep;
        const isPast = step.id < activeStep;

        return (
          <Flex key={step.id} align="center">
            {/* Step circle + label */}
            <Flex align="center" gap="8px" px="8px">
              <Box
                w="24px"
                h="24px"
                borderRadius="full"
                bg={isActive ? '#2162C5' : isPast ? '#2162C5' : '#E2E7EE'}
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexShrink={0}
              >
                <Text
                  fontSize="11px"
                  fontWeight="700"
                  color={isActive || isPast ? 'white' : '#929CAA'}
                >
                  {step.id}
                </Text>
              </Box>
              <Text
                fontSize="11px"
                fontWeight={isActive ? '700' : '500'}
                color={isActive ? '#2162C5' : isPast ? '#647081' : '#929CAA'}
                letterSpacing="0.06em"
              >
                {step.label}
              </Text>
            </Flex>

            {/* Connector line */}
            {index < steps.length - 1 && (
              <Box w="60px" h="1px" bg="#E2E7EE" mx="4px" />
            )}
          </Flex>
        );
      })}
    </Flex>
  );
}
