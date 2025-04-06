# Pang - The Table Tennis Simulator

A real-time, two-player table tennis game optimized for mobile devices. Challenge your friends to a quick game of ping pong from anywhere!

## 🎮 Features

- Real-time multiplayer gameplay
- Mobile-first design with touch controls
- Simple and intuitive interface
- Score tracking and match system
- Responsive design for various screen sizes
- Smooth ball physics and paddle interactions

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

## 📱 Mobile Support

The game is optimized for:
- iOS devices (iPhone, iPad)
- Android devices
- Modern mobile browsers
- Touch screen controls

## 📝 Commit Convention

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification. Please format your commit messages as follows:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Common types include:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code changes that neither fix bugs nor add features
- `test`: Adding or modifying tests
- `chore`: Changes to the build process or auxiliary tools

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

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