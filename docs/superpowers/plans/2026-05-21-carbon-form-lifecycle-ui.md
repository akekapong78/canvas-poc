# Carbon Form Lifecycle UI Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an interactive Carbon Form lifecycle canvas prototype with custom ReactFlow nodes, drag-from-sidebar-to-canvas, Chakra UI v3 layout shell, and 3 custom node types.

**Architecture:** Feature-based component split — `page.tsx` owns nodes/edges state; sidebar/topbar are stateless; drag-to-canvas uses HTML5 DnD + ReactFlow `onInit`/`screenToFlowPosition`; Chakra UI v3 for all layout and styling.

**Tech Stack:** Next.js 15 App Router, TypeScript, @chakra-ui/react (v3), @xyflow/react (v12)

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `package.json` | Modify | Add @chakra-ui/react |
| `app/layout.tsx` | Modify | Wrap with Chakra Provider |
| `app/globals.css` | Modify | Reset only — remove main height |
| `components/ui/provider.tsx` | Create | ChakraProvider wrapper |
| `lib/stageItems.ts` | Create | Stage panel item definitions |
| `lib/initialElements.ts` | Create | Demo nodes + edges |
| `lib/nodeTypes.ts` | Create | nodeTypes map for ReactFlow |
| `components/canvas/nodes/ExtractionNode.tsx` | Create | Custom extraction node |
| `components/canvas/nodes/ProductionNode.tsx` | Create | Custom production node |
| `components/canvas/nodes/PackagingNode.tsx` | Create | Custom packaging node |
| `components/canvas/CanvasToolbar.tsx` | Create | Zoom + fit + template toolbar |
| `components/canvas/FlowCanvas.tsx` | Create | ReactFlow wrapper + drop handler |
| `components/topbar/Stepper.tsx` | Create | 4-step progress indicator |
| `components/topbar/TopBar.tsx` | Create | Project header + tabs + buttons |
| `components/sidebar/StageItem.tsx` | Create | Draggable stage panel item |
| `components/sidebar/Sidebar.tsx` | Create | Nav + stages panel + multi-output |
| `app/page.tsx` | Modify | Assemble layout, own nodes/edges state |

---

### Task 1: Install Chakra UI v3 + configure provider

**Files:**
- Modify: `package.json`
- Create: `components/ui/provider.tsx`
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Install Chakra UI v3**

```bash
cd /Users/ake/Downloads/canvas && npm install @chakra-ui/react
```

Expected: installs without errors.

- [ ] **Step 2: Create `components/ui/provider.tsx`**

```typescript
'use client';

import { ChakraProvider, defaultSystem } from '@chakra-ui/react';

export function Provider({ children }: { children: React.ReactNode }) {
  return <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>;
}
```

- [ ] **Step 3: Update `app/layout.tsx`**

```typescript
import type { Metadata } from 'next';
import { Provider } from '@/components/ui/provider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Carbon Form — Lifecycle Builder',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Update `app/globals.css`**

```css
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}
```

- [ ] **Step 5: Verify TypeScript**

```bash
cd /Users/ake/Downloads/canvas && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add components/ui/provider.tsx app/layout.tsx app/globals.css package.json package-lock.json
git commit -m "feat: install Chakra UI v3 and configure provider"
```

---

### Task 2: Create lib/ data files

**Files:**
- Create: `lib/stageItems.ts`
- Create: `lib/initialElements.ts`
- Create: `lib/nodeTypes.ts`

- [ ] **Step 1: Create `lib/stageItems.ts`**

```typescript
export interface StageItem {
  type: 'extraction' | 'production' | 'packaging' | 'logistics';
  label: string;
  sublabel: string;
}

export const stageItems: StageItem[] = [
  { type: 'extraction', label: 'Extraction', sublabel: 'RAW MATERIALS' },
  { type: 'production', label: 'Processing', sublabel: 'MANUFACTURING' },
  { type: 'packaging', label: 'Packaging', sublabel: 'SECONDARY PROCESS' },
  { type: 'logistics', label: 'Logistics', sublabel: 'TRANSPORT' },
];
```

- [ ] **Step 2: Create `lib/initialElements.ts`**

```typescript
import type { Node, Edge } from '@xyflow/react';

