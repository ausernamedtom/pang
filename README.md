# Pang - The Table Tennis Simulator

A real-time, two-player table tennis game optimized for mobile devices. Challenge your friends to a quick game of ping pong from anywhere!

## 🎮 Features

- Real-time multiplayer gameplay
- Mobile-first design with touch controls
- Simple and intuitive interface
- Score tracking and match system
- Responsive design for various screen sizes
- Smooth ball physics and paddle interactions

## 📚 Documentation

- [Technical Stack](docs/technical-stack.md) - Detailed information about technologies used
- [Project Structure](docs/project-structure.md) - How the project is organized
- [Development Rules](docs/development-rules.md) - Guidelines for development
- [Contributing](docs/contributing.md) - How to contribute to the project
- [Commit Convention](docs/commit-convention.md) - How to format commit messages

## 🎯 How to Play

1. Open the game on your mobile device
2. Create a new game room or join an existing one
3. Share the room code with your opponent
4. Use touch controls to move your paddle:
   - Swipe left/right to move the paddle
   - Tap to serve the ball
5. Score points by making your opponent miss the ball
6. First player to reach 11 points wins the game

## 🛠️ Technical Stack

- Frontend: React + TypeScript with Three.js for 3D graphics
  - React (v18.2.0+) with React DOM
  - TypeScript (v5.0.0+)
  - Three.js (v0.160.0+)
  - React-Three-Fiber (v8.15.0+) for declarative Three.js components
  - @react-three/drei (v9.90.0+) for useful helpers and abstractions
  - Zustand (v4.4.0+) for state management
  - Vite (v5.0.0+) for build tooling
- Backend: Node.js with Express and Socket.io
  - Node.js (v20.0.0+)
  - Express (v4.18.0+)
  - Socket.io (v4.7.0+)
  - TypeScript (v5.0.0+)
  - Jest (v29.0.0+) for testing
  - ESLint (v8.0.0+) + Prettier (v3.0.0+) for code quality
- Real-time communication: WebSockets
- Mobile-first responsive design
- Physics engine for realistic ball movement

## 📁 Project Structure

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

Each directory has a specific responsibility:
- **Components**: UI elements that can be reused across the application
- **Scenes**: Three.js scene setups and game logic
- **Models**: 3D assets and their configurations
- **Physics**: Game physics calculations and collision detection
- **State**: Application state management
- **Controllers**: Server-side request handling
- **Services**: Business logic and data processing
- **Sockets**: Real-time communication handlers

This structure ensures:
- Clear separation of concerns
- Easy navigation and maintenance
- Better code organization
- Simplified testing
- Improved scalability

## 📜 Development Rules

### Code Quality
1. **TypeScript First**
   - All code must be written in TypeScript
   - No `any` types allowed
   - Use strict type checking
   - Define interfaces for all data structures

2. **Component Rules**
   - Keep components small and focused
   - Maximum file length: 200 lines
   - One component per file
   - Use functional components with hooks
   - Props must be typed and documented

3. **State Management**
   - Use Zustand for global state
   - Local state with useState when appropriate
   - No prop drilling beyond 2 levels
   - State updates must be immutable

4. **Three.js Best Practices**
   - Use React-Three-Fiber components
   - Keep 3D models optimized
   - Implement proper cleanup in useEffect
   - Use proper lighting and shadows
   - Optimize render performance

5. **Testing Requirements**
   - Write tests for all business logic
   - Unit tests for utility functions
   - Integration tests for game mechanics
   - Test coverage minimum: 80%
   - Mock external dependencies

6. **Git Workflow**
   - Follow conventional commits
   - Create feature branches
   - No direct commits to main
   - Pull requests require review
   - Keep commits atomic and focused

7. **Performance Rules**
   - Mobile-first optimization
   - 60 FPS target for animations
   - Lazy load heavy components
   - Optimize asset loading
   - Monitor memory usage

8. **Documentation**
   - Document all public APIs
   - Add JSDoc comments for functions
   - Keep README updated
   - Document complex game logic
   - Maintain changelog

9. **Error Handling**
   - Graceful degradation
   - User-friendly error messages
   - Log errors appropriately
   - Handle network failures
   - Implement reconnection logic

10. **Security**
    - Validate all user input
    - Sanitize game state
    - Use HTTPS
    - Protect sensitive data
    - Regular security audits

11. **Accessibility**
    - Follow WCAG guidelines
    - Support screen readers
    - Provide keyboard controls
    - Use semantic HTML
    - Test with accessibility tools

12. **Code Review**
    - Review all pull requests
    - Check for performance issues
    - Verify security practices
    - Ensure type safety
    - Test on multiple devices

## 📱 Mobile Support

The game is optimized for:
- iOS devices (iPhone, iPad)
- Android devices
- Modern mobile browsers
- Touch screen controls

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by classic table tennis games
- Built with modern web technologies
- Special thanks to all contributors

## 📞 Support

For support, please open an issue in the GitHub repository or contact the maintainers.

---

Made with ❤️ by [Your Name] 