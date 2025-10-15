document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');

    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('-translate-x-full');
    });

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    const questionHeaders = document.querySelectorAll('article h4');
    questionHeaders.forEach(header => {
        const article = header.parentElement;
        const answers = article.querySelectorAll('p, ul, ol, table, pre');
        answers.forEach(answer => {
            answer.classList.add('hidden');
        });
        header.addEventListener('click', () => {
            answers.forEach(answer => {
                answer.classList.toggle('hidden');
            });
        });
    });
});