export const initialNodes: Node[] = [
  {
    id: '1',
    type: 'extraction',
    position: { x: 100, y: 200 },
    data: {
      label: 'Extraction',
      subtitle: 'Raw Coconut Harvest',
      outputLabel: 'RAW_01',
      outputCount: 12,
    },
  },
  {
    id: '2',
    type: 'production',
    position: { x: 420, y: 180 },
    data: {
      label: 'Production',
      subtitle: 'Pasteurization & Bottling',
      loadMetric: 82,
    },
  },
  {
    id: '3',
    type: 'packaging',
    position: { x: 740, y: 200 },
    data: {
      label: 'Packaging',
      subtitle: 'Primary & Secondary',
      units: 10000,
      kgCo2e: 0.12,
    },
  },
];

export const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', type: 'smoothstep' },
  { id: 'e2-3', source: '2', target: '3', type: 'smoothstep' },
];
```

- [ ] **Step 3: Create `lib/nodeTypes.ts` (stub — updated after nodes exist)**

```typescript
// Populated in Task 5 after all node components are created
export const nodeTypes = {};
```

- [ ] **Step 4: Commit**

```bash
git add lib/stageItems.ts lib/initialElements.ts lib/nodeTypes.ts
git commit -m "feat: add lib data files for stages, nodes, edges"
```

---

### Task 3: Create ExtractionNode

**Files:**
- Create: `components/canvas/nodes/ExtractionNode.tsx`

- [ ] **Step 1: Create `components/canvas/nodes/ExtractionNode.tsx`**

```typescript
import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import { Box, Flex, Text } from '@chakra-ui/react';

export type ExtractionNodeData = {
  label: string;
  subtitle: string;
  outputLabel: string;
  outputCount: number;
};

type ExtractionNodeType = Node<ExtractionNodeData, 'extraction'>;

