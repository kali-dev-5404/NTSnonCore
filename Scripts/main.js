document.addEventListener("DOMContentLoaded", () => {
  const appLayout = document.getElementById("appLayout");
  const sidebarToggle = document.getElementById("sidebarToggle");
  const sidebarCollapseBtn = document.querySelector(".sidebar-collapse-btn");
  const sidebarExpandBtn = document.querySelector(".sidebar-expand-btn");
  const sidebarCloseMobile = document.getElementById("sidebarCloseMobile");

  // Flyout elements
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

  // =========================================================
  //        FLYOUT HELPERS (USED IN MULTIPLE PLACES)
  // =========================================================
  const hideFlyout = () => {
    if (!sidebarFlyout) return;
    sidebarFlyout.classList.remove("is-visible");
  };

  const scheduleHideFlyout = () => {
    clearTimeout(flyoutHideTimeout);
    // small delay so we can move mouse icon -> flyout
    flyoutHideTimeout = setTimeout(hideFlyout, 250);
  };

  const showFlyoutForItem = (linkEl) => {
    if (!sidebarFlyout || !isDesktop()) return;

    // Only when sidebar is collapsed
    if (!appLayout.classList.contains("is-sidebar-collapsed")) {
      hideFlyout();
      return;
    }

    const navItem = linkEl.closest(".nav-item");
    if (!navItem) return;

    const labelEl = navItem.querySelector(".nav-text");
    const label = labelEl ? labelEl.innerText.trim() : linkEl.innerText.trim();
    if (!label) return;

    // Header text
    flyoutTitle.textContent = label;

    // Clear old list
    flyoutList.innerHTML = "";

    const submenu = navItem.querySelector(".nav-submenu");
    if (submenu) {
      submenu.querySelectorAll(".nav-sublink").forEach((subBtn) => {
        const li = document.createElement("li");
        li.textContent = subBtn.innerText.trim();

        // Clicking flyout item triggers original submenu button
        li.addEventListener("click", (e) => {
          e.stopPropagation();
          subBtn.click();
          hideFlyout();
        });

        flyoutList.appendChild(li);
      });
      flyoutList.style.display = "block";
    } else {
      flyoutList.style.display = "none";
    }

    // Position vertically next to hovered icon
    const rect = linkEl.getBoundingClientRect();
    const centerY = rect.top + rect.height / 2;

    sidebarFlyout.style.top = `${centerY}px`;
    sidebarFlyout.style.transform = "translateY(-50%)";

    clearTimeout(flyoutHideTimeout);
    sidebarFlyout.classList.add("is-visible");
  };

  // =========================================================
  //        SIDEBAR COLLAPSE / EXPAND (DESKTOP ONLY)
  // =========================================================
  const collapseSidebar = () => {
    if (!isDesktop()) return; // no collapse on tablet/mobile
    appLayout.classList.add("is-sidebar-collapsed");
    hideFlyout();
  };

  const expandSidebar = () => {
    appLayout.classList.remove("is-sidebar-collapsed");
    hideFlyout();
  };

  // =========================================================
  //        MOBILE/TABLET SIDEBAR: HAMBURGER + X
  // =========================================================
  if (sidebarToggle) {
    sidebarToggle.addEventListener("click", () => {
      appLayout.classList.toggle("is-sidebar-open");
    });

    // Close sidebar when tapping on overlay area
    appLayout.addEventListener("click", (event) => {
      const clickedInsideSidebar = event.target.closest(".sidebar");
      const clickedToggle = event.target.closest("#sidebarToggle");

      if (
        !clickedInsideSidebar &&
        !clickedToggle &&
        appLayout.classList.contains("is-sidebar-open")
      ) {
        appLayout.classList.remove("is-sidebar-open");
      }
    });
  }

  // X button inside sidebar for mobile/tablet
  if (sidebarCloseMobile) {
    sidebarCloseMobile.addEventListener("click", (e) => {
      e.stopPropagation();
      appLayout.classList.remove("is-sidebar-open");
    });
  }

  // Collapse button (desktop)
  if (sidebarCollapseBtn) {
    sidebarCollapseBtn.addEventListener("click", () => {
      collapseSidebar();
    });
  }

  // Expand button (visible when collapsed & hovering the sidebar)
  if (sidebarExpandBtn) {
    sidebarExpandBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      expandSidebar();
    });
  }

  // Reset some states on resize
  window.addEventListener("resize", () => {
    if (!isDesktop()) {
      // On tablet/mobile: no collapsed mode
      appLayout.classList.remove("is-sidebar-collapsed");
      hideFlyout();
    } else {
      // On desktop: close mobile drawer if somehow open
      appLayout.classList.remove("is-sidebar-open");
    }
  });

  // =========================================================
  //        SUBMENU TOGGLE (DESKTOP EXPANDED ONLY)
  // =========================================================
  navToggles.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (appLayout.classList.contains("is-sidebar-collapsed")) {
        // In collapsed mode we use flyout, not inline submenu
        return;
      }

      const item = btn.closest(".nav-item");
      const isOpen = item.classList.contains("open");

      // Close other open parents
      navItems.forEach((other) => {
        if (other !== item && other.classList.contains("has-children")) {
          other.classList.remove("open");
        }
      });

      if (!isOpen) {
        item.classList.add("open");
      } else {
        item.classList.remove("open");
      }
    });
  });

  // =========================================================
  //        SECTION CHANGE + ACTIVE NAV ITEM
  // =========================================================
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const sectionId = link.dataset.section;
      if (!sectionId) return;

      // Active class on parent nav-item
      navItems.forEach((item) => item.classList.remove("active"));
      const parentItem = link.closest(".nav-item");
      if (parentItem) {
        parentItem.classList.add("active");
      }

      // Switch visible section
      sections.forEach((section) => {
        const id = section.dataset.sectionId;
        if (id === sectionId) {
          section.classList.remove("is-hidden");
        } else {
          section.classList.add("is-hidden");
        }
      });

      hideFlyout();

      // Close sidebar on mobile/tablet after clicking a link
      if (appLayout.classList.contains("is-sidebar-open") && !isDesktop()) {
        appLayout.classList.remove("is-sidebar-open");
      }
    });
  });

  // =========================================================
  //        USER DROPDOWN
  // =========================================================
  const userDropdownToggle = document.getElementById("userDropdown");
  const userDropdownMenu = userDropdownToggle
    ? userDropdownToggle.closest(".navbar-dropdown").querySelector(".dropdown-menu")
    : null;

  if (userDropdownToggle && userDropdownMenu) {
    const toggleMenu = () => {
      const isOpen = userDropdownMenu.classList.toggle("show");
      userDropdownToggle.setAttribute("aria-expanded", isOpen);
    };

    userDropdownToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Close when clicking outside
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".navbar-dropdown")) {
        if (userDropdownMenu.classList.contains("show")) {
          userDropdownMenu.classList.remove("show");
          userDropdownToggle.setAttribute("aria-expanded", "false");
        }
      }
    });

    // Close on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        if (userDropdownMenu.classList.contains("show")) {
          userDropdownMenu.classList.remove("show");
          userDropdownToggle.setAttribute("aria-expanded", "false");
        }
      }
    });
  }

  // =========================================================
  //        FLYOUT HOVER HANDLERS (DESKTOP COLLAPSED)
  // =========================================================
  const topLevelLinks = document.querySelectorAll(".nav-item > .nav-link");

  topLevelLinks.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      showFlyoutForItem(link);
    });

    link.addEventListener("mouseleave", () => {
      scheduleHideFlyout();
    });
  });

  if (sidebarFlyout) {
    sidebarFlyout.addEventListener("mouseenter", () => {
      clearTimeout(flyoutHideTimeout);
    });

    sidebarFlyout.addEventListener("mouseleave", () => {
      scheduleHideFlyout();
    });
  }
});
