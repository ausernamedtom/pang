Feature: Game Server
  As a game server
  I need to handle game rooms and player connections
  So that players can play together

  Scenario: Create Game Room
    Given a player wants to create a game
    When they request a new game room
    Then the server should create a room
    And return a room code
    And the room should be empty

  Scenario: Join Game Room
    Given a game room exists
    When a player joins with the room code
    Then they should be connected to the room
    And the server should notify all players

  Scenario: Start Game
    Given a room has two players
    When both players are ready
    Then the game should start
    And the server should notify all players 