export default function ExtractionNode({ data, selected }: NodeProps<ExtractionNodeType>) {
  return (
    <Box
      bg="white"
      border="1.5px solid"
      borderColor={selected ? '#1a56db' : '#e2e8f0'}
      borderRadius="12px"
      w="200px"
      boxShadow="sm"
      overflow="hidden"
    >
      {/* Header */}
      <Flex align="center" gap="8px" p="12px" pb="8px">
        <Box
          w="32px"
          h="32px"
          bg="#eff6ff"
          borderRadius="8px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontSize="16px"
        >
          🌿
        </Box>
        <Box flex={1}>
          <Text fontWeight="700" fontSize="13px" color="#111827" lineHeight="1.2">
            {data.label}
          </Text>
          <Text fontSize="10px" color="#6b7280" lineHeight="1.2">
            {data.subtitle}
          </Text>
        </Box>
        <Text fontSize="12px" color="#9ca3af" cursor="pointer">×</Text>
      </Flex>

      {/* Output section */}
      <Box borderTop="1px solid #f3f4f6" px="12px" py="8px">
        <Flex align="center" justify="space-between">
          <Text fontSize="10px" color="#6b7280" fontWeight="600" letterSpacing="0.05em">
            OUTPUT: {data.outputLabel}
          </Text>
          <Box
            bg="#1a56db"
            color="white"
            borderRadius="full"
            px="6px"
            py="1px"
            fontSize="10px"
            fontWeight="700"
          >
            {data.outputCount}
          </Box>
        </Flex>
      </Box>

      <Handle type="source" position={Position.Right} style={{ background: '#1a56db' }} />
    </Box>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/canvas/nodes/ExtractionNode.tsx
git commit -m "feat: add ExtractionNode custom ReactFlow node"
```

---

### Task 4: Create ProductionNode

**Files:**
- Create: `components/canvas/nodes/ProductionNode.tsx`

- [ ] **Step 1: Create `components/canvas/nodes/ProductionNode.tsx`**

```typescript
import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import { Box, Flex, Text } from '@chakra-ui/react';

export type ProductionNodeData = {
  label: string;
  subtitle: string;
  loadMetric: number;
};

type ProductionNodeType = Node<ProductionNodeData, 'production'>;

export default function ProductionNode({ data, selected }: NodeProps<ProductionNodeType>) {
  return (
    <Box
      bg="white"
      border="2px solid"
      borderColor={selected ? '#1e3a8a' : '#e2e8f0'}
      borderRadius="12px"
      w="220px"
      boxShadow={selected ? '0 0 0 3px #bfdbfe' : 'sm'}
      overflow="hidden"
    >
      {/* Header */}
      <Flex align="center" gap="8px" p="12px" pb="8px">
        <Box
          w="32px"
          h="32px"
          bg="#eff6ff"
          borderRadius="8px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontSize="16px"
        >
          🏭
        </Box>
        <Box flex={1}>
          <Text fontWeight="700" fontSize="13px" color="#111827" lineHeight="1.2">
            {data.label}
          </Text>
          <Text fontSize="10px" color="#6b7280" lineHeight="1.2">
            {data.subtitle}
          </Text>
        </Box>
        <Text fontSize="12px" color="#9ca3af" cursor="pointer">×</Text>
      </Flex>

      {/* Load metric */}
      <Box borderTop="1px solid #f3f4f6" px="12px" py="10px">
        <Flex align="center" justify="space-between" mb="6px">
          <Text fontSize="10px" color="#6b7280" fontWeight="600" letterSpacing="0.05em">
            LOAD METRIC
          </Text>
          <Text fontSize="11px" fontWeight="700" color="#111827">
            {data.loadMetric}%
          </Text>
        </Flex>
        {/* Progress bar */}
        <Box bg="#e5e7eb" borderRadius="full" h="6px" overflow="hidden">
          <Box
            bg="#1a56db"
            h="100%"
            borderRadius="full"
            style={{ width: `${data.loadMetric}%` }}
          />
        </Box>
      </Box>

      <Handle type="target" position={Position.Left} style={{ background: '#1a56db' }} />
      <Handle type="source" position={Position.Right} style={{ background: '#1a56db' }} />
    </Box>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/canvas/nodes/ProductionNode.tsx
git commit -m "feat: add ProductionNode with load metric progress bar"
```

---

### Task 5: Create PackagingNode + register nodeTypes

**Files:**
- Create: `components/canvas/nodes/PackagingNode.tsx`
- Modify: `lib/nodeTypes.ts`

- [ ] **Step 1: Create `components/canvas/nodes/PackagingNode.tsx`**

```typescript
import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import { Box, Flex, Text } from '@chakra-ui/react';

export type PackagingNodeData = {
  label: string;
  subtitle: string;
  units: number;
  kgCo2e: number;
};

type PackagingNodeType = Node<PackagingNodeData, 'packaging'>;

export default function PackagingNode({ data, selected }: NodeProps<PackagingNodeType>) {
  return (
    <Box
      bg="white"
      border="1.5px solid"
      borderColor={selected ? '#1a56db' : '#e2e8f0'}
      borderRadius="12px"
      w="200px"
      boxShadow="sm"
      overflow="hidden"
    >
      {/* Header */}
      <Flex align="center" gap="8px" p="12px" pb="8px">
        <Box
          w="32px"
          h="32px"
          bg="#eff6ff"
          borderRadius="8px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontSize="16px"
        >
          📦
        </Box>
        <Box flex={1}>
          <Text fontWeight="700" fontSize="13px" color="#111827" lineHeight="1.2">
            {data.label}
          </Text>
          <Text fontSize="10px" color="#6b7280" lineHeight="1.2">
            {data.subtitle}
          </Text>
        </Box>
        <Text fontSize="12px" color="#9ca3af" cursor="pointer">×</Text>
      </Flex>

      {/* Stats */}
      <Box borderTop="1px solid #f3f4f6" px="12px" py="8px">
        <Flex gap="16px">
          <Box>
            <Text fontSize="9px" color="#6b7280" fontWeight="600" letterSpacing="0.05em" mb="2px">
              UNITS
            </Text>
            <Text fontSize="13px" fontWeight="700" color="#111827">
              {data.units.toLocaleString()}
            </Text>
          </Box>
          <Box>
            <Text fontSize="9px" color="#6b7280" fontWeight="600" letterSpacing="0.05em" mb="2px">
              KG CO2E
            </Text>
            <Text fontSize="13px" fontWeight="700" color="#111827">
              {data.kgCo2e}
            </Text>
          </Box>
        </Flex>
      </Box>

      <Handle type="target" position={Position.Left} style={{ background: '#1a56db' }} />
    </Box>
  );
}
```

- [ ] **Step 2: Update `lib/nodeTypes.ts`**

```typescript
import ExtractionNode from '@/components/canvas/nodes/ExtractionNode';
import ProductionNode from '@/components/canvas/nodes/ProductionNode';
import PackagingNode from '@/components/canvas/nodes/PackagingNode';

export const nodeTypes = {
  extraction: ExtractionNode,
  production: ProductionNode,
  packaging: PackagingNode,
  logistics: ExtractionNode, // reuse extraction style for logistics in prototype
};
```

- [ ] **Step 3: Commit**

```bash
git add components/canvas/nodes/PackagingNode.tsx lib/nodeTypes.ts
git commit -m "feat: add PackagingNode and register all nodeTypes"
```

---

### Task 6: Create CanvasToolbar + FlowCanvas

**Files:**
- Create: `components/canvas/CanvasToolbar.tsx`
- Create: `components/canvas/FlowCanvas.tsx`

- [ ] **Step 1: Create `components/canvas/CanvasToolbar.tsx`**

```typescript
'use client';

import { Box, Flex, Text } from '@chakra-ui/react';
import { useReactFlow } from '@xyflow/react';

export default function CanvasToolbar() {
  const { zoomIn, zoomOut, fitView, getZoom } = useReactFlow();

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
```

- [ ] **Step 2: Create `components/canvas/FlowCanvas.tsx`**

Note: `CanvasToolbar` uses `useReactFlow()` — it MUST be rendered as a child of `<ReactFlow>` (not a sibling), because `<ReactFlow>` provides the ReactFlowProvider context. Rendering it inside `<ReactFlow>` JSX satisfies this requirement.

```typescript
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

const defaultNodeData: Record<string, object> = {
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
```

- [ ] **Step 3: Commit**

```bash
git add components/canvas/CanvasToolbar.tsx components/canvas/FlowCanvas.tsx
git commit -m "feat: add CanvasToolbar and FlowCanvas with drag-to-canvas"
```

---

### Task 7: Create Stepper + TopBar

**Files:**
- Create: `components/topbar/Stepper.tsx`
- Create: `components/topbar/TopBar.tsx`

- [ ] **Step 1: Create `components/topbar/Stepper.tsx`**

```typescript
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
      borderBottom="1px solid #e5e7eb"
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
                bg={isActive ? '#1a56db' : isPast ? '#1a56db' : '#e5e7eb'}
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexShrink={0}
              >
                <Text
                  fontSize="11px"
                  fontWeight="700"
                  color={isActive || isPast ? 'white' : '#9ca3af'}
                >
                  {step.id}
                </Text>
              </Box>
              <Text
                fontSize="11px"
                fontWeight={isActive ? '700' : '500'}
                color={isActive ? '#1a56db' : isPast ? '#6b7280' : '#9ca3af'}
                letterSpacing="0.06em"
              >
                {step.label}
              </Text>
            </Flex>

            {/* Connector line */}
            {index < steps.length - 1 && (
              <Box w="60px" h="1px" bg="#e5e7eb" mx="4px" />
            )}
          </Flex>
        );
      })}
    </Flex>
  );
}
```

- [ ] **Step 2: Create `components/topbar/TopBar.tsx`**

```typescript
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
```

- [ ] **Step 3: Commit**

```bash
git add components/topbar/Stepper.tsx components/topbar/TopBar.tsx
git commit -m "feat: add Stepper and TopBar components"
```

---

### Task 8: Create StageItem + Sidebar

**Files:**
- Create: `components/sidebar/StageItem.tsx`
- Create: `components/sidebar/Sidebar.tsx`

- [ ] **Step 1: Create `components/sidebar/StageItem.tsx`**

```typescript
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
```

- [ ] **Step 2: Create `components/sidebar/Sidebar.tsx`**

```typescript
import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import StageItemCard from './StageItem';
import { stageItems } from '@/lib/stageItems';

