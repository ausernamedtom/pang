Feature: Web Client Application
  As a web player
  I want to use the web client application
  So that I can play a simple table tennis game in my browser

  Background:
    Given the game server is running
    And the web client application is loaded in the browser

  Scenario: Basic Game Flow
    When the player visits the web application
    Then they should see two options:
      | Create Game |
      | Join Game   |
    
    When the player clicks "Create Game"
    Then they should see a room code
    And a waiting message for another player
    And a copy button for the room code

    When another player joins using the room code
    Then the game should start automatically
    And both players should see:
      | Their paddle |
      | The ball     |
      | The score    |

    When a player moves their mouse horizontally
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
    And they should see options to:
      | Play Again |
      | Return to Menu | 