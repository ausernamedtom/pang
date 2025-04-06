Feature: Mobile Client Application
  As a mobile player
  I want to use the mobile client application
  So that I can play a simple table tennis game on my phone or tablet

  Background:
    Given the game server is running
    And the mobile client application is started

  Scenario: Basic Game Flow
    When the player opens the mobile application
    Then they should see two options:
      | Create Game |
      | Join Game   |
    
    When the player selects "Create Game"
    Then they should see a room code
    And a waiting message for another player

    When another player joins using the room code
    Then the game should start automatically
    And both players should see:
      | Their paddle |
      | The ball     |
      | The score    |

    When a player touches and moves on their side
    Then their paddle should move accordingly
    And the other player should see the movement

    When the ball hits a paddle
    Then it should bounce
    And the game should continue

    When a player misses the ball
    Then the other player should score a point
    And the ball should reset to the center

    When a player reaches 11 points
    Then the game should end
    And both players should see who won 