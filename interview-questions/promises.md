# JavaScript Promises :crossed_fingers:
Allows you to process an asychronous action's eventual success or failure. Async methods returns a *promise* that supplies the value in the future. 

Think of a promise as letters that consists of data that can be opened and read (processed) at whichever time you want. You don't have to always read a letter rightaway. You can store it in someplace safe and read it later.  

### A Promise is in Three States:
1. ***pending***: we're still waiting for a reply from the server and there's no way to tell if my request was successful or not yet. :shrug: 
2. ***fulfilled***: yay our request is approved and we received the data we wanted!
3. ***rejected***: Hmm, there seems to have been an error and we need to decide what we want to do that error message

Promises can only succeed or fail once. It also cannot switch from succeeding to failing or vice-versa. With promises, you don't care when something happened. You are more interested in how you're reacting to an outcome.

### Diagram of Promise States and Lifecycle
![promise-diagram](https://mdn.mozillademos.org/files/15911/promises.png)
https://mdn.mozillademos.org/files/15911/promises.png

## Chained Promises
You can chain methods that return promise objects for futher processing. I think of chaining promises as setting up a gameplan. It's almost like laying out different types of baseball pitches in response to the batter's moves. 
```js
const myBaseballPitchPromises = 
  (new Promise(executorFunc))
  .then(tryFastballA)
  .then(tryCurveballB)
  .catch(switchPitcher)
```
The `promise.catch()` is for error handling. In our case we just switch pitchers :sweat_smile: 