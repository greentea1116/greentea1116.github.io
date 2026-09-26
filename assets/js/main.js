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
            const isOpen = navMenu.classList.toggle("open");
            menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
            if (isOpen) {
                document.body.classList.add("menu-open");
                document.documentElement.classList.add("menu-open");
            } else {
                document.body.classList.remove("menu-open");
                document.documentElement.classList.remove("menu-open");
            }
        });

        const navLinks = navMenu.querySelectorAll("a");
        navLinks.forEach(function (link) {
            link.addEventListener("click", function () {
                navMenu.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                document.body.classList.remove("menu-open");
                document.documentElement.classList.remove("menu-open");
            });
        });

        navLinks.forEach(function (link) {
            link.addEventListener("touchstart", function () {
                navLinks.forEach(function (item) {
                    item.classList.remove("touch-hover");
                });
                link.classList.add("touch-hover");
            }, { passive: true });
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
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    /* =====================================================
       🔗 導覽列目前頁面標示
    ===================================================== */

    const currentPath = window.location.pathname;
    const allNavLinks = document.querySelectorAll(".nav-menu a");
    allNavLinks.forEach(function (link) {
        const linkUrl = new URL(link.href, window.location.origin);
        const linkPath = linkUrl.pathname;
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

    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            const targetId = link.getAttribute("href");
            if (targetId && targetId !== "#" && document.querySelector(targetId)) {
                event.preventDefault();
                const target = document.querySelector(targetId);
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });

    /* =====================================================
       📱 選單開啟時禁止背景頁面滑動
    ===================================================== */

    window.addEventListener("touchmove", function (event) {
        if (navMenu && navMenu.classList.contains("open")) {
            if (navMenu.contains(event.target)) {
                return;
            }
            event.preventDefault();
        }
    }, { passive: false });

    /* =====================================================
       📱 選單關閉後恢復背景頁面
    ===================================================== */

    window.addEventListener("resize", function () {
        if (window.innerWidth > 800) {
            if (navMenu) {
                navMenu.classList.remove("open");
            }
            if (menuToggle) {
                menuToggle.setAttribute("aria-expanded", "false");
            }
            document.body.classList.remove("menu-open");
            document.documentElement.classList.remove("menu-open");
        }
    });

    /* =====================================================
       📥 全站遊戲端下載連結
       只替換舊遊戲端 Google Drive，其他更新包/VPN 不動
    ===================================================== */

    const latestGameDownload = "https://drive.google.com/file/d/1BzNCwbraGfVa-suQmgShKnJNjNibUNVu/view?usp=sharing";
    const oldGameDownloadIds = [
        "1xlXZ_ythiusF5bQHtUShktqWeOPySFxH",
        "1tcVl908CNaQy2sjbSfFgIOY21wiFsXtH",
        "1DrjIrPZ0EfB8vlBMGB2wy-B9XJ3c-Fir"
    ];

    document.querySelectorAll("a[href]").forEach(function (link) {
        const href = link.getAttribute("href") || "";
        if (oldGameDownloadIds.some(function (id) { return href.includes(id); })) {
            link.setAttribute("href", latestGameDownload);
        }
    });

});
