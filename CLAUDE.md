# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # dev server (default port 3000)
npm run build    # production build
npm run start    # serve production build
```

No test runner or linter is configured.

## Architecture

**Canvas** is a standalone Next.js 15 app — a drag-to-canvas lifecycle editor for carbon footprint stages. It is part of the Carbonform monorepo (`carbonform/canvas/`) but has its own git repo and `node_modules`.

**Stack:** Next.js 15 App Router · React 19 · TypeScript · `@xyflow/react` v12 · Chakra UI v3

### Layout (`app/page.tsx`)

```
<Flex h="100vh">
  <Sidebar />                  ← draggable stage palette
  <Flex direction="column">
    <TopBar />                 ← title + actions
    <Stepper />                ← lifecycle step indicator
    <FlowCanvas />             ← ReactFlow canvas
  </Flex>
</Flex>
```

### Data flow

- `lib/stageItems.ts` — defines the 4 lifecycle stage types (`extraction`, `production`, `packaging`, `logistics`)
- `lib/nodeTypes.ts` — maps stage type strings → ReactFlow custom node components
- `lib/initialElements.ts` — seed nodes/edges rendered on load
- Drag-to-canvas: `StageItem` sets `dataTransfer.setData('stageType', type)`; `FlowCanvas.onDrop` reads it, calls `rfInstance.screenToFlowPosition`, creates a node with spread-copied data from `defaultNodeData`

### Custom nodes (`components/canvas/nodes/`)

Each node receives `NodeProps<NodeType>` from ReactFlow. Pattern:
- `ExtractionNode` — source handle only (right), used for both `extraction` and `logistics` types
- `ProductionNode` — target + source handles
- `PackagingNode` — target handle only (left)

`logistics` type reuses `ExtractionNode` component — add a dedicated `LogisticsNode` if diverging UI is needed.

### Key constraint

`defaultNodeData` in `FlowCanvas` must use spread (`{ ...obj }`) — never pass object references directly, or all dropped nodes of the same type will share mutable state.