const navItems = [
  { label: 'Home', icon: '🏠' },
  { label: 'Dashboard', icon: '📊' },
  { label: 'Inventory', icon: '☰' },
  { label: 'Life Cycle', icon: '♻️', active: true },
  { label: 'Reduction Target', icon: '📈' },
  { label: 'Supply Chain', icon: '🔗' },
  { label: 'Reports', icon: '📄' },
];

const bottomNavItems = [
  { label: 'Support', icon: '💬' },
  { label: 'Settings', icon: '⚙️' },
];

export default function Sidebar() {
  return (
    <Flex
      direction="column"
      w="240px"
      minW="240px"
      h="100%"
      bg="white"
      borderRight="1px solid #e5e7eb"
      overflow="hidden"
    >
      {/* Logo */}
      <Flex align="center" gap="8px" px="16px" py="14px" borderBottom="1px solid #f3f4f6">
        <Box
          w="28px"
          h="28px"
          bg="#1a56db"
          borderRadius="6px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="white"
          fontSize="14px"
          fontWeight="700"
        >
          C
        </Box>
        <Box>
          <Text fontSize="12px" fontWeight="700" color="#111827" lineHeight="1">carbon</Text>
          <Text fontSize="12px" fontWeight="700" color="#111827" lineHeight="1">form</Text>
        </Box>
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
            bg={item.active ? '#1a56db' : 'transparent'}
            cursor="pointer"
            _hover={{ bg: item.active ? '#1e40af' : '#f9fafb' }}
          >
            <Text fontSize="14px">{item.icon}</Text>
            <Text
              fontSize="13px"
              fontWeight={item.active ? '600' : '400'}
              color={item.active ? 'white' : '#374151'}
            >
              {item.label}
            </Text>
          </Flex>
        ))}
      </VStack>

      {/* Lifecycle Stages panel */}
      <Box px="12px" py="10px" borderTop="1px solid #f3f4f6" flex={1} overflow="auto">
        <Text fontSize="10px" fontWeight="700" color="#374151" letterSpacing="0.08em" mb="4px">
          LIFECYCLE STAGES
        </Text>
        <Text fontSize="10px" color="#9ca3af" mb="10px">DRAG TO CANVAS</Text>
        <VStack gap="8px" align="stretch">
          {stageItems.map((item) => (
            <StageItemCard key={item.type} item={item} isSelected={item.type === 'production'} />
          ))}
        </VStack>

        {/* Multi-output */}
        <Box mt="16px" pt="12px" borderTop="1px solid #f3f4f6">
          <Text fontSize="10px" fontWeight="700" color="#374151" letterSpacing="0.08em" mb="8px">
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
                border="1px dashed #d1d5db"
                borderRadius="6px"
                cursor="pointer"
              >
                <Text fontSize="10px" color="#6b7280" fontWeight="600" letterSpacing="0.04em">
                  {label}
                </Text>
                <Text fontSize="12px" color="#9ca3af">↗</Text>
              </Flex>
            ))}
          </VStack>
        </Box>

        {/* Expert tip */}
        <Box mt="16px" p="10px" bg="#eff6ff" borderRadius="8px" border="1px solid #bfdbfe">
          <Text fontSize="10px" fontWeight="700" color="#1a56db" mb="4px">📍 EXPERT TIP</Text>
          <Text fontSize="10px" color="#374151" lineHeight="1.5">
            Connect nodes by dragging from output ports (right) to input ports (left) to define carbon transfer flows.
          </Text>
        </Box>
      </Box>

      {/* Bottom nav */}
      <VStack gap="2px" align="stretch" px="8px" py="8px" borderTop="1px solid #f3f4f6">
        {bottomNavItems.map((item) => (
          <Flex
            key={item.label}
            align="center"
            gap="10px"
            px="10px"
            py="8px"
            borderRadius="6px"
            cursor="pointer"
            _hover={{ bg: '#f9fafb' }}
          >
            <Text fontSize="14px">{item.icon}</Text>
            <Text fontSize="13px" color="#374151">{item.label}</Text>
          </Flex>
        ))}
      </VStack>
    </Flex>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/sidebar/StageItem.tsx components/sidebar/Sidebar.tsx
