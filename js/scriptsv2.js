const gallery = document.querySelector('#gallery');
const title = document.querySelector('title');
let employeeData = [];
let data;
// ------------------------------------------
//  FETCH FUNCTION
// ------------------------------------------

//  Pulls data via API using the entered URL
async function fetchEmployees(url) {
	const fetchResponse = await fetch(url)
        .then(response => response.json())
        .then(data => {
		    employeeData = data.results;
		    displayEmployees(employeeData);
		    employeeModal(employeeData)
	})
}
// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

// Displays employees in a gallery 
function displayEmployees(arr) {
	arr.map(employee => {
		employee = `<div class="card">
                <div class="card-img-container">
                    <img class="card-img" src="${employee.picture.medium}" alt="profile picture">
                </div>
                <div class="card-info-container">
                    <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
                    <p class="card-text">${employee.email}</p>
                    <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
                </div>
            </div>`
		gallery.insertAdjacentHTML('beforeend', employee);
	})
}
// Creates/closes modal that is displayed when an employee is clicked from initial gallery
function buildModal(employee) {
	let modal = `<div class="modal-container">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="${employee.picture.medium}" alt="profile picture">
                        <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
                        <p class="modal-text">${employee.email}</p>
                        <p class="modal-text cap">${employee.location.city}</p>
                        <hr>
                        <p class="modal-text">${employee.phone}</p>
                        <p class="modal-text">${employee.location.street.number} ${employee.location.street.name}, ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}</p>
                        <p class="modal-text">Birthday: ${employee.dob.date.slice(5,7)}/${employee.dob.date.slice(8,10)}/${employee.dob.date.slice(0,4)}</p>
                    </div>
                </div>
            </div>`;
	gallery.insertAdjacentHTML('afterend', modal);
	const closeButton = document.querySelector('.modal-close-btn');
	const modalContainer = document.querySelector('.modal-container');
	closeButton.addEventListener('click', (e) => {
		modalContainer.remove();
	})
}
// Listens for which specific employee from gallery was clicked and passes data to buildModal function display their data
function employeeModal(data) {
	const card = document.querySelectorAll('.card');
	for (let i = 0; i < data.length; i++) {
		card[i].addEventListener('click', (e) => {
			buildModal(data[i])
		})
	}
}
fetchEmployees('https://randomuser.me/api/?results=12&nat=us')