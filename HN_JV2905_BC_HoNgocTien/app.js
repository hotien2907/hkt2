let showElement = document.querySelector(".shows_table");
let formValue = document.querySelector(".my_form");
let nameElement = document.querySelector("#name");
let emailElement = document.querySelector("#email");
let phoneElement = document.querySelector("#phone");
let addressElement = document.querySelector("#address");
let addButton = document.querySelector(".btn-add");
let btnSearch = document.querySelector("#btn_search");
let inputSearch = document.querySelector("#input_search");
console.log(nameElement, emailElement, phoneElement);

let students = [
  {
    id: 1,
    name: "binh tam",
    email: "a.@gmail.com",
    phone: 3658456,
    address: "thanh hóa",
    gender: "Nam",
  },
  {
    id: 2,
    name: "ho tien",
    email: "a.@gmail.com",
    phone: 3658456,
    address: "thanh hóa",
    gender: "Nam",
  },
  {
    id: 3,
    name: "bich quyen",
    email: "a.@gmail.com",
    phone: 3658456,
    address: "thanh hóa",
    gender: "Nữ",
  },
];

// Render danh sách sinh viên
function renderStudents() {
  let result = "";
  for (let i = 0; i < students.length; i++) {
    result += `
        <tr>
          <td>${i + 1}</td>
          <td>${students[i].name}</td>
          <td>${students[i].email}</td>
          <td>${students[i].phone}</td>
          <td>${students[i].address}</td>
          <td>${students[i].gender}</td>
          <td>
            <button data-id="${students[i].id}" class="edit">edit</button>
            <button data-id="${students[i].id}" class="delete">delete</button>
          </td>
        </tr>`;
  }
  showElement.innerHTML = result;
}

// Render danh sách sinh viên ban đầu
renderStudents();

function handleAddStudent(e) {
  e.preventDefault();
  let valueRadio = document.querySelector(".gender_choose:checked").value;
  let nameValue = nameElement.value;
  let emailValue = emailElement.value;
  let phoneValue = phoneElement.value;
  let addressValue = addressElement.value;

  if (addButton.classList.contains("update")) {
    // Sửa thông tin sinh viên đã có
    let idUpdate = addButton.getAttribute("data-id");
    for (let i = 0; i < students.length; i++) {
      if (students[i].id === +idUpdate) {
        students[i].name = nameValue;
        students[i].email = emailValue;
        students[i].phone = phoneValue;
        students[i].address = addressValue;
        students[i].gender = valueRadio;
        break;
      }
    }
    addButton.innerText = "Lưu lại";
    addButton.classList.remove("update");
    addButton.removeAttribute("data-id");
  } else {
    let newObj = {
      id: Date.now(),
      name: nameValue,
      email: emailValue,
      phone: phoneValue,
      address: addressValue,
      gender: valueRadio,
    };
    students.push(newObj);
  }
  renderStudents();
  formValue.reset();
}

// Xử lý xóa và sửa
function handleDeleteEdit(e) {
  let clicked = e.target;
  if (clicked.classList.contains("delete")) {
    let confirmDelete = confirm("Bạn muốn xóa không?");
    if (confirmDelete) {
      let idDelete = clicked.getAttribute("data-id");
      let indexDelete;
      for (let i = 0; i < students.length; i++) {
        if (students[i].id === +idDelete) {
          indexDelete = i;
          break;
        }
      }
      students.splice(indexDelete, 1);
    }
  } else if (clicked.classList.contains("edit")) {
    let idEdit = clicked.getAttribute("data-id");

    let indexEdit;
    for (let i = 0; i < students.length; i++) {
      if (students[i].id === +idEdit) {
        indexEdit = i;
        break;
      }
    }
    nameElement.value = students[indexEdit].name;
    emailElement.value = students[indexEdit].email;
    phoneElement.value = students[indexEdit].phone;
    addressElement.value = students[indexEdit].address;
    let genderCurrent = students[indexEdit].gender;
    console.log(nameElement.value);
    document.querySelector(`input[value="${genderCurrent}"]`).checked = true;

    addButton.innerText = "Update";
    addButton.classList.add("update");
    addButton.setAttribute("data-id", idEdit);
  }
  renderStudents();
}

// Xử lý tìm kiếm
function handleSearch() {
  let valueInputSearch = inputSearch.value.toLowerCase();
  let searchResults = [];

  for (let i = 0; i < students.length; i++) {
    if (students[i].name.toLowerCase().includes(valueInputSearch)) {
      searchResults.push(students[i]);
    }
  }

  let result = "";
  for (let i = 0; i < searchResults.length; i++) {
    result += `
          <tr>
            <td>${i + 1}</td>
            <td>${searchResults[i].name}</td>
            <td>${searchResults[i].email}</td>
            <td>${searchResults[i].phone}</td>
            <td>${searchResults[i].address}</td>
            <td>${searchResults[i].gender}</td>
            <td>
              <button data-id="${
                searchResults[i].id
              }" class="edit">edit</button>
              <button data-id="${
                searchResults[i].id
              }" class="delete">delete</button>
            </td>
          </tr>`;
  }

  showElement.innerHTML = result;
  inputSearch.value = "";
}

// Sắp xếp theo tên
let sort = document.querySelector(".sort_name");
function handleSort() {
  students.sort(function (a, b) {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    }
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }
    return 0;
  });
  renderStudents();
}


sort.addEventListener("click", handleSort);
btnSearch.addEventListener("click", handleSearch);
formValue.addEventListener("submit", handleAddStudent);
showElement.addEventListener("click", handleDeleteEdit);
