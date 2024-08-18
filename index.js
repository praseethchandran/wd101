document.addEventListener('DOMContentLoaded', function () {
    const dobInput = document.getElementById('dob');
    const today = new Date();
    const minAge = 18;
    const maxAge = 55;
    const minDate = new Date(today.getFullYear() - maxAge, today.getMonth(), today.getDate());
    const maxDate = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());

    dobInput.setAttribute('min', minDate.toISOString().split('T')[0]);
    dobInput.setAttribute('max', maxDate.toISOString().split('T')[0]);

    if (localStorage.getItem('registrationData')) {
        const savedData = JSON.parse(localStorage.getItem('registrationData'));
        populateTable(savedData);
    }

    document.getElementById('registrationForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const dob = document.getElementById('dob').value;
        const acceptTerms = document.getElementById('acceptTerms').checked ? "Yes" : "No";

        const formData = { name, email, password, dob, acceptTerms };

        let storedData = JSON.parse(localStorage.getItem('registrationData')) || [];
        storedData.push(formData);
        localStorage.setItem('registrationData', JSON.stringify(storedData));

        populateTable(storedData);

        document.getElementById('registrationForm').reset();
    });
    function populateTable(data) {
        const tableBody = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
        tableBody.innerHTML = '';
        data.forEach(entry => {
            const newRow = tableBody.insertRow();
            newRow.insertCell(0).textContent = entry.name;
            newRow.insertCell(1).textContent = entry.email;
            newRow.insertCell(2).textContent = entry.password;
            newRow.insertCell(3).textContent = entry.dob;
            newRow.insertCell(4).textContent = entry.acceptTerms;
        });
    }
});
