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

        /* ---------- 開關選單 ---------- */

        menuToggle.addEventListener("click", function () {

            const isOpen = navMenu.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            /* 手機選單開啟時，鎖住背景頁面 */

            if (isOpen) {

                document.body.classList.add("menu-open");

                document.documentElement.classList.add("menu-open");

            } else {

                document.body.classList.remove("menu-open");

                document.documentElement.classList.remove("menu-open");

            }

        });


        /* =================================================
           點擊選單連結
        ================================================= */

        const navLinks = navMenu.querySelectorAll("a");

        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                navMenu.classList.remove("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                document.body.classList.remove("menu-open");

                document.documentElement.classList.remove("menu-open");

            });

        });


        /* =================================================
           防止手機觸控造成 hover 殘留
        ================================================= */

        navLinks.forEach(function (link) {

            link.addEventListener("touchstart", function () {

                navLinks.forEach(function (item) {

                    item.classList.remove("touch-hover");

                });

                link.classList.add("touch-hover");

            }, {
                passive: true
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

        const linkUrl = new URL(
            link.href,
            window.location.origin
        );

        const linkPath = linkUrl.pathname;

        /*
         * 只有真正對應目前頁面的連結才標示 active
         */

        if (linkPath === currentPath) {

            link.classList.add("active");

        } else {

            link.classList.remove("active");

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

                const target = document.querySelector(
                    targetId
                );

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* =====================================================
       📱 選單開啟時禁止背景頁面滑動
    ===================================================== */

    window.addEventListener("touchmove", function (event) {

        if (
            navMenu &&
            navMenu.classList.contains("open")
        ) {

            /*
             * 如果手指是在選單內滑動，
             * 允許選單自己的 overflow-y 滾動。
             */

            if (navMenu.contains(event.target)) {

                return;

            }

            /*
             * 如果手指在選單外，
             * 阻止背景頁面跟著滑動。
             */

            event.preventDefault();

        }

    }, {
        passive: false
    });


    /* =====================================================
       📱 選單關閉後恢復背景頁面
    ===================================================== */

    window.addEventListener("resize", function () {

        if (window.innerWidth > 800) {

            if (navMenu) {
                navMenu.classList.remove("open");
            }

            if (menuToggle) {

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

            document.body.classList.remove("menu-open");

            document.documentElement.classList.remove(
                "menu-open"
            );

        }

    });

});
