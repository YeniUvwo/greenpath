document.addEventListener("DOMContentLoaded", function() {
    // Scroll to spotlight section when BloomByOmoyeni link is clicked
    document.getElementById("bloomLink").addEventListener("click", function(event) {
        event.preventDefault(); // Prevent the default anchor link behavior
        document.getElementById("spotlight-container").scrollIntoView(); // Scroll to the spotlight section
    });

    window.onload = function() {
        window.scrollTo(0, 0);
    };

    // Set focus to the input field when modal is shown
    const inputModal = document.getElementById('inputForm');
    const inputEmail = document.getElementById('inputEmail');

    inputModal.addEventListener('shown.bs.modal', () => {
        inputEmail.focus();
    });

    // Fetch countries from Fetch countries API
    const selectElement = document.getElementById('location');

    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
            const sortedCountries = data.sort((a, b) => {
                const nameA = a.name.common.toUpperCase();
                const nameB = b.name.common.toUpperCase();
                return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
            });

            // Clear initial loading option
            selectElement.innerHTML = '<option value="" disabled selected>Select location</option>';

            // Populate select with country options
            sortedCountries.forEach(country => {
                const option = document.createElement('option');
                option.value = country.cca2;
                option.textContent = country.name.common;
                selectElement.appendChild(option);
            });
        })
        .catch(error => {
            console.log('Error fetching countries:', error);
            selectElement.innerHTML = '<option value="" disabled selected>Error loading</option>';
        });

    // Handle form submission for support form
    document.getElementById('supportForm').addEventListener('submit', function(event) {
        event.preventDefault();

        let valid = true;

        // Clear previous error messages
        document.querySelectorAll('.error-message').forEach(error => error.style.display = 'none');

        // Validate Name/Company
        const guestName = document.getElementById('nameCompany').value.trim();
        if (!guestName) {
            document.getElementById('nameError').style.display = 'block';
            valid = false;
        }

        // Validate Email
        const email = document.getElementById('guestEmail').value.trim();
        const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        if (!email || !emailPattern.test(email)) {
            document.getElementById('emailError').style.display = 'block';
            valid = false;
        }

        // Validate Phone Number
        const phone = document.getElementById('guestNumber').value.trim();
        if (!phone) {
            document.getElementById('phoneError').style.display = 'block';
            valid = false;
        }

        // Validate Message
        const message = document.getElementById('floatingTextarea').value.trim();
        if (!message) {
            document.getElementById('messageError').style.display = 'block';
            valid = false;
        }

        if (valid) {
            // Form is valid, submit the form
            const form = event.target;
            const formData = new FormData(form);

            fetch(form.action, {
                method: form.method,
                body: formData,
            })
                .then(response => response.text())
                .then(result => {
                    if (result.includes("Thank you! Your message has been sent.")) {
                        document.getElementById('formError').style.display = 'none';
                        document.getElementById('successMessage').style.display = 'block';
                        // Close the modal only if the form submission is successful
                        var modal = bootstrap.Modal.getInstance(document.getElementById('supportForm'));
                        modal.hide();
                    } else {
                        document.getElementById('formError').style.display = 'block';
                        document.getElementById('successMessage').style.display = 'none';
                    }
                })
                .catch(error => {
                    document.getElementById('formError').style.display = 'block';
                    document.getElementById('successMessage').style.display = 'none';
                });
        } else {
            // Display a general form error message
            document.getElementById('formError').style.display = 'block';
        }
    });

    // Handle form submission for input form
    document.getElementById('inputForm').addEventListener('submit', function(event) {
        event.preventDefault();

        let valid = true;

        // Clear previous error messages
        document.querySelectorAll('.error-message').forEach(error => error.style.display = 'none');

        // Validate Email
        const email = document.getElementById('inputEmail').value.trim();
        const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        if (!email || !emailPattern.test(email)) {
            document.getElementById('inputEmailError').style.display = 'block'; // Ensure ID is 'inputEmailError'
            valid = false;
        }

        // Validate Company
        const company = document.getElementById('inputCompany').value.trim();
        if (!company) {
            document.getElementById('companyError').style.display = 'block';
            valid = false;
        }

        // Validate Industry
        const industry = document.getElementById('industry').value;
        if (!industry) {
            document.getElementById('industryError').style.display = 'block';
            valid = false;
        }

        // Validate Interest
        const interest = document.getElementById('interest').value;
        if (!interest) {
            document.getElementById('interestError').style.display = 'block';
            valid = false;
        }

        // Validate Location
        const location = document.getElementById('location').value;
        if (!location) {
            document.getElementById('locationError').style.display = 'block';
            valid = false;
        }

        if (valid) {
            // Form is valid, submit the form
            const form = event.target;
            const formData = new FormData(form);

            fetch(form.action, {
                method: form.method,
                body: formData,
            })
                .then(response => response.text())
                .then(result => {
                    if (result.includes("Thank you! Your message has been sent.")) {
                        document.getElementById('formError').style.display = 'none';
                        document.getElementById('successMessage').style.display = 'block';
                        // Close the modal only if the form submission is successful
                        var modal = bootstrap.Modal.getInstance(document.getElementById('inputForm'));
                        modal.hide();
                    } else {
                        document.getElementById('formError').style.display = 'block';
                        document.getElementById('successMessage').style.display = 'none';
                    }
                })
                .catch(error => {
                    document.getElementById('formError').style.display = 'block';
                    document.getElementById('successMessage').style.display = 'none';
                });
        } else {
            // Display a general form error message
            document.getElementById('formError').style.display = 'block';
        }
    });

    // Clear error messages and form fields when modal is hidden
    const modals = [document.getElementById('inputForm'), document.getElementById('supportForm')];
    modals.forEach(modal => {
        modal.addEventListener('hidden.bs.modal', function() {
            document.querySelectorAll('.error-message').forEach(error => error.style.display = 'none');
            document.querySelectorAll('.form-control').forEach(input => input.value = '');
            document.querySelectorAll('.form-select').forEach(select => select.selectedIndex = 0);
            document.getElementById('formError').style.display = 'none';
            document.getElementById('successMessage').style.display = 'none';
        });
    });
});
