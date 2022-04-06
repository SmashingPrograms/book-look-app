# Book-Look

Book-Look is a word game that gives you random passages from random classic books, with blanks in the passages to fill in. The game is all about context clues, so mastering the game involves being able to predict the most likely words to go in each blank.

The game is available to play for free on Heroku: https://book-look-smashingprograms.herokuapp.com/

## How to play

The way you play the game is by clicking on a blank you want to fill in, and clicking on a word choice below to match them up. The game will tell you if you picked the wrong word or the right word.

### Points

#### Possible points

For each passage, you start off with a maximum amount of points you could earn in each passage. Points are taken off of that maximum as you get blanks wrong or use hints.

Per blank you get wrong, you lose a few points. To be exact, for every blank you get wrong, you lose (word length / 4) * 2 points.

#### Total points

If you fill in all the blanks in one passage, the amount of points you earn gets added to your total. However, if you ended up with a negative amount of points in that passage, you will lose points from your total.

If you are logged into an account, your total points will be saved forever in the database. However, if you're not logged in and you're playing the game, your total points will be lost if you leave your gameplay session.

### Hints

The game allows you to use hints, by clicking on a blank and then clicking the "Hint" button next to it. But if you use hints, you lose a significant amount of points, so use them wisely! The four types of hints are:

* Get previous passage — Use this to reveal the *previous* passage in the book for more context from the beginning of the passage.
** Points lost: 10
* Get next passage — Use this to reveal the *previous* passage in the book for more context from the end of the passage.
** Points lost: 10
* Get words with similar meanings — Use this to reveal words that are similar to the word you're looking for.
** Points lost: 5
* Get words that rhyme – Use this to reveal rhyming words to the one you're looking for.
** Points lost: 10

If your possible points are below 0, you can't use hints anymore.