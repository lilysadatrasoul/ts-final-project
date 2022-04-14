var formElement = document.querySelector("form");
var tbodyElement = document.querySelector("tbody");
var tableElement = document.querySelector("table");
var Name = document.getElementById("name");
var City = document.getElementById("city");
var Country = document.getElementById("country");
var Age = document.getElementById("age");
var prePage = document.getElementById("previous");
var nexPage = document.getElementById("next");
var data = [];
var rowNumber = 0;
var pageNumber = 0;
function addingProfile(e) {
    e.preventDefault();
    var person = {
        name: Name.value,
        city: City.value,
        country: Country.value,
        age: Age.value
    };
    data.push(person);
    if (rowNumber && (rowNumber % 10) == 0) {
        pageNumber += 1;
        tbodyElement.innerHTML = "";
    }
    rowNumber += 1;
    addRow(person);
    handleArrowVisibility();
}
function handleArrowVisibility() {
    if (pageNumber == 0) {
        prePage.classList.remove("active");
        prePage.classList.add("disabled");
        if ((data.length / 10) > 1) {
            nexPage.classList.remove("disabled");
            nexPage.classList.add("active");
        }
        else {
            nexPage.classList.remove("active");
            nexPage.classList.add("disabled");
        }
    }
    else {
        prePage.classList.add("active");
        prePage.classList.remove("disabled");
        if (parseInt(data.length / 10) > pageNumber) {
            nexPage.classList.add("active");
            nexPage.classList.remove("disabled");
        }
        else {
            nexPage.classList.remove("active");
            nexPage.classList.add("disabled");
        }
    }
}
function preClick() {
    pageNumber -= 1;
    tbodyElement.innerHTML = "";
    console.log(pageNumber);
    var startIndex = pageNumber * 10;
    rowNumber = startIndex;
    for (var i = startIndex; i < startIndex + 10; i++) {
        if (i >= 0) {
            rowNumber += 1;
            addRow(data[i]);
        }
    }
    handleArrowVisibility();
}
function nexClick() {
    pageNumber += 1;
    tbodyElement.innerHTML = "";
    var startIndex = pageNumber * 10;
    rowNumber = startIndex;
    for (var i = startIndex; i < startIndex + 10; i++) {
        if (i < data.length) {
            rowNumber += 1;
            addRow(data[i]);
        }
    }
    handleArrowVisibility();
}
function addRow(r) {
    tbodyElement.innerHTML += "\n      <tr>\n      <td style=\"width:5%\"> ".concat(rowNumber, " </td>\n      <td style=\"width:20%\">").concat(r.name, " </td>\n      <td style=\"width:15%\"> ").concat(r.city, " </td>\n      <td style=\"width:15%\"> ").concat(r.country, " </td>\n      <td style=\"width:8%\"> ").concat(r.age, " </td>\n      <td  style=\"width:3%\"><button class=\"DeleteBtn\" style=\"border:none\">\u062D\u0630\u0641</button></td>\n      <td  style=\"width:3%\"><button class=\"EditBtn\" style=\"border:none\" >\u0648\u06CC\u0631\u0627\u06CC\u0634</button></td>\n      </tr>  \n  ");
}
function deleteRow(e) {
    if (!e.target.classList.contains("DeleteBtn")) {
        return;
    }
    e.target.closest("tr").remove();
}
function editRow(e) {
    if (!e.target.classList.contains("EditBtn")) {
        return;
    }
    else if (e.target.textContent === "ویرایش") {
        Name.value = e.target.closest("tr").children[1].innerHTML;
        City.value = e.target.closest("tr").children[2].innerHTML;
        Country.value = e.target.closest("tr").children[3].innerHTML;
        Age.value = e.target.closest("tr").children[4].innerHTML;
        e.target.textContent = "ذخیره";
    }
    else if (e.target.textContent === "ذخیره") {
        e.target.closest("tr").children[1].innerHTML = Name.value;
        e.target.closest("tr").children[2].innerHTML = City.value;
        e.target.closest("tr").children[3].innerHTML = Country.value;
        e.target.closest("tr").children[4].innerHTML = Age.value;
        e.target.textContent = "ویرایش";
    }
}
formElement.addEventListener("submit", addingProfile);
tableElement.addEventListener("click", deleteRow);
tableElement.addEventListener("click", editRow);
prePage.addEventListener("click", preClick);
nexPage.addEventListener("click", nexClick);
