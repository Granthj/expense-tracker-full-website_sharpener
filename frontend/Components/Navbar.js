
export function Navbar(navigation) {

    const container = document.createElement('div');
    container.innerHTML = `
        <nav class="nav">
            <div class="nav-container">
                <div class="logo">ExpenseApp</div>

                <ul class="nav-links">
                    <li><a href="/add-income">Add Income</a></li>
                    <li><a href="/expense">Expenses</a></li>
                    <li><a href="/report">Reports</a></li>
                    <li><a href="/profile">Profile</a></li>
                </ul>

                <div class="menu-toggle">☰</div>
            </div>
        </nav>
    `
    const navLinks = container.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click',(e)=>{
            e.preventDefault();
            const route = link.getAttribute('href');
            navigation(route);
        })
    });
    // container.querySelector('.nav').innerHTML = data;

    // mobile toggle
    const toggle = container.querySelector('.menu-toggle');
    const links = container.querySelector('.nav-links');

    toggle.addEventListener('click', () => {
        links.classList.toggle('active');
    });

return container;
}