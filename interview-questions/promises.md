# JavaScript Promises :crossed_fingers:
Allows you to process an asychronous action's eventual success or failure. Async methods returns a *promise* that supplies the value in the future. 

Think of a promise as letters that consists of data that can be opened and read (processed) at whichever time you want. You don't have to always read a letter rightaway. You can store it in someplace safe and read it later.  

### A Promise is in Three States:
1. ***pending***: we're still waiting for a reply from the server and there's no way to tell if my request was successful or not yet. :shrug: 
2. ***fulfilled***: yay our request is approved and we received the data we wanted!
3. ***rejected***: Hmm, there seems to have been an error and we need to decide what we want to do that error message