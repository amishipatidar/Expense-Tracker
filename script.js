const API_KEY = '920b388b3d884ba4adcc092825d56569'; 
const API_URL = `https://openexchangerates.org/api/latest.json?app_id=${API_KEY}`;
let expenses = JSON.parse(localStorage.getItem('expenses')) || []; // Retrieve stored expenses
let exchangeRates = {}; // Object to store exchange rates
let baseCurrency = 'USD'; // Default base currency

// Fetch exchange rates from API
async function fetchExchangeRates() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch exchange rates");
        
        const data = await response.json();
        exchangeRates = data.rates;
        console.log("Exchange Rates Loaded:", exchangeRates);
    } catch (error) {
        console.error("Error fetching exchange rates:", error);
        alert("Failed to load exchange rates. Please check your API key or internet connection.");
    }
}

// Fetch and populate currency options in dropdowns
async function fetchCurrencies() {
    try {
        const response = await fetch('https://openexchangerates.org/api/currencies.json');
        if (!response.ok) throw new Error("Failed to fetch currencies");

        const data = await response.json();
        const currencySelect = document.getElementById('currency');
        const baseCurrencySelect = document.getElementById('base-currency');

        // Clear existing options
        currencySelect.innerHTML = '';
        baseCurrencySelect.innerHTML = '';

        for (let code in data) {
            let option = document.createElement('option');
            option.value = code;
            option.textContent = `${code} - ${data[code]}`;
            currencySelect.appendChild(option.cloneNode(true)); // Clone for expense currency dropdown
            baseCurrencySelect.appendChild(option); // Append to base currency dropdown
        }
    } catch (error) {
        console.error("Error fetching currencies:", error);
        alert("Failed to load currency list.");
    }
}

// Change base currency and convert expenses accordingly
async function changeBaseCurrency() {
    baseCurrency = document.getElementById('base-currency').value;
    document.getElementById('current-currency').textContent = baseCurrency;
    await convertCurrency();
}

// Convert all expenses to the selected base currency
async function convertCurrency() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch exchange rates");

        const data = await response.json();
        exchangeRates = data.rates;

        expenses = expenses.map(exp => ({
            ...exp,
            amount: (exp.amount * (exchangeRates[baseCurrency] / exchangeRates[exp.currency])).toFixed(2),
            currency: baseCurrency
        }));

        localStorage.setItem('expenses', JSON.stringify(expenses));
        renderExpenses();
    } catch (error) {
        console.error("Error converting currency:", error);
        alert("Error converting currency. Please try again.");
    }
}

// Add a new expense
function addExpense() {
    const desc = document.getElementById('expenseName').value.trim();
    const amount = parseFloat(document.getElementById('expenseAmount').value);
    const currency = document.getElementById('currency').value;
    const category = document.getElementById('category').value;

    if (!desc || isNaN(amount) || amount <= 0 || !category) {
        alert("Please enter valid expense details.");
        return;
    }

    expenses.push({ desc, amount, currency, category });
    localStorage.setItem('expenses', JSON.stringify(expenses));

    // Clear input fields after adding expense
    document.getElementById('expenseName').value = '';
    document.getElementById('expenseAmount').value = '';

    renderExpenses();
}

// Delete an expense from the list
function deleteExpense(index) {
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    renderExpenses();
}

// Render the expense table dynamically
function renderExpenses() {
    const tableBody = document.querySelector('#expenseTable tbody');
    tableBody.innerHTML = ''; // Clear table before re-rendering

    expenses.forEach((expense, index) => {
        let row = document.createElement('tr');

        row.innerHTML = `
            <td>${expense.desc}</td>
            <td>${expense.amount} ${expense.currency}</td>
            <td>${expense.category}</td>
            <td><button onclick="deleteExpense(${index})">Delete</button></td>
        `;

        tableBody.appendChild(row);
    });

    updateChart();
}

// Update and render the expense breakdown chart
function updateChart() {
    const ctx = document.getElementById('expenseChart').getContext('2d');

    // Check if the chart exists before calling destroy
    if (window.expenseChart instanceof Chart) {
        window.expenseChart.destroy();  // Destroy the previous chart to prevent overlap
    }

    const categories = [...new Set(expenses.map(exp => exp.category))];  // Unique categories
    const data = categories.map(cat => 
        expenses.filter(exp => exp.category === cat)
                .reduce((sum, exp) => sum + parseFloat(exp.amount), 0)
    );

    // Initialize the new chart
    window.expenseChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: categories,
            datasets: [{
                data,
                backgroundColor: [
                    '#002244', 
                    '#3457D5', 
                    '#3B82F6', 
                    '#60A5FA', 
                    '#93C5FD'  
                ],
                borderColor: 'transparent',  
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,   
                        pointStyle: 'circle',  
                        boxWidth: 20,
                        padding: 30           
                    }
                }
            }
        }
    });
}

// Initialize the app when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', async () => {
    await fetchExchangeRates(); // Load exchange rates first
    await fetchCurrencies(); // Load currency list
    renderExpenses(); // Display saved expenses
});

// Event listener for currency change
document.getElementById('base-currency').addEventListener('change', changeBaseCurrency);



