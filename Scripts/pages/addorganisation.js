console.log("JS loaded");
document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       FORM ELEMENTS
       ===================================================== */

    const form = document.getElementById("orgForm");

    /* =====================================================
       DROPDOWN ELEMENTS
       ===================================================== */

    const countryInput = document.getElementById("countryInput");
    const countryList = document.getElementById("countryList");
    const countryValue = document.getElementById("countryValue");

    const stateInput = document.getElementById("stateInput");
    const stateList = document.getElementById("stateList");
    const stateValue = document.getElementById("stateValue");

    const cityInput = document.getElementById("cityInput");
    const cityList = document.getElementById("cityList");
    const cityValue = document.getElementById("cityValue");

    /* =====================================================
       HELPERS
       ===================================================== */

    function enableDropdown(input) {
        input.parentElement.classList.remove("disabled");
    }

    function disableDropdown(input) {
        input.parentElement.classList.add("disabled");
        input.value = "";
    }

    function setError(field, message) {
        const wrapper = field.closest(".org-field");
        const errorBox = wrapper.querySelector(".error-msg");
        field.classList.add("error");
        errorBox.textContent = message;
    }

    function clearError(field) {
        const wrapper = field.closest(".org-field");
        const errorBox = wrapper.querySelector(".error-msg");
        field.classList.remove("error");
        errorBox.textContent = "";
    }

    /* =====================================================
       SEARCHABLE DROPDOWN CREATOR
       ===================================================== */

    function createDropdown(input, list, items, hiddenInput, onSelect) {
        list.innerHTML = "";

        items.forEach(item => {
            const div = document.createElement("div");
            div.textContent = item;

            div.addEventListener("click", () => {
                input.value = item;
                hiddenInput.value = item;
                list.style.display = "none";
                onSelect(item);
            });

            list.appendChild(div);
        });

        input.addEventListener("focus", () => {
            if (input.parentElement.classList.contains("disabled")) return;
            list.style.display = "block";
        });

        input.addEventListener("input", () => {
            const value = input.value.toLowerCase();
            [...list.children].forEach(option => {
                option.style.display = option.textContent.toLowerCase().includes(value)
                    ? "block"
                    : "none";
            });
        });

        document.addEventListener("click", e => {
            if (!input.parentElement.contains(e.target)) {
                list.style.display = "none";
            }
        });
    }

    /* =====================================================
       LOAD COUNTRIES
       ===================================================== */
    fetch("https://countriesnow.space/api/v0.1/countries")
        .then(res => res.json())
        .then(data => {
            const countries = data.data.map(c => c.country).sort();

            createDropdown(
                countryInput,
                countryList,
                countries,
                countryValue,
                country => {
                    stateInput.value = "";
                    stateValue.value = "";
                    cityInput.value = "";
                    cityValue.value = "";

                    enableDropdown(stateInput);
                    disableDropdown(cityInput);

                    loadStates(country);
                }
            );
        })
        .catch(err => {
            console.error("Country load failed", err);
        });

    /* =====================================================
       LOAD STATES
       ===================================================== */

    function loadStates(country) {
        fetch("https://countriesnow.space/api/v0.1/countries/states", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ country })
        })
            .then(res => res.json())
            .then(data => {
                const states = data?.data?.states?.map(s => s.name) || [];

                createDropdown(
                    stateInput,
                    stateList,
                    states,
                    stateValue,
                    state => {
                        cityInput.value = "";
                        cityValue.value = "";
                        enableDropdown(cityInput);
                        loadCities(country, state);
                    }
                );
            });
    }

    /* =====================================================
       LOAD CITIES
       ===================================================== */

    function loadCities(country, state) {
        fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ country, state })
        })
            .then(res => res.json())
            .then(data => {
                const cities = data?.data || [];

                createDropdown(
                    cityInput,
                    cityList,
                    cities,
                    cityValue,
                    () => { }
                );
            });
    }

    /* =====================================================
       FORM VALIDATION
       ===================================================== */

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let isValid = true;
        let firstError = null;

        const requiredFields = form.querySelectorAll("[data-required]");

        requiredFields.forEach(field => {
            clearError(field);

            if (!field.value.trim()) {
                setError(field, "This field is required");
                isValid = false;
                if (!firstError) firstError = field;
                return;
            }

            if (field.type === "email") {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(field.value.trim())) {
                    setError(field, "Enter a valid email address");
                    isValid = false;
                    if (!firstError) firstError = field;
                }
            }

            if (field.dataset.phone !== undefined) {
                if (!/^[0-9]{10}$/.test(field.value.trim())) {
                    setError(field, "Enter valid 10-digit number");
                    isValid = false;
                    if (!firstError) firstError = field;
                }
            }
        });

        if (!isValid) {
            firstError.focus();
            return;
        }

        alert("Form is valid. Ready to submit.");
        // form.submit();
    });

    /* =====================================================
       AUTO EXPAND TEXTAREA
       ===================================================== */

    document.querySelectorAll("textarea").forEach(textarea => {
        textarea.addEventListener("input", function () {
            this.style.height = "auto";
            this.style.height = this.scrollHeight + "px";
        });
    });

});
