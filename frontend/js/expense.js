document.addEventListener('DOMContentLoaded',getExpenses());
const handleSubmit = async(e)=>{

    try{
        e.preventDefault();

        const expenseAmount = e.target.expenseAmount.value;
        const description = e.target.description.value;
        const category = e.target.category.value;

        const response = await axios.post('http://localhost:3000/api/expense',{
            expenseAmount,
            description,
            category
        });
        showExpense(response.data);
        console.log(response);
        e.target.expenseAmount.value = '';
        e.target.description.value = '';
        e.target.category.value = ''
    }
    catch(err){
        console.log(err.response);
    }
}
async function getExpenses(){

    try{
        const response = await axios.get('http://localhost:3000/api/expense');

        const parentList = document.getElementById('expenseList');
        
        parentList.innerHTML = '';

        console.log(response.data,'hgyug');
        response.data.forEach(data=>{
            showExpense(data);
        });
    }
    catch(err){
        console.log(err);
    }
}
const showExpense = (expense)=>{

    const parentList = document.getElementById('expenseList');
    const row = document.createElement('div');
    row.className = 'expenseRow';

    const amount = document.createElement('span');
    amount.textContent = expense.expenseAmount;

    const category = document.createElement('span');
    category.textContent = expense.category;

    const description = document.createElement('span');
    description.textContent = expense.description;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';

    row.appendChild(amount);
    row.appendChild(category);
    row.appendChild(description);
    row.appendChild(deleteBtn);

    parentList.appendChild(row);

}