# Football Team Combinations Generator

**Current Version**: v1.5

A simple tool for generating fair football team rotations. The generator tries to balance appearances across players while keeping the selection as random as possible.<br>
The algorithm prioritizes ensuring fair playing time for everyone. When the number of players is limited and a large number of matches is required, some repeated pairings are inevitable.<br>The generator attempts to distribute appearances as evenly as possible while maintaining randomness.

PS: This tool created after discovering that some players were selected far less often than others during football rotations in PE class. :)

## How to Use
## Team A

Enter the starting and ending player numbers for Team A.
For example, if Team A has 11 players numbered from 1 to 11:

From: 1

To: 11

## Team B

Enter the starting and ending player numbers for Team B.
For example, if Team B has 11 players numbered from 1 to 11:

From: 1

To: 11

## Rounds

Enter the number of matches (rounds) to be played.

For example:

5 = generate 5 rounds of player combinations.

## Players Per Round

Enter how many players from each team should play in every round.
Default value:
4

This means each round will consist of:

4 players from Team A

4 players from Team B

## Generate Results

After filling in all required fields, click **Generate**.
The tool will display:

## Match Schedule

The selected player numbers for Team A and Team B in each round.
Example:

Round 1

Team A: 1, 3, 5, 8

Team B: 2, 4, 6, 9

## Appearance Statistics

A summary showing how many times each player appears across all generated rounds.

Example:

Team A

Player 1: 2 appearances

Player 2: 2 appearances

Player 3: 3 appearances

Team B

Player 1: 2 appearances

Player 2: 3 appearances
