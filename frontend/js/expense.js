document.addEventListener('DOMContentLoaded', () => {
    getExpenses();
    showPremiumList();
})
const loadCategory = async(description) =>{
    const category = document.getElementById('category');
    const aiResponse = await axios.post('http://localhost:3000/api/create-category',{
        description
    });
    console.log(aiResponse,'inside loadCategory')
     const categories = JSON.parse(aiResponse.data.response);
    category.innerHTML = '';
       categories.forEach(arrData=>{
            
            const cleanData = arrData.replace(/\*\*/g, '');
            const option = document.createElement('option');
            option.value = cleanData;
            option.textContent = cleanData;
            category.appendChild(option);
        });
    
}
const category = document.getElementById('category');
category.addEventListener('focus', async () => {
    const description = document.getElementById('description').value;
    if (!description) return;
    console.log(description,'inside desc')
    await loadCategory(description);
});
const handleSubmit = async (e) => {

    try {
        e.preventDefault();

        const expenseAmount = e.target.expenseAmount.value;
        const description = e.target.description.value;
        // const category = e.target.category.value;
        const category = document.getElementById('category');
        // category.addEventListener('click',async()=>{
        //     const aiResponse = await axios.post('http://localhost:3000/api/create-category',{
        //         description
        //     });
        //     category.innerHTML = '';
        //     aiResponse.data.response.forEach(arrData=>{

        //         const cleanData = arrData.replace(/\*\*/g, '');
        //         const option = document.createElement('option');
        //         option.value = cleanData;
        //         option.textContent = cleanData;
        //         category.appendChild(option);
        //     });
        // });

        const selectedCategory = category.value;
        // console.log(aiResponse.data.response,'ai data dfghj');
        const token = localStorage.getItem('token');
        // console.log(token,'asasasasasas');
        const response = await axios.post('http://localhost:3000/api/expense',
            {
                expenseAmount,
                description,
                selectedCategory
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
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
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        console.log(token, response.data, 'in get loginnnn')
        const parentList = document.getElementById('expenseList');

        parentList.innerHTML = '';

        // console.log(response, 'hgyug');

        if (response.data.length !== 0) {
            // const parentList = document.getElementById('expenseList');
            showExpense(response.data,null);
            
        }
    }
    catch (err) {
        console.log(err);
    }
}
const showExpense = (expense) => {

    // if(expense === null){

    // }
    const parentList = document.getElementById('expenseList');
    const header = ['Amount', 'Description', 'Category', 'Action'];
    
    
    const table = document.createElement('table');
    const tr = document.createElement('tr');


    table.border = "1";
    header.forEach(column => {
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
        deleteBtn.addEventListener('click', async () => {
            deleteExpense(data.id, tr);
        })
        tdDelete.appendChild(deleteBtn);

        tr.appendChild(tdAmount);
        tr.appendChild(tdDescription);
        tr.appendChild(tdCategory);
        tr.appendChild(tdDelete);
        table.appendChild(tr);
    });
    parentList.appendChild(table);
    showPremiumList();
}

const showPremiumList = async () => {

    try {
        // e.preventDefault();
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/api/premium',
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        const premiumUl = document.getElementById('premium');
        premiumUl.innerHTML = '';
        response.data.forEach(data => {
            if (data.totalExpense !== 0) {

                console.log(data.name, 'vcdsvfyuweb')
                const div = document.getElementById('premiumDiv');
                const li = document.createElement('li');
                const text = document.createTextNode(`Name: ${data.name} - Amount: ${data.totalExpense}`);
                li.appendChild(text);
                premiumUl.appendChild(li);
                div.appendChild(premiumUl);
            }
        });
    }
    catch (err) {
        console.log(err.response);
    }
}
const deleteExpense = async (id, row) => {

    const token = localStorage.getItem('token');
    await axios.delete(`http://localhost:3000/api/delete-expense/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    row.remove();
    showPremiumList();
    // showExpense(null);
}
const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login'
}
const goPayment = () => {
    // localStorage.removeItem('token');
    window.location.href = '/payment'
}