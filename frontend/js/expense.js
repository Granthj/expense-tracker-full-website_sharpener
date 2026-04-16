document.addEventListener('DOMContentLoaded', () => {
    getExpenses();
    showPremiumList();
    
    const amountTag = document.getElementById('expenseAmount');
    const descriptionTag = document.getElementById('description');
    function removeWarn() {
        const warn = document.getElementById('warn-msg');
        if (warn) warn.remove();
    }

    // remove warning when user interacts
    amountTag.addEventListener('input', removeWarn);
    descriptionTag.addEventListener('input', removeWarn);
})
const loadCategory = async (description) => {
    const categoryDiv = document.getElementById('categoryDiv');
    const aicategory = document.createElement('select');
    const oldAiCategory = document.getElementById('ai-category');
    if (oldAiCategory) {
        oldAiCategory.remove();
    }
    aicategory.id = 'ai-category';
    aicategory.name = 'category generating by Ai';
    const aiResponse = await axios.post('http://localhost:3000/api/create-category', {
        description
    });
    // console.log(aiResponse, 'inside loadCategory')
    const categories = JSON.parse(aiResponse.data.response);
    // aicategory.innerHTML = '';
    categories.forEach(arrData => {

        const cleanData = arrData.replace(/\*\*/g, '');
        const option = document.createElement('option');
        option.value = cleanData;
        option.textContent = cleanData;
        aicategory.appendChild(option);
    });
    categoryDiv.appendChild(aicategory);

    return aicategory;

}
const createCategoryBtb = document.getElementById('categoryBtnAi');
const categoryBtnAiDiv = document.getElementById('categoryBtnAiDiv');
const selectedCategoryTag = document.getElementById('category');

createCategoryBtb.addEventListener('click', async () => {
    let warnMsg = document.getElementById('warn-msg');
    const descriptionTag = document.getElementById('description');
    // const amountTag = document.getElementById('expenseAmount');
    const description = descriptionTag.value;

    if (!warnMsg) {
        warnMsg = document.createElement('p');
        warnMsg.id = 'warn-msg';
        warnMsg.style.color = 'red'
    }
    if (!description) {

        warnMsg.textContent = 'Please first fill Amount and Description';
        // createCategoryBtb.insertAdjacentElement('afterend', warnMsg);
        categoryBtnAiDiv.appendChild(warnMsg);
        // const removeWarn = () => {
        //     const warnMsg = document.getElementById('warn-msg');

        //     if (!warnMsg) return;

        //     warnMsg.remove();
        // }
        // descriptionTag.addEventListener('click', removeWarn, { once: true });
        // amountTag.addEventListener('click', removeWarn, { once: true });
        return;
    }
    // else{
    //     warnMsg.remove();
    // }
    // setTimeout(() => {
    //     document.addEventListener('click', (e) => {
    //         const warnMsg = document.getElementById('warn-msg');

    //         if (!warnMsg) return;

    //         warnMsg.remove();
    //     });
    // }, 0);

    selectedCategoryTag.disabled = true;

    const aiSelect = await loadCategory(description);

    aiSelect.addEventListener('change', () => {
        const value = aiSelect.value;
        let exists = false;
        for (let option of selectedCategoryTag.options) {
            if (option.value === value) {
                exists = true;
                break;
            }
        }
        if (!exists) {
            const option = document.createElement('option');
            option.value = value;
            option.textContent = value;
            // exists = true;
            selectedCategoryTag.appendChild(option);

        }
        selectedCategoryTag.value = aiSelect.value;
        aiSelect.remove();
        selectedCategoryTag.disabled = false;
    });
})
const handleSubmit = async (e) => {

    try {
        e.preventDefault();

        const expenseAmount = e.target.expenseAmount.value;
        const description = e.target.description.value;
        const category = e.target.category.value;
        console.log(expenseAmount, description, category, 'expense');
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:3000/api/expense',
            {
                expenseAmount,
                description,
                category
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
            showExpense(response.data, null);

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