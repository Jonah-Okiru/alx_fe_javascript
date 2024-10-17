// Javascript implementation
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuote = document.getElementById('newQuote');
const addQuoteForm = document.getElementById('ddQuoteForm');
const newQuoteText = document.getElementById('newQuoteText');
const newQuoteCategory = document.getElementById('newQuoteCategory');
// declare a quote variable to store quotes and categories
const quoteVariable =[
    {text: "The only way to succeed in life is to do what you love", category: "Inspirational"},
    {text: "Success is by chance", category: "educative"},
    {text: "All that glitters sometimes fails", category: "Educational"}

]
// Implement the Random quote function
function showRandomQuote(){
    // generate the random index of the array element
    const randomIndex = Math.floor(Math.random()*quoteVariable.length);
    // access the random quote using the index generated
    const randomQuote = quoteVariable[randomIndex];
    // Display the random quote at the user interface of the application
    quoteDisplay.textContent = `"${randomQuote.text}" - ${randomQuote.category}`;

}
// Implement createAddQuoteForm function
function createAddQuoteForm(){
    addQuoteForm.style.display = 'block';

}
//Implement addQuote function
function addQuote(){
    // new quote variable to store new quotes and variables
    const newQuote = {
        text: newQuoteText.value,
        category: newQuoteCategory.value
    };
    // push the newquote to the quotevariable
    quoteVariable.push(newQuote);
    // display the newly added quote
    showRandomQuote();
    addQuoteForm.style.display = 'none';
}
// Add eventlistener to the new quote button
newQuote.addEventListener('click',showRandomQuote);
