document.addEventListener("DOMContentLoaded", function () {
  const profileArrow = document.querySelector("#profile-arrow");
  profileArrow.addEventListener("click", toggleProfileMenu);

  const addAddressButton = document.querySelector("#addAddress");
  addAddressButton.addEventListener("click", showNewAddressForm);
});

function toggleProfileMenu() {
  document.querySelector("#profile-menu").classList.toggle("hidden");
}

function showNewAddressForm() {
  document.querySelector("#newAddressForm").classList.remove("hidden");
}

function hideNewAddressForm() {
  document.querySelector("#newAddressForm").classList.add("hidden");
}

function showEditAddressForm(address) {
  const oldAddress = JSON.parse(address);
  console.log("oldAddress is: ", oldAddress);
  const editForm = document.querySelector("#editAddressForm");
  editForm.querySelector("input[name='addressId']").value = oldAddress.id;
  editForm.querySelector("input[name='line1']").value = oldAddress.line1;
  editForm.querySelector("input[name='city']").value = oldAddress.city;
  editForm.querySelector("input[name='postcode']").value = oldAddress.postcode;
  editForm.querySelector("input[name='country']").value = oldAddress.country;
  editForm.classList.remove("hidden");
}

function addToCart() {
  // console.log("lol");
  const button = document.getElementById("cart-button");

  button.addEventListener("click", async (_) => {
    try {
      const response = await fetch("http://localhost:1234/cart-post", {
        method: "post",
        body: {
          // Your body
        },
      });
      console.log("Completed!", response);
    } catch (err) {
      console.log("Error");
      console.error(`Error: ${err}`);
    }
  });
}