git commit -m "feat: add StageItem and Sidebar with drag-to-canvas support"
```

---

### Task 9: Assemble page.tsx

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace `app/page.tsx`**

```typescript
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
```

- [ ] **Step 2: Run TypeScript check**

```bash
cd /Users/ake/Downloads/canvas && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: assemble Carbon Form lifecycle UI page"
```

---

### Task 10: Verify dev server + visual check

- [ ] **Step 1: Start dev server**

```bash
cd /Users/ake/Downloads/canvas && npm run dev &
sleep 10
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000
```

Expected: `200`

- [ ] **Step 2: Open browser and verify checklist**

Navigate to `http://localhost:3000`. Verify:

- [ ] Left sidebar renders: carbon form logo, nav items, Life Cycle active (blue bg)
- [ ] Sidebar shows: 4 stage items (Extraction, Processing, Packaging, Logistics)
- [ ] Sidebar shows: Multi-Output section + Expert Tip box
- [ ] TopBar: project title in blue, tabs (Drafts/Verified/Archives), Verified underlined, Export Report button
- [ ] Stepper: 4 steps, step 2 "BUILD FLOW" active (blue circle + blue text)
- [ ] Canvas: light gray background with dot grid
- [ ] Canvas: 3 nodes visible (Extraction, Production, Packaging) connected by 2 edges
- [ ] ExtractionNode: shows OUTPUT: RAW_01 badge with count 12
- [ ] ProductionNode: shows LOAD METRIC 82% with progress bar
- [ ] PackagingNode: shows UNITS 10,000 / KG CO2E 0.12
- [ ] Canvas toolbar: zoom buttons + FIT TO VIEW + LOAD TEMPLATE visible
- [ ] MiniMap visible bottom-right
- [ ] FAB (+) button visible bottom-right
- [ ] Dragging a stage item from sidebar onto canvas creates a new node

- [ ] **Step 3: Kill dev server + final commit**

```bash
kill %1 2>/dev/null || pkill -f "next dev" 2>/dev/null || true
git add .
git commit -m "feat: Carbon Form lifecycle UI complete"
```
