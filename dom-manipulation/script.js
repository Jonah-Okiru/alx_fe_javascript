// Javascript implementation
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuote = document.getElementById('newQuote');
const addQuoteForm = document.getElementById('ddQuoteForm');
const newQuoteText = document.getElementById('newQuoteText');
const newQuoteCategory = document.getElementById('newQuoteCategory');
const importFile = document.getElementById('importFile');
const categoryFilter = document.getElementById('categoryFilter');
// declare a quote variable to store quotes and categories
let quoteVariable =[];
//loading quotes from local storage  on initialization
const storedQuotes = localStorage.getItem('quoteVariable');
if(storedQuotes){
    quoteVariable = JSON.parse(storedQuotes);
}
// loading the last selected filter from a local storage.
const storedFilter = localStorage.getItem('selectedCategory');
if(storedFilter){
    categoryFilter.value = storedFilter;
}
// Implement the Random quote function
function showRandomQuote(){
    const filteredQuotes = filterQuotes();
    if(filteredQuotes.length>0){
        // Generate random index of the array element from filteredquotes
        const randomIndex = Math.floor(Math.random()*filteredQuotes.length);
        // access the random quote using the index generated
        const randomQuote = filteredQuotes[randomIndex];
        // clear previous quote and Display the random quote at the user interface of the application
        quoteDisplay.innerHTML = '';
        const newElement = document.createElement('p');
        newElement.innerHTML= `"${randomQuote.text}" - ${randomQuote.category}`;
        quoteDisplay.appendChild(newElement);

    } else{
        quoteDisplay.innerHTML = '<p> No quotes availlable for the selected category.<p>'
    }
}
// Populate categories dynamically
function populateCategories(){
    // get unique categories from the quotes
    const categories = [...new Set(quoteVariable.map(quote=>quote.category))];
    // populate the category filter dropdown
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
    categories.forEach(category=>{
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}
// implement the filter quote function
function filterQuotes(){
    const selectedCategory = categoryFilter.value;
    // save selected category to local storage
    localStorage.setItem('selectedCategory', selectedCategory);
    // filter quotes based on selected category
    if(selectedCategory==='all'){
        return quoteVariable;
    } else{
        return quoteVariable.filter(quote=>quote.category===selectedCategory)
    }
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
    // update categories dynamically
    populateCategories();
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
        // update categories dynamically after import
        populateCategories();
        showRandomQuote();
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
categoryFilter.addEventListener('change', showRandomQuote);
// show intial quote and populate categories on page load
populateCategories();
showRandomQuote();