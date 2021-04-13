# Spaced Repitition System

## Summary

A flashcard-based web application designed to optimize memorization via a custom SRS algorithm.

Boilerplate was taken from [here](https://github.com/mCodex/react-redux-saga-boilerplate)

### Main Dependencies

- React
- Redux
- Redux-Saga
- Semantic UI

## Notes

### Algorithm

- The first thing I worked on was my SRS algorithm. I use a flash card app called Anki to study Japanese everyday, and it's proven effective for me for the past few years. Anki, however, is structured around daily learning sessions. Whereas this assignment was asking for an algorithm that could function over a single timed session. So I had some things to figure out.

- I knew I wanted to go with a priority queue for scheduling because obtaining the highest priority card would always take constant time. I went with a min-heap, where a lower priority meant that a card would be shown sooner.

- Once I had decided on my data structure, it was time to decide how to calculate card priority on correct/incorrect answers. The Anki official documentation helped me alot here.

- To explain my version simply. Every card has a learning level that begins at level 0 (the seed phase). If a card is answered correctly, the card levels up. Leveling up means that its next priority interval will be even greater than its last.

- A card's priority interval is the value added to a card's current priority to obtain its next one. In example, say you answered a level 0 question correctly, and it levels up. If its current priority is 3, you would add 3 to obtain it's next priority 6. The card would then be reinserted into the heap, scheduling it for another appearance somewhere down the line.

- The priority interval added increases every level, as follows:

```
Level 0 -> 1: 3
Level 1 -> 2: 7
```

- In practice, this makes it so that cards that are answered correctly are shown to the user less frequently.

- Cards between level 0-2 that are answered incorrectly have their level reset to 0. So they will reappear sooner.

- Once a card reaches level 3 it "graduates". A graduated card uses its graduating interval in place of its priority interval. When answered correctly, the card is assigned a new graduated interval that is multiplied by starting ease. (an interval modifier that starts at 2.5).

- When a graduated card is answered incorrectly, it's considered to be a lapsed card. Lapsing lowers the starting ease factor by 0.2. In addition, lapsed cards that graduate again graduate "cautiously", with their new graduated interval being 80% of their last one.

### Personal Findings

- This was my first time working with Redux-Saga. I found it really interesting to learn about generator functions and how yielding works. Because I've worked with Redux-Thunk before, I wasn't unfamiliar with using middleware for dispatching actions with side-effects. It was my first time doing it with code that looks so synchronous though. I could see something like Redux-Saga being particularly valuable for handling/cancelling different side-effects on page navigation.

- At first, I had implemented my priority queue using a third-party library called Heapify.js. In the end, I couldn't figure out a way to rely on it without mutating state. So I stripped the class down its two core arrays (keys and priorities) and stored those both in the store. Then it was just a matter of implementing a push function. (New keys are inserted at the root and bubble down to their rightful place)

- If I were to implement an alternative method for tracking elapsed quiz time, I would instead store the quiz's start/end time and derive it from those. Any time it's needed, I could calculate elapsed time by subtracting the current time by the quiz's start time. This would keep action dispatches to a minimum, potentially performing better on slower devices.

### Scoring

- You could implement a scoring system by assigning points for every correctly answered card.
  One possible equation for calculating the point value of a card could be:

```
(40 - Question Time limit) + Question Time remaining
```

- So if calculating the point value of a 30-second card that was answered in 4 seconds:

```
(40 - 30) +  26 = 36 points
```

- You could gamify this further by implementing a point modifier that is applied/increases on consecutive correct answers.

## Installation

Clone repo and run:

```
yarn && yarn start
```

## Credits

- https://github.com/luciopaiva/heapify
- https://redux-saga.js.org/docs/api
- https://docs.ankiweb.net/
