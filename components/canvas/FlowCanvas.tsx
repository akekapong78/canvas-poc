'use client';

import { useCallback, useState } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  addEdge,
  type OnConnect,
  type Node,
  type Edge,
  type ReactFlowInstance,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Box } from '@chakra-ui/react';
import CanvasToolbar from './CanvasToolbar';

import { nodeTypes } from '@/lib/nodeTypes';

const defaultNodeData: Record<string, Record<string, unknown>> = {
  extraction: { label: 'Extraction', subtitle: 'New Stage', outputLabel: 'RAW_01', outputCount: 0 },
  production: { label: 'Processing', subtitle: 'New Stage', loadMetric: 0 },
  packaging: { label: 'Packaging', subtitle: 'New Stage', units: 0, kgCo2e: 0 },
  logistics: { label: 'Logistics', subtitle: 'New Stage', outputLabel: 'LOG_01', outputCount: 0 },
};

interface FlowCanvasProps {
  initialNodes: Node[];
  initialEdges: Edge[];
}

export default function FlowCanvas({ initialNodes, initialEdges }: FlowCanvasProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance | null>(null);

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, type: 'smoothstep' }, eds)),
    [setEdges],
  );

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const stageType = event.dataTransfer.getData('stageType');
      if (!stageType || !rfInstance) return;

      const position = rfInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: Node = {
        id: crypto.randomUUID(),
        type: stageType,
        position,
        data: defaultNodeData[stageType] ?? { label: stageType, subtitle: 'New Stage' },
      };

      setNodes((prev) => [...prev, newNode]);
    },
    [rfInstance, setNodes],
  );

  return (
    <Box flex={1} position="relative" bg="#f9fafb" overflow="hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setRfInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.1}
        maxZoom={4}
      >
        <CanvasToolbar />
        <MiniMap
          style={{ background: '#f3f4f6', border: '1px solid #e5e7eb' }}
          maskColor="rgba(0,0,0,0.05)"
        />
        <Controls showInteractive={false} />
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#d1d5db" />
      </ReactFlow>

      {/* FAB */}
      <Box
        position="absolute"
        bottom="20px"
        right="20px"
        w="44px"
        h="44px"
        bg="#1a56db"
        borderRadius="full"
        display="flex"
        alignItems="center"
        justifyContent="center"
        color="white"
        fontSize="22px"
        cursor="pointer"
        boxShadow="lg"
        zIndex={10}
        _hover={{ bg: '#1e40af' }}
      >
        +
      </Box>
    </Box>
  );
}
