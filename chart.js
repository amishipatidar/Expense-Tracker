// function updateChart() {
//     let categoryTotals = {};

//     // Convert expenses into total amounts per currency
//     expenses.forEach(expense => {
//         categoryTotals[expense.currency] = 
//             (categoryTotals[expense.currency] || 0) + expense.amount;
//     });

//     // Get canvas context
//     const ctx = document.getElementById('expenseChart').getContext('2d');

//     // Create chart
//     new Chart(ctx, {
//         type: 'pie',
//         data: {
//             labels: Object.keys(categoryTotals), // Currency labels
//             datasets: [{
//                 data: Object.values(categoryTotals), // Total amounts
//                 backgroundColor: ['#343a40', '#002244', '#495057', '#007791'] 
//             }]
//         }
//     });
// }

// function updateChart() {
//     let categoryTotals = {};

//     // Convert expenses into total amounts per currency
//     expenses.forEach(expense => {
//         categoryTotals[expense.currency] = 
//             (categoryTotals[expense.currency] || 0) + expense.amount;
//     });

//     // Get canvas context
//     const ctx = document.getElementById('expenseChart').getContext('2d');

//     // Create chart
//     new Chart(ctx, {
//         type: 'pie',
//         data: {
//             labels: Object.keys(categoryTotals), // Currency labels
//             datasets: [{
//                 data: Object.values(categoryTotals), // Total amounts
//                 backgroundColor: [
//                     '#1E3A8A', // Dark blue
//                     '#3B82F6', // Medium blue
//                     '#60A5FA', // Light blue
//                     '#93C5FD'  // Very light blue
//                 ] 
//             }]
//         }
//     });
// }

