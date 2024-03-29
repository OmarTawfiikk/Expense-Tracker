document.addEventListener("DOMContentLoaded", function() {
    const expenseForm = document.getElementById("expense-form");
    const expensesTable = document.getElementById("tablebody");
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");

    // Retrieve expenses from local storage
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    // Render expenses
    function renderExpenses() {
        expensesTable.innerHTML = "";
        expenses.forEach(function(expense, index) {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${expense.name}</td>
                <td>$${expense.amount}</td>
                <td>${expense.category}</td>
                <td>${expense.description}</td>
                <td>
                    <button type="button" class="btn btn-sm btn-outline-primary" onclick="editExpense(${index})">Edit</button>
                    <button type="button" class="btn btn-sm btn-outline-danger" onclick="deleteExpense(${index})">Delete</button>
                </td>
            `;
            expensesTable.appendChild(row);
        });
    }

    renderExpenses();

    // Add expense
    expenseForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const category = document.getElementById("expense-category").value;
        const name = document.getElementById("expense-name").value;
        const amount = document.getElementById("expense-amount").value;
        const description = document.getElementById("expense-description").value;
        expenses.push({ category, name, amount, description });
        localStorage.setItem("expenses", JSON.stringify(expenses));
        renderExpenses();
        expenseForm.reset();
    });

    // Edit expense
    window.editExpense = function(index) {
        const newName = prompt("Enter new name:");
        const newAmount = prompt("Enter new amount:");
        if (newName && newAmount) {
            expenses[index].name = newName;
            expenses[index].amount = newAmount;
            localStorage.setItem("expenses", JSON.stringify(expenses));
            renderExpenses();
        }
    };

    // Delete expense
    window.deleteExpense = function(index) {
        if (confirm("Are you sure you want to delete this expense?")) {
            expenses.splice(index, 1);
            localStorage.setItem("expenses", JSON.stringify(expenses));
            renderExpenses();
        }
    };

    // Search expense by name
    searchButton.addEventListener("click", function() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredExpenses = expenses.filter(expense => expense.name.toLowerCase().includes(searchTerm));
        expensesTable.innerHTML = "";
        filteredExpenses.forEach(function(expense, index) {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${expense.name}</td>
                <td>$${expense.amount}</td>
                <td>${expense.category}</td>
                <td>${expense.description}</td>
                <td>
                    <button type="button" class="btn btn-sm btn-outline-primary" onclick="editExpense(${index})">Edit</button>
                    <button type="button" class="btn btn-sm btn-outline-danger" onclick="deleteExpense(${index})">Delete</button>
                </td>
            `;
            expensesTable.appendChild(row);
        });
    });
});
