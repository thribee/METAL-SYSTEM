document.addEventListener("DOMContentLoaded", function () {

    const currentPath = window.location.pathname;

    const menuLinks = document.querySelectorAll('.list li a');

    menuLinks.forEach(link => {
        const hrefValue = link.getAttribute('href');

        if (currentPath.endsWith(hrefValue)) {
            link.classList.add('active');
        }
        else if ((currentPath === "/" || currentPath.endsWith("despesas.html")) && hrefValue === "despesas.html") {
            link.classList.add('active');
        }
    });

});
