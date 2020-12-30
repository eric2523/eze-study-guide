// https://leetcode.com/problems/coin-change/
//* Example 1:
//* Input: coins = [1,2,5], amount = 11
//* Output: 3
//* Explanation: 11 = 5 + 5 + 1

//* Example 2:
//* Input: coins = [2], amount = 3
//* Output: -1

// /**
//  * @param {number[]} coins
//  * @param {number} amount
//  * @return {number}
//  */
// bottom-up approach
function coinChange(coins, amount) {
  let dp = new Array(amount + 1).fill(amount + 1)
  dp[0] = 0;

  for(let i = 1; i <= amount; i++){
    for(coin of coins){
      if (coin <= i){
        dp[i] = Math.min(dp[i], dp[i - coin] + 1)
      }
    }
  }
  return (dp[amount] > amount) ? -1 : dp[amount]
}

// top-down approach
function coinChange(coins, amount) {
  if (amount < 1) return 0;

  let dp = new Array(amount + 1).fill(0)
  
  return _coinChange(coins, amount, dp)
}

function _coinChange(coins, remainder, dp) {
  if (remainder === 0) return 0;
  if (remainder < 0) return -1; 
  // checks if we already computed the min steps for the remaining value
  if (dp[remainder]) return dp[remainder]

  let minimum = Infinity
  for(const coin of coins){
    const changeResult = _coinChange(coins, remainder - coin, dp)
    // this if statement is important
    // the minimum only gets updated if we have valid change
    // if we have negative, the current change we built is over the required amount
    if (changeResult >= 0 && changeResult < minimum){
      minimum = 1 + changeResult
    }
  }

  dp[remainder] = (minimum === Infinity) ? -1 : minimum;

  return dp[remainder]
}