/** Exercise 01 - Coins **/

// Add your function here

function calculateChange(amount) {
  if (amount > 100) {
    return "Error: the number is too large";
  }
  // Check if the amount is valid
  if (amount <= 0) {
    return "Error: the number should be positive and greater than 0";
  }

  // Convert amount to cents (avoiding floating-point issues)
  let remainingAmount = Math.round(amount * 100);

  // Corrected coin array (each object should have "name" and "value" keys)
  const coins = [
    { name: "dollar", value: 100 },
    { name: "quarter", value: 25 },
    { name: "dime", value: 10 },
    { name: "nickel", value: 5 },
    { name: "penny", value: 1 },
  ];

  let totalResult = [];

  // Loop through each coin type to calculate change
  for (let coin of coins) {
    let moneyCount = Math.floor(remainingAmount / coin.value);
    if (moneyCount > 0) {
      let coinName =
        coin.name === "penny"
          ? moneyCount > 1
            ? "pennies"
            : "penny"
          : moneyCount > 1
          ? coin.name + "s"
          : coin.name;
      totalResult.push(`${moneyCount} ${coinName}`);
      remainingAmount -= moneyCount * coin.value; // Subtract used amount
    }
  }

  // Format the output properly
  return `$${amount.toFixed(2)} ==> ` + totalResult.join(", ");
}

// Sample test cases
console.log(calculateChange(4.63));
// $4.62 ==> 4 dollars, 2 quarters, 1 dime, 3pennies
console.log(calculateChange(0.17));
// $0.16 ==> 1 dime, 1 nickel, 2 penny
console.log(calculateChange(150.11));
// $150.11 ==> Error: the number is too large

// Add additional test cases here
console.log(calculateChange(-3));
// Error: the number should be positive and greater than 0
console.log(calculateChange(0));
// Error: the number should be positive and greater than 0
console.log(calculateChange(100));
// $100.00 ==> 1 dollar
