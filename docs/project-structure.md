# Project Structure

The project follows a strict separation of concerns with the following structure:

```
/
├── client/                    # Frontend React application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── scenes/          # Three.js game scenes
│   │   ├── models/          # 3D models and assets
│   │   ├── physics/         # Physics engine and calculations
│   │   ├── state/           # State management (Zustand)
│   │   ├── hooks/           # Custom React hooks
│   │   ├── utils/           # Utility functions
│   │   └── types/           # TypeScript type definitions
│   └── public/              # Static assets
│
├── server/                   # Backend Node.js application
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── services/        # Business logic
│   │   ├── models/          # Data models
│   │   ├── sockets/         # Socket.io event handlers
│   │   ├── utils/           # Utility functions
│   │   └── types/           # TypeScript type definitions
│   └── tests/               # Server-side tests
│
└── shared/                  # Shared code between client and server
    ├── types/              # Shared TypeScript types
    ├── constants/          # Shared constants
    └── utils/             # Shared utility functions
```

## Directory Responsibilities

- **Components**: UI elements that can be reused across the application
- **Scenes**: Three.js scene setups and game logic
- **Models**: 3D assets and their configurations
- **Physics**: Game physics calculations and collision detection
- **State**: Application state management
- **Controllers**: Server-side request handling
- **Services**: Business logic and data processing
- **Sockets**: Real-time communication handlers

## Benefits

This structure ensures:
- Clear separation of concerns
- Easy navigation and maintenance
- Better code organization
- Simplified testing
- Improved scalability 