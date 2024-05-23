document.addEventListener("DOMContentLoaded", function() {

    // scroll to spotlight section when BloomByOmoyeni link is clicked

    document.getElementById("bloomLink").addEventListener("click", function(event) {
        event.preventDefault(); // Prevent the default anchor link behavior
        document.getElementById("spotlight-container").scrollIntoView(); // Scroll to the spotlight section
    });

    window.onload = function() {
        window.scrollTo(0, 0)
    }

    // set focus to the input field when modal is shown

    const myModal = document.getElementById('inputForm');
    const myInput = document.getElementById('inputEmail');

    myModal.addEventListener('shown.bs.modal', () => {
        myInput.focus()
    });

    // fetch countries form Fetch countries API

    const selectElement = document.getElementById('location');

    fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(data => {
        console.log(data);

        const sortedCountries = data.sort((a,b) => {
            const nameA = a.name.common.toUpperCase();
            const nameB = b.name.common.toUpperCase();
            return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
        });

        // clear initial loading option

        selectElement.innerHTML = '<option value="" disabled selected>Select location</option>';

        // populate select with country options
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
    })

    // handle form submission

    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new formData(event.target);
        const data = {
            email: formData.get('email'),
            company: formData.get('company'),
            industry: formData('industry'),
            interest: formData('interest'),
            location: formData('location')
        };

        fetch('/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if(response.ok) {
                alert('We will get back to you shortly');
            } else {
                alert('Error submitting form');
            }
        })
        .catch(error => {
            console.log('Error:', error);
            alert('Error submitting form');       
        })
    })
});






