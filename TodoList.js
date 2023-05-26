const addUser = document.querySelector("#addUser");
const username = document.querySelector("#username");
const tableBody = document.querySelector("#records");
let userArray = [];

addUser.addEventListener("click", addUserToList);
tableBody.addEventListener("click", deleteRecord);
tableBody.addEventListener("click", editRecord);


function addUserToList() {
  const uservalue = username.value;
  if (uservalue.trim() !== '') {
    userArray.push({ name: uservalue });
    saveInfo(userArray);
    displayUsers();
    username.value = '';
  }
}

function displayUsers() {
  tableBody.innerHTML = '';

  userArray.forEach((user, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <th scope="row">${index + 1}</th>
      <td>${user.name}</td>
      <td>
        <i class="btn text-white fa fa-edit btn-info mx-2"></i>
        <i class="btn btn-danger text-white fa fa-trash" data-index="${index}"></i>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

function saveInfo(userArray) {
  const string = JSON.stringify(userArray);
  localStorage.setItem('users', string);
}

function loadInfo() {
  const string = localStorage.getItem('users');
  userArray = JSON.parse(string) || [];
  displayUsers();
}

loadInfo();

// function deleteRecord(event) {
//   if (event.target.classList.contains('fa-trash')) {
//     const index = event.target.dataset.index;
//     userArray.splice(index, 1);
//     saveInfo(userArray);
//     displayUsers();
//   }
// }

function deleteRecord(event) {
  if (event.target.classList.contains('fa-trash')) {
    event.target.parentElement.parentElement.remove();
  }

}

function editRecord(event) {
  if (event.target.classList.contains('fa-edit')) {
    const row = event.target.parentElement.parentElement;
    const nameCell = row.querySelector('td:nth-child(2)');
    const newName = prompt("Enter New Name", nameCell.textContent);
    if (newName !== null) {
      nameCell.textContent = newName;

    }
  }
}