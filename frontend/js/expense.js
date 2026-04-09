document.addEventListener('DOMContentLoaded', ()=>{
    getExpenses();
    showPremiumList();
})    

const handleSubmit = async (e) => {
    
    try {
        e.preventDefault();
        
        const expenseAmount = e.target.expenseAmount.value;
        const description = e.target.description.value;
        const category = e.target.category.value;
        const token = localStorage.getItem('token');
        // console.log(token,'asasasasasas');
        const response = await axios.post('http://localhost:3000/api/expense', 
            {
                expenseAmount,
                description,
                category
            },
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        );
        getExpenses();
        e.target.expenseAmount.value = '';
        e.target.description.value = '';
        e.target.category.value = ''
    }
    catch (err) {
        console.log(err.response);
    }
}
async function getExpenses() {

    try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/api/expense',
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        );
        console.log(token,response.data,'in get loginnnn')
        const parentList = document.getElementById('expenseList');

        parentList.innerHTML = '';

        // console.log(response, 'hgyug');

        if(response.data.length !== 0){

            showExpense(response.data);
        }
    }
    catch (err) {
        console.log(err);
    }
}
const showExpense = (expense) => {

    const header = ['Amount','Description','Category','Action'];
    
    const parentList = document.getElementById('expenseList');

    const table = document.createElement('table');
    const tr = document.createElement('tr');
    table.border = "1";
    header.forEach(column=>{
        const th = document.createElement('th');
        th.textContent = column;
        tr.appendChild(th);
    })
    table.appendChild(tr);
    
    // console.log(expense,'here post before')
    expense.forEach(data => {
        // console.log(data,'here post after')

        const tr = document.createElement('tr');

        const tdAmount = document.createElement('td');
        tdAmount.textContent = data.expenseAmount;

        const tdDescription = document.createElement('td');
        tdDescription.textContent = data.description;

        const tdCategory = document.createElement('td');
        tdCategory.textContent = data.category;

        const tdDelete = document.createElement('td');
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        tdDelete.appendChild(deleteBtn);

        tr.appendChild(tdAmount);
        tr.appendChild(tdDescription);
        tr.appendChild(tdCategory);
        tr.appendChild(tdDelete);
        table.appendChild(tr);
    });
    parentList.appendChild(table);
}

 const showPremiumList = async()=>{

    try{
        // e.preventDefault();
         const token = localStorage.getItem('token');
         const response = await axios.get('http://localhost:3000/api/premium',
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        );
        const premiumUl = document.getElementById('premium');
        
        response.data.forEach(data=>{
            console.log(data.name,'vcdsvfyuweb')
            const div = document.getElementById('premiumDiv');
            const li = document.createElement('li');
            const text = document.createTextNode(`Name: ${data.name} - Amount: ${data.totalExpense}`);
            li.appendChild(text);
            premiumUl.appendChild(li);
            div.appendChild(premiumUl);
        });  
    }
    catch(err){
        console.log(err.response);
    }
}
const logout = ()=>{
    localStorage.removeItem('token');
     window.location.href = '/login'
}
const goPayment = ()=>{
    // localStorage.removeItem('token');
     window.location.href = '/payment'
}