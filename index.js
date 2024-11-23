let totalExpense = 0;

function getUniqueIdentifier() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const secs = String(now.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day}_${hours}:${minutes}:${secs}`;
}

function handleFormSubmit(event) {
  event.preventDefault();

  const expAmt = parseFloat(event.target.exp_amt.value); //parseFloat recognise it as a number other it will get concatenated instead of adding
  const desc = event.target.desc.value;
  const cat = event.target.cat.value;

  const expense = {
    id: getUniqueIdentifier(),
    expAmt,
    desc,
    cat,
  };

  localStorage.setItem(expense.id, JSON.stringify(expense));
  showUserOnScreen(expense);
  updateTotalExpense(expAmt);

  event.target.exp_amt.value = "";
  event.target.desc.value = "";
  event.target.cat.value = "";
}

function showUserOnScreen(expense) {
  const listOfExpenses = document.getElementById("list_of_expenses");

  const newExpense = document.createElement("li");
  newExpense.textContent = `${expense.id} | Rs.${expense.expAmt} | ${expense.desc} | ${expense.cat}`;

  const deleteButton = document.createElement("input");
  deleteButton.type = "button";
  deleteButton.value = "Delete Expense";
  deleteButton.onclick = () => {
    localStorage.removeItem(expense.id);
    listOfExpenses.removeChild(newExpense);
    updateTotalExpense(-expense.expAmt);
  };

  const editButton = document.createElement("input");
  editButton.type = "button";
  editButton.value = "Edit Expense";
  editButton.onclick = () => {
    localStorage.removeItem(expense.id);
    listOfExpenses.removeChild(newExpense);
    updateTotalExpense(-expense.expAmt);
    document.querySelector("form").exp_amt.value = expense.expAmt;
    document.querySelector("form").desc.value = expense.desc;
    document.querySelector("form").cat.value = expense.cat;
  };

  newExpense.appendChild(deleteButton);
  newExpense.appendChild(editButton);
  listOfExpenses.appendChild(newExpense);
}

function updateTotalExpense(amount) {
  totalExpense = totalExpense + amount;

  const totalExp = document.getElementById("total_exp");
  totalExp.textContent = totalExpense;
}
