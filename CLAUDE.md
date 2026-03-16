# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `bun --hot src/index.ts` - Runs the development server with hot module reloading
- **Production server**: `NODE_ENV=production bun src/index.ts` - Runs the production server
- **Build**: `bun run build.ts` - Builds the application (script referenced but not found)

## Architecture Overview

This is a card-based strategy game built with React and Bun. The game features a deck-building mechanism with multiple phases and complex game logic.

### Core Game Loop

1. **Pre-game Phase** (`RunPhase.PRE_GAME`): Character selection and game setup
2. **Playing Phase** (`RunPhase.PLAYING`): Draw cards, play cards, manage resources
3. **Shop Phase** (`RunPhase.SHOP`): Purchase new cards with gold
4. **Post-game Phase** (`RunPhase.POST_GAME`): Game over state

### Key State Management

- **GameRunManager**: Main orchestrator managing overall game state and transitions between phases
- **LogicManager**: Handles in-game logic (card play, resource management, turn end)
- **ShopManager**: Manages the shop phase and card purchasing

### Data Flow Pattern

The game uses a centralized state management pattern with external store subscriptions:

```tsx
// React components subscribe to state changes
const gameState = useSyncExternalStore(gameRunManager.logicManager.subscribe, gameRunManager.logicManager.getSnapshot);
```

### Card System

- **AbstractCard**: Card definition with name, text, cost, price, effects, and tags
- **Card**: AbstractCard with a unique id
- **Card effects**: Pure functions that take GameState and return GameState
- **Card index**: Central registry of all available cards

### Resource System

Five resource types: food, energy, wood, metal, gold. Each card costs specific resources to play and can be bought with gold.

### Component Structure

- **PhaseManager**: Routes to different game phases
- **BoardClass**: Main game board with resource panel, play area, hand
- **CardContainer**: Displays hand of playable cards
- **Input/CardInput**: Modal dialogs for user inputs and choices
- **ShopComponent**: Shop interface for purchasing cards

### Effects System

Cards can have multiple effects that are added to a stack and executed sequentially. Common effects include:
- Resource addition/subtraction
- Card drawing
- Input prompts for player choices

### Notable Patterns

- Cards are created using `makeCard(cardDefinition)` to add unique IDs
- State changes use object spreading to trigger React updates
- Game phases transition through explicit method calls (`endTurn()`, `endShop()`, etc.)

### Styling

- Heavy use of inline styles with Tailwind CSS classes
- CSS globals in `styles/App.css` for board layout and card styling
- No traditional CSS framework - custom layout with flexbox

### Dependencies

- Bun for runtime and bundling
- React with createRoot for rendering
- Radix UI components for accessible UI primitives
- UUID for card generation
- Lucide React for icons

### Important Files

- `src/index.ts`: Bun server with routes and HMR
- `src/frontend.tsx`: React app entry point with hot module reloading
- `src/services/run_manager.ts`: Game phase and overall state management
- `src/services/logic_manager.ts`: In-game logic and card playing
- `src/types/board.ts`: Core TypeScript interfaces and types
- `src/services/card_index.ts`: Registry of all card definitions
- `src/components/`: React components for game UI