document.addEventListener("DOMContentLoaded", function () {
  // Support Form Validation
  const supportForm = document.getElementById('supportForm');
  const supportCancelButton = document.getElementById('supportCancelButton')

  // Fetch countries from API with error handling
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
      console.error('Error fetching countries:', error);
      selectElement.innerHTML = '<option disabled>Error loading countries</option>';
    });

  supportForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    let isValid = true; // Track if form is valid

    // Validate the form using custom and Bootstrap logic
    if (!supportForm.checkValidity()) {
      isValid = false;
    }

    // Validate Email
    const emailField = document.getElementById('guestEmail');
    const emailPattern = /^(?!.*\.{2})(?!.*\.$)(?!^\.)(?!.*@\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(emailField.value)) {
      emailField.classList.add('is-invalid');
      isValid = false;
    } else {
      emailField.classList.remove('is-invalid');
    }

    // Validate Phone Number
    const phoneField = document.getElementById('guestNumber');
    const phonePattern = /^(\+?\d{1,3}[- ]?)?\d{10}$/;
    if (!phonePattern.test(phoneField.value)) {
      phoneField.classList.add('is-invalid');
      isValid = false;
    } else {
      phoneField.classList.remove('is-invalid');
    }

    if (!isValid) {
      supportForm.classList.add('was-validated');
      return; // Stop submission if the form is invalid
    }

    // If form is valid, send the form data to Formspree
    const formData = new FormData(supportForm);
    fetch('https://formspree.io/f/mrbzwnbe', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        // Set a flag in local storage to indicate successful form submission
        localStorage.setItem('formSubmitted', 'true');

        // Delay hiding the support form modal by 1 second (1000 ms)
        setTimeout(() => {
          const supportFormModal = bootstrap.Modal.getInstance(document.getElementById('supportModal'));
          supportFormModal.hide();

          // Show the thank you modal after the support form modal hides
          const thankYouModal = new bootstrap.Modal(document.getElementById('thankYouModal'));
          thankYouModal.show();
        }, 1000); // Adjust the delay time (1000 ms = 1 second) if needed

        // Reset the form after submission
        supportForm.reset();
        supportForm.classList.remove('was-validated');
      } else {
        alert('There was a problem submitting the form. Please try again.');
      }
    }).catch(error => {
      alert('There was a problem submitting the form. Please try again later.');
      console.error('Error:', error);
    });
  });

  // Event listener for cancel button to reset the form and remove validation classes
  supportCancelButton.addEventListener('click', function () {
    supportForm.reset(); // Reset the form fields
    supportForm.classList.remove('was-validated'); // Remove Bootstrap validation classes
    const inputFields = supportForm.querySelectorAll('input');
    inputFields.forEach(field => {
      field.classList.remove('is-valid', 'is-invalid'); // Remove validation feedback classes
    });
  });

  // Input Form Validation
  const inputForm = document.getElementById('inputForm');

  inputForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission
    
    let isValid = true; // Track if form is valid

    // Validate the form using custom and Bootstrap logic
    if (!inputForm.checkValidity()) {
      isValid = false;
    }

    // Validate Email
    const inputEmailField = document.getElementById('inputEmail');
    const inputEmailPattern = /^(?!.*\.{2})(?!.*\.$)(?!^\.)(?!.*@\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!inputEmailPattern.test(inputEmailField.value)) {
      inputEmailField.classList.add('is-invalid');
      isValid = false;
    } else {
      inputEmailField.classList.remove('is-invalid');
    }

    // Validate Company
    const inputCompanyField = document.getElementById('inputCompany');
    if (inputCompanyField.value.trim() === '') {
      inputCompanyField.classList.add('is-invalid');
      isValid = false;
    } else {
      inputCompanyField.classList.remove('is-invalid');
    }

    // Validate Industry
    const industryField = document.getElementById('industry');
    if (industryField.value === '') {
      industryField.classList.add('is-invalid');
      isValid = false;
    } else {
      industryField.classList.remove('is-invalid');
    }

    // Validate Interest
    const interestField = document.getElementById('interest');
    if (interestField.value === '') {
      interestField.classList.add('is-invalid');
      isValid = false;
    } else {
      interestField.classList.remove('is-invalid');
    }

    // Validate Location
    const locationField = document.getElementById('location');
    if (locationField.value === '') {
      locationField.classList.add('is-invalid');
      isValid = false;
    } else {
      locationField.classList.remove('is-invalid');
    }

    if (!isValid) {
      inputForm.classList.add('was-validated');
      return; // Stop submission if the form is invalid
    }

    // If form is valid, send the form data to Formspree
    const inputFormData = new FormData(inputForm);
    fetch('https://formspree.io/f/mrbzwnbe', {
      method: 'POST',
      body: inputFormData,
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        // Set a flag in local storage to indicate successful form submission
        localStorage.setItem('formSubmitted', 'true');

        // Delay showing a thank you modal or provide feedback
        setTimeout(() => {
          const inputFormModal = bootstrap.Modal.getInstance(document.getElementById('inputModal'));
          inputFormModal.hide(); // Hide the input modal after successful submission

          // You can show a thank you modal or a success message here
          const thankYouModal = new bootstrap.Modal(document.getElementById('thankYouModal'));
          thankYouModal.show();
        }, 1000); // Adjust the delay time if needed

        // Reset the form after submission
        inputForm.reset();
        inputForm.classList.remove('was-validated');
      } else {
        alert('There was a problem submitting the form. Please try again.');
      }
    }).catch(error => {
      alert('There was a problem submitting the form. Please try again later.');
      console.error('Error:', error);
    });
  });

  // Event listener for cancel button in input modal
  const inputCancelButton = document.getElementById('inputCancelButton');
  inputCancelButton.addEventListener('click', function () {
    inputForm.reset(); // Reset the form fields
    inputForm.classList.remove('was-validated'); // Remove Bootstrap validation classes
    const inputFields = inputForm.querySelectorAll('input, select');
    inputFields.forEach(field => {
      field.classList.remove('is-valid', 'is-invalid'); // Remove validation feedback classes
    });
  });
});
