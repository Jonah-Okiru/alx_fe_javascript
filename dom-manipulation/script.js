// Javascript implementation
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuote = document.getElementById('newQuote');
const addQuoteForm = document.getElementById('ddQuoteForm');
const newQuoteText = document.getElementById('newQuoteText');
const newQuoteCategory = document.getElementById('newQuoteCategory');
const importFile = document.getElementById('importFile');
// declare a quote variable to store quotes and categories
let quoteVariable =[];
//loading quotes from local storage  on initialization
const storedQuotes = localStorage.getItem('quoteVariable');
if(storedQuotes){
    quoteVariable = JSON.parse(storedQuotes);
}
// Implement the Random quote function
function showRandomQuote(){
    // generate the random index of the array element
    const randomIndex = Math.floor(Math.random()*quoteVariable.length);
    // access the random quote using the index generated
    const randomQuote = quoteVariable[randomIndex];
    // Display the random quote at the user interface of the application
    const newElement = document.createElement('p');
    newElement.innerHTML= `"${randomQuote.text}" - ${randomQuote.category}`;
    quoteDisplay.appendChild(newElement);

}
// Implement createAddQuoteForm function
function createAddQuoteForm(){
    addQuoteForm.style.display = 'block';

}
//Implement addQuote function
function addQuote(){
    // new quote variable to store new quotes and variables
    const quoteText = newQuoteText.value;
    const quoteCategory = newQuoteCategory.value
    // add the logic and push the quotetext and quoteCategory to the quotevariable
    if(quoteText !=='' && quoteCategory !==''){
        quoteVariable.push({text:quoteText, category: quoteCategory})
        alert("Quote added succesfully")
    } else{
        alert("Please fill in both fields")
    }
    
    // save quotes to local storage
    saveQuotes()
    // display the newly added quote
    showRandomQuote();
    addQuoteForm.style.display = 'none';
}
// function to save quotes to local storage
function saveQuotes(){
    localStorage.setItem('quoteVariable', JSON.stringify(quoteVariable));
}
// Implement JSON export
function exportJson(){
    const JsonData = JSON.stringify(quoteVariable);
    const Blob = new Blob([JsonData], {type: 'application/json'});
    const url = URL.createObjectURL(Blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'quoteVariable.json';
    link.click();
    URL.revokeObjectURL(url);
}
// Implement Json import
function importFromJsonFile(event){
    const fileReader = new FileReader();
    fileReader.onload = function(event){
        const importedQuotes = JSON.parse(event.target.result);
        quoteVariable.push(...importedQuotes);
        saveQuotes();
        alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}
// Add eventlisteners 
newQuote.addEventListener('click',showRandomQuote);
addQuoteForm.addEventListener('submit', function(event){
    event.preventDefault();
    addQuote();
});
importFile.addEventListener('change',importFromJsonFile);
// show intial quote
showRandomQuote();

