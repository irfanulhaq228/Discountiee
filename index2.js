const total = 100;
const gifts = [ 20, 30, 50, 70, 90 ];

// imagine you have a list of gift prices, and you need to buy two gifts such that their 
//combined cost is equal to the budget. Write a function that helps you to find out which 
//two gifts you should choose to achieve this. What would be the time and space complexity ? 
//what if there are no gift pairs that match exactly with the budget, how would you change the 
//code to achieve this. Which data structures will be used here ?

for(let i = 0; i < gifts.length; i++){
    const value = gifts[i];
    const newArray = gifts.filter((a) => a !== value);
    
    for(let j = 0; j < newArray.length; j++){

        const value2 = newArray[j];
        if(value+value2 === total) console.log([value, value2]);
    }
}