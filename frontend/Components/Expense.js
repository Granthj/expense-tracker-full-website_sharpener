export function Expense(navigate) {
  const container = document.createElement("div");

  container.innerHTML = `
    <div class="expense-container">
      <form id="expenseForm">
        <div>
          <label>Amount:</label>
          <input type="text" id="expenseAmount" name="expenseAmount">
        </div>

        <div>
          <label>Description:</label>
          <input type="text" id="description" name="description">
        </div>

        <div id="categoryDiv">
          <label>Choose category:</label>
          <select id="category" name="category">
            <option value="movie">Movies</option>
            <option value="food">Food</option>
            <option value="travel">Travel</option>
            <option value="gaged">Gageds</option>
            <option value="cloth">Cloths</option>
            <option value="shoe">Shoes</option>
            <option value="gimick">Gimicks</option>
          </select>
        </div>

        <button type="submit">Add Expense</button>

        <div id="categoryBtnAiDiv">
          <button id="categoryBtnAi" type="button">
            Choose category by AI
          </button>
        </div>
      </form>
    </div>

    <div id="expenseSection">

      <div id="pageControls">
        <label>Items per page:</label>
        <select id="pageSize">
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
      </div>

      <div id="expenseList"></div>

      <div id="pagination"></div>

    </div>

    <button id="logoutBtn">Logout</button>
    <button id="paymentBtn">Payment</button>

    <div id="premiumDiv">
      <h2>Premium Members</h2>
      <ul id="premium"></ul>
    </div>
    <div id="dynamicButton"></div>
  `;

  let limit = 10;
  let currentPage = 1;
  
  const form = container.querySelector("#expenseForm");
  const amountTag = container.querySelector("#expenseAmount");
  const descriptionTag = container.querySelector("#description");
  const categoryDiv = container.querySelector("#categoryDiv");
  const categoryBtn = container.querySelector("#categoryBtnAi");
  const categoryBtnDiv = container.querySelector("#categoryBtnAiDiv");
  const selectedCategory = container.querySelector("#category");
  const expenseList = container.querySelector("#expenseList");
  const premiumUl = container.querySelector("#premium");

  function removeWarn() {
    const warn = container.querySelector("#warn-msg");
    if (warn) warn.remove();
  }

  amountTag.addEventListener("input", removeWarn);
  descriptionTag.addEventListener("input", removeWarn);

  async function loadCategory(description) {
    const old = container.querySelector("#ai-category");
    if (old) old.remove();

    const select = document.createElement("select");
    select.id = "ai-category";

    const res = await axios.post("http://localhost:3000/api/create-category", {
      description,
    });

    const categories = JSON.parse(res.data.response);

    categories.forEach((item) => {
      const clean = item.replace(/\*\*/g, "");
      const option = document.createElement("option");
      option.value = clean;
      option.textContent = clean;
      select.appendChild(option);
    });

    categoryDiv.appendChild(select);
    return select;
  }

  categoryBtn.addEventListener("click", async () => {
    let warn = container.querySelector("#warn-msg");

    if (!warn) {
      warn = document.createElement("p");
      warn.id = "warn-msg";
      warn.style.color = "red";
    }

    const description = descriptionTag.value;

    if (!description) {
      warn.textContent = "Please fill description first";
      categoryBtnDiv.appendChild(warn);
      return;
    }

    selectedCategory.disabled = true;

    const aiSelect = await loadCategory(description);

    aiSelect.addEventListener("change", () => {
      const value = aiSelect.value;

      let exists = false;
      for (let option of selectedCategory.options) {
        if (option.value === value){
          exists = true;
          break;
        } 
      }

      if (!exists) {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = value;
        selectedCategory.appendChild(option);
      }

      selectedCategory.value = aiSelect.value;
      aiSelect.remove();
      selectedCategory.disabled = false;
    });
  });
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const expenseAmount = amountTag.value;
    const description = descriptionTag.value;
    const category = selectedCategory.value;

    const token = localStorage.getItem("token");

    await axios.post(
      "http://localhost:3000/api/expense",
      { expenseAmount, description, category },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    form.reset();
    getExpenses();
  });
  container.querySelector('#pageSize').addEventListener('change',(e)=>{
    const limit = parseInt(e.target.value);
    const currentPage = 1;
    getExpenses(currentPage);
  });

  async function getExpenses(page = 1) {
    const token = localStorage.getItem("token");

    const res = await axios.get(`http://localhost:3000/api/expense?page=${page}&limit=${limit}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    expenseList.innerHTML = "";
    renderTable(res.data.expenses);
    renderPagination(res.data.totalPages,res.data.currentPage);
  }

  function renderPagination(totalPage,currentPage){

    // const limit = container.querySelector('#pageSize').value;
    const dynamicButtonDiv = container.querySelector('#dynamicButton');
    dynamicButtonDiv.innerHTML = "";
    
    if(totalPage === 0) return;

    for(let i = 1;i <= totalPage;i++){
      const currentPageButton = document.createElement('button');
      currentPageButton.textContent = i;

      if(currentPage === i){
        currentPageButton.disabled = true;
        currentPageButton.style.fontWeight = 'bold';
      }

      currentPageButton.addEventListener('click',()=>{
        getExpenses(i);
      });
      dynamicButtonDiv.appendChild(currentPageButton);
    }

  }
  function renderTable(data) {
    const table = document.createElement("table");
    table.border = "1";

    const header = ["Amount", "Description", "Category", "Action"];
    const tr = document.createElement("tr");

    header.forEach((h) => {
      const th = document.createElement("th");
      th.textContent = h;
      tr.appendChild(th);
    });

    table.appendChild(tr);

    data.forEach((item) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${item.expenseAmount}</td>
        <td>${item.description}</td>
        <td>${item.category}</td>
      `;

      const td = document.createElement("td");
      const btn = document.createElement("button");
      btn.textContent = "Delete";

      btn.addEventListener("click", async () => {
        const token = localStorage.getItem("token");

        await axios.delete(
          `http://localhost:3000/api/delete-expense/${item.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        row.remove();
        showPremium();
      });

      td.appendChild(btn);
      row.appendChild(td);
      table.appendChild(row);
    });

    expenseList.appendChild(table);
    showPremium();
  }

  async function showPremium() {
    const token = localStorage.getItem("token");

    const res = await axios.get("http://localhost:3000/api/premium", {
      headers: { Authorization: `Bearer ${token}` },
    });

    premiumUl.innerHTML = "";

    res.data.forEach((user) => {
      if (user.totalExpense !== 0) {
        const li = document.createElement("li");
        li.textContent = `Name: ${user.name} - Amount: ${user.totalExpense}`;
        premiumUl.appendChild(li);
      }
    });
  }

  container.querySelector("#logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("token");
    navigate("/login");
  });

  container.querySelector("#paymentBtn").addEventListener("click", () => {
    navigate("/payment");
  });

  getExpenses();
  showPremium();

  return container;
}