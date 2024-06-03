// select elements
var siteName = document.getElementById("siteName");
var siteLink = document.getElementById("siteLink");
var tableContent = document.getElementById("tableContent");
var subBtn = document.getElementById("subBtn");

// sit list
var sitList;
if (localStorage.getItem("list") == null) {
  sitList = [];
} else {
  sitList = JSON.parse(localStorage.getItem("list"));
  display(sitList);
}

subBtn.onclick = function () {
  addBookMark();
};

// add function
function addBookMark() {
  if (validation(siteName) && validation(siteLink)) {
    var sitObj = {
      sName: siteName.value,
      sLink: siteLink.value,
    };

    sitList.push(sitObj);
    localStorage.setItem("list", JSON.stringify(sitList));
    clearFun();
    display(sitList);
  } else {
    var validationModal = new bootstrap.Modal(
      document.getElementById("valid"),
      {
        keyboard: false,
      }
    );
    validationModal.show();
  }
}

// clear function
function clearFun() {
  siteName.value = null;
  siteLink.value = null;
}

// display function
function display(list) {
  var box = "";

  for (var i = 0; i < list.length; i++) {
    var originalIndex = sitList.indexOf(list[i]);
    box += `<tr>
    <td>${i + 1}</td>
    <td>${list[i].sName}</td>
    <td>
        <button class="btn btn-visit" onclick="visitSite('${list[i].sLink}')">
            <i class="fa-solid fa-eye pe-2"></i>Visit
        </button>
    </td>
    <td>
        <button class="btn btn-update" onclick="editForUpdate(${originalIndex})">
            <i class="fa-solid fa-pen pe-2"></i>Update
        </button>
    </td>
    <td>
        <button class="btn btn-delete pe-2" onclick="deleteFun(${originalIndex})">
            <i class="fa-solid fa-trash-can"></i>
            Delete
        </button>
    </td>
</tr>`;
  }

  tableContent.innerHTML = box;
}

// delete function
function deleteFun(index) {
  sitList.splice(index, 1);
  localStorage.setItem("list", JSON.stringify(sitList));
  display(sitList);
}

// update function
var globalIndex;

function editForUpdate(index) {
  globalIndex = index;
  btnUpdate.classList.remove("d-none");
  subBtn.classList.add("d-none");
  siteName.value = sitList[index].sName;
  siteLink.value = sitList[index].sLink;
}

btnUpdate.onclick = function () {
  updateFun();
};

function updateFun() {
  if (validation(siteName) && validation(siteLink)) {
    subBtn.classList.remove("d-none");
    btnUpdate.classList.add("d-none");
    sitList[globalIndex].sName = siteName.value;
    sitList[globalIndex].sLink = siteLink.value;
    localStorage.setItem("list", JSON.stringify(sitList));
    display(sitList);
    clearFun();
  } else {
    var validationModal = new bootstrap.Modal(
      document.getElementById("valid"),
      {
        keyboard: false,
      }
    );
    validationModal.show();
  }
}

// search function
searchByName.oninput = function () {
  searchFun();
};

function searchFun() {
  var term = searchByName.value.trim().toLowerCase();
  var searchedArr = [];
  for (var i = 0; i < sitList.length; i++) {
    if (sitList[i].sName.trim().toLowerCase().includes(term) == true) {
      searchedArr.push(sitList[i]);
    }
  }
  display(searchedArr);
}

// validation
function validation(ele) {
  var regEx = {
    siteName: /^\w{3,}(\s+\w+)*$/,
    siteLink:
      /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)$/,
  };

  if (regEx[ele.id].test(ele.value)) {
    ele.classList.add("is-valid");
    ele.classList.remove("is-invalid");
    return true;
  } else {
    ele.classList.remove("is-valid");
    ele.classList.add("is-invalid");
    return false;
  }
}

// visit function
function visitSite(link) {
  // Check if the link starts with http or https. If not, add https.
  if (!link.startsWith("http://") && !link.startsWith("https://")) {
    link = "https://" + link;
  }
  window.open(link, "_blank");
}
