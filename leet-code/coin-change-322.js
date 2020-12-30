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