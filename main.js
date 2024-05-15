document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("bloomLink").addEventListener("click", function(event) {
        event.preventDefault(); // Prevent the default anchor link behavior
        document.getElementById("spotlight").scrollIntoView(); // Scroll to the spotlight section
    });
});