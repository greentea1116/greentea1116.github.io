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

    let savedScrollY = 0;


    /* =====================================================
       📱 手機選單專用修正
       1. 選單開啟時鎖住後面的網頁
       2. 選單本身可以上下滑動
       3. 防止 iPhone Safari hover 黃光殘留
    ===================================================== */

    const mobileMenuStyle = document.createElement("style");

    mobileMenuStyle.textContent = `
        @media (max-width: 800px) {

            .nav-menu {
                touch-action: pan-y !important;
                overscroll-behavior: contain !important;
                -webkit-overflow-scrolling: touch !important;
            }

            .nav-menu a:hover:not(.active) {
                color: #eadfc9 !important;
                border-color: rgba(217, 180, 90, 0.12) !important;
                background: rgba(20, 16, 25, 0.72) !important;
                transform: none !important;
            }

            .nav-menu a.active {
                color: #ffd875 !important;
                border-color: rgba(217, 180, 90, 0.45) !important;
                background: rgba(45, 32, 22, 0.85) !important;
            }

            body.mobile-menu-locked {
                overflow: hidden !important;
            }

            html.mobile-menu-locked {
                overflow: hidden !important;
            }
        }
    `;

    document.head.appendChild(mobileMenuStyle);


    /* =====================================================
       🔒 鎖定後方網頁
    ===================================================== */

    function lockPageScroll() {

        savedScrollY = window.scrollY;

        document.documentElement.classList.add(
            "mobile-menu-locked"
        );

        document.body.classList.add(
            "mobile-menu-locked"
        );

        document.body.style.position = "fixed";
        document.body.style.top = `-${savedScrollY}px`;
        document.body.style.left = "0";
        document.body.style.right = "0";
        document.body.style.width = "100%";
        document.body.style.overflow = "hidden";
    }


    /* =====================================================
       🔓 解鎖後方網頁
    ===================================================== */

    function unlockPageScroll() {

        document.documentElement.classList.remove(
            "mobile-menu-locked"
        );

        document.body.classList.remove(
            "mobile-menu-locked"
        );

        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.width = "";
        document.body.style.overflow = "";

        window.scrollTo(
            0,
            savedScrollY
        );
    }


    /* =====================================================
       📱 開啟／關閉手機選單
    ===================================================== */

    if (menuToggle && navMenu) {

        menuToggle.addEventListener(
            "click",
            function () {

                const isOpen =
                    navMenu.classList.contains("open");


                if (!isOpen) {

                    navMenu.classList.add("open");

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "true"
                    );

                    lockPageScroll();

                } else {

                    navMenu.classList.remove("open");

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    unlockPageScroll();

                }

            }
        );


        /* =================================================
           點擊選單連結
        ================================================= */

        const navLinks =
            navMenu.querySelectorAll("a");


        navLinks.forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

                    navMenu.classList.remove("open");

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    unlockPageScroll();

                }
            );

        });


        /* =================================================
           避免觸控選單時事件傳到後方頁面
        ================================================= */

        navMenu.addEventListener(
            "touchmove",
            function (event) {

                event.stopPropagation();

            },
            {
                passive: true
            }
        );

    }


    /* =====================================================
       🔝 回到頂端按鈕
    ===================================================== */

    const backToTop =
        document.querySelector(".back-to-top");


    if (backToTop) {

        window.addEventListener(
            "scroll",
            function () {

                if (window.scrollY > 500) {

                    backToTop.classList.add("show");

                } else {

                    backToTop.classList.remove("show");

                }

            }
        );


        backToTop.addEventListener(
            "click",
            function () {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =====================================================
       🔗 導覽列目前頁面標示
    ===================================================== */

    const currentPath =
        window.location.pathname;


    const allNavLinks =
        document.querySelectorAll(
            ".nav-menu a"
        );


    allNavLinks.forEach(function (link) {

        const linkPath =
            new URL(
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

        } else {

            link.classList.remove("active");

        }

    });


    /* =====================================================
       🎬 影片載入處理
    ===================================================== */

    const videos =
        document.querySelectorAll("video");


    videos.forEach(function (video) {

        video.setAttribute(
            "playsinline",
            ""
        );

        video.setAttribute(
            "preload",
            "metadata"
        );

    });


    /* =====================================================
       📜 錨點平滑移動
    ===================================================== */

    const anchorLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    anchorLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const targetId =
                    link.getAttribute("href");


                if (
                    targetId &&
                    targetId !== "#" &&
                    document.querySelector(targetId)
                ) {

                    event.preventDefault();


                    const target =
                        document.querySelector(
                            targetId
                        );


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }
        );

    });

});
