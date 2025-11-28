const menuToggle = document.getElementById('menuToggle') || document.getElementById('menu_toggle');
const navegacao = document.getElementById('navegacao') || document.getElementById('nav_bar') || document.querySelector('.navegacao') || document.querySelector('.nav_bar');

if (menuToggle && navegacao) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navegacao.classList.toggle('active');
    });

    const navLinks = document.querySelectorAll('.navegacao a, .navegacao button, .nav_bar a, .nav_bar button');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navegacao.classList.remove('active');
        });
    });

    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !navegacao.contains(e.target)) {
            menuToggle.classList.remove('active');
            navegacao.classList.remove('active');
        }
    });
}