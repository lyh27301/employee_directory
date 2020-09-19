const employeeCards = Array.from(document.querySelectorAll('.card'));
const employeeModalContents = Array.from(document.querySelectorAll('.modal-content'));
const employeeModalWindows = Array.from(document.querySelectorAll('.modal'));

// Fetch functions

function fetchData(url) {
    return fetch(url)
        .then(checkStatus)
        .then(response => response.json())
        .catch(err => console.log('Problem occurred!', err));
}

fetchData('https://randomuser.me/api/?results=12&nat=us,ca')
    .then(data => {
        console.log(`data in fetchData is:`);
        console.log(data);
        generateElements(data.results);
        
        // Add event listener so that when the user clicks on <span> (x), close the modal.
        const closeSigns = Array.from(document.getElementsByClassName("close"));
        closeSigns.forEach(closeSign => {
            closeSign.onclick = function(e) {
                const modal = e.target.parentElement.parentElement.parentElement;
                modal.style.display = 'none';
            }
        } );
        
        
    })

function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

// Helper Fuctions
function generateElements(data) {
    
    for (let i = 0; i < 12; i++) {
        console.log(`data[${i}] is: ${data[i]}`);
        employee = data[i];
        const card = employeeCards[i];
        const modalContent = employeeModalContents[i];
        const modalWindow = employeeModalWindows[i];
        generateCard(employee, card);
        generateModalContent(employee, modalContent);

        // Add event Listener to card so that clicks on any card can open the related modal window.
        card.onclick = function () {modalWindow.style.display = 'block'}
    }
}

function generateCard(employee, card) {
    const html = `
        <img src="${employee.picture.large}" alt="Profile photo of ${employee.name.first} ${employee.name.last}">
        <div class="card-info">
            <h2 class="name">${employee.name.first} ${employee.name.last}</h2>
            <p class="email">${employee.email}</p>
            <p class="city">${employee.location.city}</p> 
        </div>
      `;
    card.innerHTML = html;
}

function generateModalContent(employee, modalContent) {
    const html = `
        <span class="close">&times;</span>
        <img src="${employee.picture.large}" alt="Profile photo of ${employee.name.first} ${employee.name.last}">
        <h2 class="name">${employee.name.first} ${employee.name.last}</h2>
        <p class="email">${employee.email}</p>
        <p class="city">${employee.location.city}</p> 
        <hr>
        <p class="tel">${employee.email}</p>
        <p class="address">${employee.location.street.number} ${employee.location.street.name}, ${employee.location.state} ${employee.location.postcode}</p> 
        <p class="birthday">Birthday: ${parseDate(employee.dob.date)}</p> 
      `;
      modalContent.innerHTML = html;
}

function parseDate (date) {
    const birthday = date.split("T")[0];
    const arr = birthday.split("-");
    const year = arr[0];
    const month = arr[1];
    const day = arr[2];
    return `${month}/${day}/${year[2]}${year[3]}`;
}











