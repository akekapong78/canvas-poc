# Carbon Form Lifecycle UI — Design Spec

**Date:** 2026-05-21  
**Status:** Approved

## Goal

Build an interactive prototype of a carbon lifecycle management canvas app using Next.js 15 App Router, TypeScript, Chakra UI v3, and @xyflow/react 12. No backend — prototype only.

## Reference Design

A "Carbon Form" lifecycle builder with:
- Left sidebar: navigation menu + draggable lifecycle stage items + multi-output section
- Top bar: project header, tab navigation, undo, export button, user avatar
- Progress stepper: 4 steps (Parameters → Build Flow → Allocation → Review)
- Main canvas: full-screen ReactFlow with custom nodes connected by edges
- Canvas toolbar: zoom +/-, Fit to View, Load Template buttons
- Mini map: bottom-right corner

## Architecture

Feature-based component split. `page.tsx` owns `nodes`/`edges` state and passes callbacks down. Static UI (sidebar, topbar) is stateless. Drag-to-canvas uses HTML5 DnD + ReactFlow `screenToFlowPosition`.

**Stack:** Next.js 15, React 19, TypeScript, @chakra-ui/react (v3), @xyflow/react (v12)

## File Structure

```
app/
  layout.tsx            ← ChakraProvider wraps children
  page.tsx              ← assembles TopBar + Sidebar + FlowCanvas, owns nodes/edges state
  globals.css           ← reset only (html/body/main height 100%)

components/
  sidebar/
    Sidebar.tsx         ← nav menu (Home, Dashboard, Inventory, Life Cycle, etc.)
                          + Lifecycle Stages panel with StageItems
                          + Multi-Output section (Allocation Split, By-Product)
                          + Expert Tip box at bottom
    StageItem.tsx       ← draggable item; onDragStart sets dataTransfer stageType

  topbar/
    TopBar.tsx          ← "Project: Carbon Lifecycle #D41243" + tabs (Drafts/Verified/Archives)
                          + history/map icons + Undo button + Export Report button + avatar
    Stepper.tsx         ← 4-step horizontal stepper, step 2 (Build Flow) active

  canvas/
    FlowCanvas.tsx      ← ReactFlow wrapper; handles onDragOver + onDrop → creates node
                          + renders CanvasToolbar inside ReactFlow
    CanvasToolbar.tsx   ← zoom − / percentage display / zoom + / Fit to View / Load Template
    nodes/
      ExtractionNode.tsx   ← icon + title + subtitle + "OUTPUT: RAW_01" badge + count chip + close ×
      ProductionNode.tsx   ← icon + title + subtitle + "LOAD METRIC" label + % + progress bar + close ×
      PackagingNode.tsx    ← icon + title + subtitle + UNITS value + KG CO2E value + close ×

lib/
  nodeTypes.ts          ← { extraction: ExtractionNode, production: ProductionNode, packaging: PackagingNode }
  initialElements.ts    ← 3 demo nodes (Extraction, Production, Packaging) + 2 edges
  stageItems.ts         ← static list: Extraction/Processing/Packaging/Logistics with icons + labels
```

## Data Shapes

```ts
// Shared node base
interface BaseNodeData {
  label: string;
  subtitle: string;
}

interface ExtractionNodeData extends BaseNodeData {
  outputLabel: string;   // e.g. "RAW_01"
  outputCount: number;   // e.g. 12
}

interface ProductionNodeData extends BaseNodeData {
  loadMetric: number;    // 0–100 (percentage)
}

interface PackagingNodeData extends BaseNodeData {
  units: number;         // e.g. 10000
  kgCo2e: number;       // e.g. 0.12
}
```

## Drag-to-Canvas Flow

```
1. StageItem onDragStart
     → event.dataTransfer.setData('stageType', 'extraction' | 'production' | 'packaging' | 'logistics')

2. FlowCanvas wrapper div onDragOver
     → event.preventDefault()

3. FlowCanvas wrapper div onDrop
     → stageType = event.dataTransfer.getData('stageType')
     → position = reactFlowInstance.screenToFlowPosition({ x: event.clientX, y: event.clientY })
     → newNode = { id: crypto.randomUUID(), type: stageType, position, data: defaultData[stageType] }
     → setNodes(prev => [...prev, newNode])
```

## Custom Node Visual Spec

### ExtractionNode
- Blue icon (plant/leaf) top-left
- Bold title "Extraction", subtitle below
- Close × top-right
- Bottom section: "OUTPUT: RAW_01" label + blue badge with count
- Handle: right side (source)

### ProductionNode
- Blue icon (factory) top-left
- Bold title, subtitle
- Close × top-right
- "LOAD METRIC" row: label + percentage right-aligned
- Blue progress bar below
- Border: dark blue when selected
- Handles: left (target) + right (source)

### PackagingNode
- Blue icon (box) top-left
- Bold title, subtitle
- Close × top-right
- Two-column stats: UNITS / KG CO2E with values
- Handle: left (target)

## Sidebar Navigation Items

Static, non-functional links:
- Home, Dashboard, Inventory, Life Cycle (active), Reduction Target, Supply Chain, Reports
- Bottom: Support, Settings

## Stepper Steps

1. PARAMETERS
2. BUILD FLOW (active)
3. ALLOCATION
4. REVIEW

## Color Palette (from design)

- Primary blue: `#1a56db` (buttons, active states, node borders)
- Active nav bg: `#1a56db`
- Canvas bg: `#f8f9fa`
- Node bg: white
- Node border default: `#e2e8f0`
- Node border selected: `#1a56db`
- Sidebar bg: white
- Topbar bg: white

## Success Criteria

- Sidebar renders nav + 4 stage items + multi-output section
- TopBar renders project name, tabs, buttons
- Stepper shows 4 steps with step 2 active
- Canvas renders 3 demo nodes connected by 2 edges
- Each node type shows correct content (badge, progress bar, stats)
- Dragging a stage item from sidebar and dropping on canvas creates a new node at drop position
- Nodes are draggable on canvas
- New edges can be drawn between nodes
- MiniMap visible
- `npm run dev` starts, `npx tsc --noEmit` clean
