# Development Rules

## Code Quality
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