const formElement = document.querySelector("form")
const tbodyElement = document.querySelector("tbody")
const tableElement = document.querySelector(`table`)

let Name =document.getElementById(`name`) as HTMLInputElement
let City=document.getElementById(`city`) as HTMLInputElement
let Country= document.getElementById(`country`) as HTMLInputElement
let Age=document.getElementById(`age`) as HTMLInputElement

let prePage = document.getElementById(`previous`)
let nexPage = document.getElementById(`next`)

let data:string|number[] = []
let rowNumber = 0
let pageNumber = 0

function addingProfile(e) {
  e.preventDefault();

  let person:{
      name:string;
      city:string;
      country:string;
      age:string
  } = {
    name: Name.value ,
    city: City.value,
    country:Country.value,
    age: Age.value
  };

  data.push(
    person
  );

  if (rowNumber && (rowNumber % 10) == 0) {
    pageNumber += 1;
    tbodyElement.innerHTML = ``;
  }


  rowNumber += 1;

  addRow(person);
  
  handleArrowVisibility();
}

function handleArrowVisibility()
{
    if(pageNumber == 0){
      prePage.classList.remove("active");
      prePage.classList.add("disabled");

      if((data.length / 10) > 1){
        nexPage.classList.remove("disabled");
        nexPage.classList.add("active");
      }
      else
      {
        nexPage.classList.remove("active");
        nexPage.classList.add("disabled");
      }
    }
    else {    
      prePage.classList.add("active");
      prePage.classList.remove("disabled");

     

      if(parseInt(data.length / 10) > pageNumber){
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

  tbodyElement.innerHTML = ``

  console.log(pageNumber);
  let startIndex = pageNumber  * 10;

  rowNumber = startIndex;

  for (let i = startIndex; i < startIndex + 10; i++) {
    if (i >= 0) {
      rowNumber += 1;
      addRow(data[i]);
    }
  }

  handleArrowVisibility();
}

function nexClick() {
  pageNumber += 1;
  tbodyElement.innerHTML = ``;
  let startIndex = pageNumber * 10;

  rowNumber = startIndex;

  for (let i = startIndex; i < startIndex + 10; i++) {
    if (i < data.length) {
      rowNumber += 1;
      addRow(data[i]);
    }
  }

  handleArrowVisibility();
}



function addRow(r) {
  tbodyElement.innerHTML += `
      <tr>
      <td style="width:5%"> ${rowNumber} </td>
      <td style="width:20%">${r.name} </td>
      <td style="width:15%"> ${r.city} </td>
      <td style="width:15%"> ${r.country} </td>
      <td style="width:8%"> ${r.age} </td>
      <td  style="width:3%"><button class="DeleteBtn" style="border:none">حذف</button></td>
      <td  style="width:3%"><button class="EditBtn" style="border:none" >ویرایش</button></td>
      </tr>  
  `;
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
  } else if (e.target.textContent === "ویرایش") {
    Name.value = e.target.closest("tr").children[1].innerHTML;
    City.value = e.target.closest("tr").children[2].innerHTML;
    Country.value = e.target.closest("tr").children[3].innerHTML;
    Age.value = e.target.closest("tr").children[4].innerHTML;
    e.target.textContent = "ذخیره";
  } else if (e.target.textContent === "ذخیره") {
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