import { Flex } from '@chakra-ui/react';
import Sidebar from '@/components/sidebar/Sidebar';
import TopBar from '@/components/topbar/TopBar';
import Stepper from '@/components/topbar/Stepper';
import FlowCanvas from '@/components/canvas/FlowCanvas';
import { initialNodes, initialEdges } from '@/lib/initialElements';

export default function Page() {
  return (
    <Flex h="100vh" overflow="hidden">
      <Sidebar />
      <Flex flex={1} direction="column" overflow="hidden" minW={0}>
        <TopBar />
        <Stepper />
        <FlowCanvas initialNodes={initialNodes} initialEdges={initialEdges} />
      </Flex>
    </Flex>
  );
}
