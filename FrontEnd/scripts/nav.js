document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.includes("login.html")) {
        document.querySelector("a[href*='login']").classList.add("active");
    }
});
