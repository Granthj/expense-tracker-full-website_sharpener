async function loadNavbar() {
    const res = await fetch('/views/navbar.html'); // path adjust if needed
    const data = await res.text();

    document.getElementById('nav').innerHTML = data;

    // mobile toggle
    const toggle = document.querySelector('.menu-toggle');
    const links = document.querySelector('.nav-links');

    toggle.addEventListener('click', () => {
        links.classList.toggle('active');
    });
}

loadNavbar();