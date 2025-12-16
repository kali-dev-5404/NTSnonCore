document.addEventListener("DOMContentLoaded", () => {
    const appLayout = document.getElementById("appLayout");
    const sidebarToggle = document.getElementById("sidebarToggle");
    const sidebarCollapseBtn = document.querySelector(".sidebar-collapse-btn");
    const sidebarExpandBtn = document.querySelector(".sidebar-expand-btn");
    const sidebarCloseMobile = document.getElementById("sidebarCloseMobile");

    /* ===============================
       Flyout elements
    =============================== */
    const sidebarFlyout = document.getElementById("sidebarFlyout");
    const flyoutTitle = document.getElementById("sidebarFlyoutTitle");
    const flyoutList = document.getElementById("sidebarFlyoutList");
    let flyoutHideTimeout;

    const navItems = document.querySelectorAll(".nav-item");
    const navToggles = document.querySelectorAll(".nav-toggle");
    const navLinks = document.querySelectorAll(
        ".nav-link[data-section], .nav-sublink[data-section]"
    );
    const sections = document.querySelectorAll(".content-section");

    const isDesktop = () => window.innerWidth > 960;

    /* ===============================
       Flyout helpers
    =============================== */
    const hideFlyout = () => {
        if (!sidebarFlyout) return;
        sidebarFlyout.classList.remove("is-visible");
    };

    const scheduleHideFlyout = () => {
        clearTimeout(flyoutHideTimeout);
        flyoutHideTimeout = setTimeout(hideFlyout, 250);
    };

    const showFlyoutForItem = (linkEl) => {
        if (!sidebarFlyout || !flyoutTitle || !flyoutList) return;
        if (!isDesktop()) return;
        if (!appLayout.classList.contains("is-sidebar-collapsed")) {
            hideFlyout();
            return;
        }

        const navItem = linkEl.closest(".nav-item");
        if (!navItem) return;

        const labelEl = navItem.querySelector(".nav-text");
        const label =
            navItem.dataset.label ||
            (labelEl ? labelEl.innerText.trim() : linkEl.innerText.trim());

        if (!label) return;

        flyoutTitle.textContent = label;
        flyoutList.innerHTML = "";

        const submenu = navItem.querySelector(".nav-submenu");

        if (submenu) {
            submenu.querySelectorAll(".nav-sublink").forEach((subBtn) => {
                const li = document.createElement("li");
                li.textContent = subBtn.innerText.trim();

                li.addEventListener("click", (e) => {
                    e.stopPropagation();

                    navItems.forEach((item) => item.classList.remove("active"));
                    navItem.classList.add("active");

                    subBtn.click();
                    hideFlyout();
                });

                flyoutList.appendChild(li);
            });
            flyoutList.style.display = "block";
        } else {
            flyoutList.style.display = "none";
        }

        const rect = linkEl.getBoundingClientRect();
        const centerY = rect.top + rect.height / 2;

        sidebarFlyout.style.top = `${centerY}px`;
        sidebarFlyout.style.left = `calc(var(--sidebar-width-collapsed) + 4px)`;
        sidebarFlyout.style.transform = "translateY(-50%)";

        clearTimeout(flyoutHideTimeout);
        sidebarFlyout.classList.add("is-visible");
    };

    /* ===============================
       Sidebar collapse / expand (desktop)
    =============================== */
    const collapseSidebar = () => {
        if (!isDesktop()) return;
        appLayout.classList.add("is-sidebar-collapsed");
        hideFlyout();
    };

    const expandSidebar = () => {
        appLayout.classList.remove("is-sidebar-collapsed");
        hideFlyout();
    };

    if (sidebarCollapseBtn) {
        sidebarCollapseBtn.addEventListener("click", collapseSidebar);
    }

    if (sidebarExpandBtn) {
        sidebarExpandBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            expandSidebar();
        });
    }

    /* ===============================
       Mobile / tablet sidebar
    =============================== */
    if (sidebarToggle) {
        sidebarToggle.addEventListener("click", () => {
            appLayout.classList.toggle("is-sidebar-open");
        });

        appLayout.addEventListener("click", (e) => {
            if (isDesktop()) return;

            const insideSidebar = e.target.closest(".sidebar");
            const toggleBtn = e.target.closest("#sidebarToggle");

            if (
                !insideSidebar &&
                !toggleBtn &&
                appLayout.classList.contains("is-sidebar-open")
            ) {
                appLayout.classList.remove("is-sidebar-open");
            }
        });
    }

    if (sidebarCloseMobile) {
        sidebarCloseMobile.addEventListener("click", (e) => {
            e.stopPropagation();
            appLayout.classList.remove("is-sidebar-open");
        });
    }

    /* ===============================
       Resize handling
    =============================== */
    window.addEventListener("resize", () => {
        if (!isDesktop()) {
            if (appLayout.classList.contains("is-sidebar-collapsed")) {
                appLayout.classList.remove("is-sidebar-collapsed");
                hideFlyout();
            }
        } else {
            if (appLayout.classList.contains("is-sidebar-open")) {
                appLayout.classList.remove("is-sidebar-open");
            }
        }
    });

    /* ===============================
       Submenu toggle (desktop expanded)
    =============================== */
    navToggles.forEach((btn) => {
        btn.addEventListener("click", () => {
            if (appLayout.classList.contains("is-sidebar-collapsed")) return;

            const item = btn.closest(".nav-item");
            const isOpen = item.classList.contains("open");

            navItems.forEach((other) => {
                if (other !== item && other.classList.contains("has-children")) {
                    other.classList.remove("open");
                }
            });

            item.classList.toggle("open", !isOpen);
        });

        btn.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                btn.click();
            }
        });
    });

    /* ===============================
       Section switching + active state
    =============================== */
    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            const sectionId = link.dataset.section;
            if (!sectionId) return;

            navItems.forEach((item) => item.classList.remove("active"));
            const parentItem = link.closest(".nav-item");
            if (parentItem) parentItem.classList.add("active");

            sections.forEach((section) => {
                section.classList.toggle(
                    "is-hidden",
                    section.dataset.sectionId !== sectionId
                );
            });

            hideFlyout();

            if (!isDesktop() && appLayout.classList.contains("is-sidebar-open")) {
                appLayout.classList.remove("is-sidebar-open");
            }
        });
    });

    /* ===============================
       User dropdown
    =============================== */
    const userDropdownToggle = document.getElementById("userDropdown");
    const userDropdownMenu = userDropdownToggle
        ? userDropdownToggle.closest(".navbar-dropdown")?.querySelector(".dropdown-menu")
        : null;

    if (userDropdownToggle && userDropdownMenu) {
        userDropdownToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            const open = userDropdownMenu.classList.toggle("show");
            userDropdownToggle.setAttribute("aria-expanded", open);
        });

        document.addEventListener("click", (e) => {
            if (!e.target.closest(".navbar-dropdown")) {
                userDropdownMenu.classList.remove("show");
                userDropdownToggle.setAttribute("aria-expanded", "false");
            }
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                userDropdownMenu.classList.remove("show");
                userDropdownToggle.setAttribute("aria-expanded", "false");
            }
        });
    }

    /* ===============================
       Flyout hover handlers
    =============================== */
    const topLevelLinks = document.querySelectorAll(".nav-item > .nav-link");

    topLevelLinks.forEach((link) => {
        link.addEventListener("mouseenter", () => showFlyoutForItem(link));
        link.addEventListener("mouseleave", scheduleHideFlyout);
    });

    if (sidebarFlyout) {
        sidebarFlyout.addEventListener("mouseenter", () => {
            clearTimeout(flyoutHideTimeout);
        });

        sidebarFlyout.addEventListener("mouseleave", scheduleHideFlyout);
    }
});
