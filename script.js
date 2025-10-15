document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');

    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('-translate-x-full');
    });

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a');

    // Active link highlighting
    const currentPath = window.location.pathname.split('/').pop();
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });


    const questionHeaders = document.querySelectorAll('article h4');
    questionHeaders.forEach(header => {
        const article = header.parentElement;
        const answers = article.querySelectorAll('p, ul, ol, table, pre');

        // Add icon
        const icon = document.createElement('span');
        icon.classList.add('float-right');
        icon.textContent = '+';
        header.appendChild(icon);

        answers.forEach(answer => {
            answer.classList.add('hidden');
        });

        header.addEventListener('click', () => {
            answers.forEach(answer => {
                answer.classList.toggle('hidden');
            });
            icon.textContent = icon.textContent === '+' ? '-' : '+';
        });
    });
});
