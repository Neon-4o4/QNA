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
        const answer = article.querySelector('div');

        // Add icon
        const icon = document.createElement('span');
        icon.classList.add('float-right');
        icon.textContent = '+';
        header.appendChild(icon);

        if (answer) {
            answer.style.display = 'none';
        }

        header.addEventListener('click', () => {
            if (answer) {
                if (answer.style.display === 'none') {
                    answer.style.display = 'block';
                    icon.textContent = '-';
                } else {
                    answer.style.display = 'none';
                    icon.textContent = '+';
                }
            }
        });
    });
});
