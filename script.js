
let appointments = [];

let form = document.getElementById("appointmentForm");
let message = document.getElementById("message");
let list = document.getElementById("appointmentList");


let dateInput = document.getElementById("date");

let today = new Date();
let localDate = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
).toISOString().split("T")[0];

dateInput.min = localDate;


form.addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let age = document.getElementById("age").value;
    let phone = document.getElementById("phone").value;
    let doctor = document.getElementById("doctor").value;
    let date = dateInput.value;

    if (!name || !age || !phone || !doctor || !date) {
        message.textContent = "Please fill in all fields.";
        return;
    }

    if (date < localDate) {
        message.textContent = "Please select a future date.";
        return;
    }

    let appointment = {
        id: Date.now(),
        name: name,
        age: age,
        phone: phone,
        doctor: doctor,
        date: date
    };

    appointments.push(appointment);

    displayAppointments();

    message.textContent = "Appointment booked successfully!";

    form.reset();
    dateInput.min = localDate;
});


function displayAppointments() {
    list.innerHTML = "";

    appointments.forEach(function(item) {
        let card = document.createElement("div");
        card.className = "appointment-card";

        let details = document.createElement("p");
        details.textContent =
            "Patient: " + item.name +
            " | Age: " + item.age +
            " | Phone: " + item.phone +
            " | Doctor: " + item.doctor +
            " | Date: " + item.date;

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Cancel Appointment";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", function() {
            appointments = appointments.filter(function(appointment) {
                return appointment.id !== item.id;
            });

            displayAppointments();
            message.textContent = "Appointment cancelled.";
        });

        card.appendChild(details);
        card.appendChild(deleteButton);

        list.appendChild(card);
    });
}
