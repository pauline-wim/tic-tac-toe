# ABOUT THE PROJECT
In this project we tried to recreate the famous game "Tic-Tac-Toe" using ReactJS.

# RULES OF THE GAME

The **Morpion**, also called Tic-Tac-Toe is played on a square grid of 3x3 squares. Two players, compete against each other. They must each in turn fill in a square on the grid with the symbol assigned to them: O or X.

The winner is the one who manages to align three identical symbols, horizontally, vertically or diagonally.


# STEPS TO CREATE THE GAME

 **Step1:The grid of 3 rows and 3 columns with a table**
- Each box corresponds to a clickable button (Button.js component)
- Create an onClick function that will put an X in the box depending on the player (see step 7ab)
- Assign an index to each box
- Create the players: X and O in the state.
- Start the game by the first player: first click of the user launches the game
 **Step2:Conditions:**
- Only 1 symbol (X / O) per square
- Each player must play in turn
- Update the list of squares available on the grid as the game progresses
- Check if a line of 3 symbols has been created ⇒ identify all possible lines thanks to the indexes of our buttons: horizontally, vertically or diagonally (example: line 1 horizontal = buttons 1, 2 3; line 1 vertical = buttons 1 , 4, 7)
- When all boxes are filled: if no line has been created, end the game with a draw and reset the game
- Create a RESET button to restart the game

# Built With
Here are the frameworks/libraries used for this project:

React.js
Bootstrap
Iconify

# Contributors 
@pauline-wim
@ChiBienayme
@Lysianedon
@anitamayousse