/* =========================================================
   小白天堂 3.81
   全站共用 JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       📱 手機導覽選單
    ===================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", function () {

            navMenu.classList.toggle("open");

            const isOpen = navMenu.classList.contains("open");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );
        });

        /* 點擊導覽連結後，自動關閉手機選單 */

        const navLinks = navMenu.querySelectorAll("a");

        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {
                navMenu.classList.remove("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );
            });

        });
    }


    /* =====================================================
       🔝 回到頂端按鈕
    ===================================================== */

    const backToTop = document.querySelector(".back-to-top");

    if (backToTop) {

        window.addEventListener("scroll", function () {

            if (window.scrollY > 500) {
                backToTop.classList.add("show");
            } else {
                backToTop.classList.remove("show");
            }

        });

        backToTop.addEventListener("click", function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });
    }


    /* =====================================================
       🔗 導覽列目前頁面標示
    ===================================================== */

    const currentPath = window.location.pathname;

    const allNavLinks = document.querySelectorAll(
        ".nav-menu a"
    );

    allNavLinks.forEach(function (link) {

        const linkPath = new URL(
            link.href,
            window.location.origin
        ).pathname;

        if (
            linkPath === currentPath ||
            (
                linkPath !== "/" &&
                currentPath.startsWith(linkPath)
            )
        ) {
            link.classList.add("active");
        }

    });


    /* =====================================================
       🎬 影片載入處理
    ===================================================== */

    const videos = document.querySelectorAll("video");

    videos.forEach(function (video) {

        video.setAttribute("playsinline", "");
        video.setAttribute("preload", "metadata");

    });


    /* =====================================================
       📜 錨點平滑移動
    ===================================================== */

    const anchorLinks = document.querySelectorAll(
        'a[href^="#"]'
    );

    anchorLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = link.getAttribute("href");

            if (
                targetId &&
                targetId !== "#" &&
                document.querySelector(targetId)
            ) {

                event.preventDefault();

                const target = document.querySelector(targetId);

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });

});
