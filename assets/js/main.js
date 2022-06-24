// var isEditable = false;
document.addEventListener("DOMContentLoaded", function () {
  const profileArrow = document.querySelector("#profile-arrow");
  profileArrow.addEventListener("click", toggleProfileMenu);
});

function toggleProfileMenu() {
  document.querySelector("#profile-menu").classList.toggle("hidden");
}

function toggleEdit() {
  tagArray = ["name", "ppic", "address"];
  for (const tag of tagArray) {
    inputBox = document.querySelector(`#${tag}`);
    inputBox.removeAttribute("disabled");
  }
  editDivClasser = document.getElementById("edit-section").classList;
  cancelClasser = document.getElementById("cancel-btn").classList;
  editDivClasser.remove("justify-center");
  editDivClasser.add("justify-between");
  cancelClasser.remove("hidden");
}

function closeEdit() {
  tagArray = ["name", "ppic", "address"];
  for (const tag of tagArray) {
    inputBox = document.getElementById(tag);
    inputBox.setAttribute("disabled", "disabled");
  }
  editDivClasser = document.getElementById("edit-section").classList;
  cancelClasser = document.getElementById("cancel-btn").classList;
  editDivClasser.add("justify-center");
  editDivClasser.remove("justify-between");
  cancelClasser.add("hidden");
}
