/* =========================
   Organisation table JS
   ========================= */

document.addEventListener("DOMContentLoaded", () => {
    setupKebabMenu();
    setupTableSearch();
    setupPagination();
    setupCsvActions();
});

/* =========================
   Kebab menu (FIXED)
   ========================= */

function setupKebabMenu() {
    const menu = document.getElementById("globalKebabMenu");

    document.addEventListener("click", (e) => {
        const kebabBtn = e.target.closest(".kebab-btn");

        if (!kebabBtn) {
            menu.style.display = "none";
            return;
        }

        e.stopPropagation();

        const rect = kebabBtn.getBoundingClientRect();

        menu.style.display = "block";
        menu.style.top = rect.bottom + window.scrollY + 6 + "px";
        menu.style.left = rect.right + window.scrollX - menu.offsetWidth + "px";
    });

    window.addEventListener("scroll", () => {
        menu.style.display = "none";
    });
}

/* =========================
   Table search
   ========================= */

function setupTableSearch() {
    const input = document.getElementById("tableSearch");
    const rows = document.querySelectorAll(".data-table tbody tr");

    input.addEventListener("input", () => {
        const value = input.value.toLowerCase();

        rows.forEach(row => {
            row.style.display = row.innerText.toLowerCase().includes(value)
                ? ""
                : "none";
        });
    });
}

/* =========================
   Pagination + Page size
   ========================= */

function setupPagination() {
    const tbody = document.querySelector(".data-table tbody");
    const rows = Array.from(tbody.querySelectorAll("tr"));
    const pageSizeSelect = document.getElementById("pageSizeSelect");
    const pagination = document.querySelector(".pagination");

    let currentPage = 1;
    let pageSize = parseInt(pageSizeSelect.value);

    function render() {
        const start = (currentPage - 1) * pageSize;
        const end = start + pageSize;

        rows.forEach((row, index) => {
            row.style.display = index >= start && index < end ? "" : "none";
        });

        renderPagination();
    }

    function renderPagination() {
        pagination.innerHTML = "";

        const totalPages = Math.ceil(rows.length / pageSize);

        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement("button");
            btn.textContent = i;
            btn.classList.toggle("active", i === currentPage);

            btn.onclick = () => {
                currentPage = i;
                render();
            };

            pagination.appendChild(btn);
        }
    }

    pageSizeSelect.addEventListener("change", () => {
        pageSize = parseInt(pageSizeSelect.value);
        currentPage = 1;
        render();
    });

    render();
}

/* =========================
   CSV actions
   ========================= */

function setupCsvActions() {
    const table = document.querySelector(".data-table");

    document.querySelector(".fa-download").parentElement.onclick = () => exportCsv(true);
    document.querySelector(".fa-file-export").parentElement.onclick = () => exportCsv(false);
    document.querySelector(".fa-upload").parentElement.onclick = uploadCsv;

    function exportCsv(onlyVisible) {
        const rows = table.querySelectorAll("tr");
        let csv = [];

        rows.forEach(row => {
            if (onlyVisible && row.style.display === "none") return;

            const cols = row.querySelectorAll("th, td");
            csv.push(
                Array.from(cols).map(c => `"${c.innerText}"`).join(",")
            );
        });

        const blob = new Blob([csv.join("\n")], { type: "text/csv" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "organisation.csv";
        a.click();
    }

    function uploadCsv() {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".csv";

        input.onchange = () => {
            const reader = new FileReader();
            reader.onload = () => {
                console.log(reader.result);
                alert("CSV loaded. Backend integration next.");
            };
            reader.readAsText(input.files[0]);
        };

        input.click();
    }
}
