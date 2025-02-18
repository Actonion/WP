document
  .getElementById("signupForm")
  ?.addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;
    localStorage.setItem(username, JSON.stringify({ email, phone, password }));
    alert("Sign-up successful!");
    window.location.href = "login.html";
  });

document
  .getElementById("loginForm")
  ?.addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;
    const storedUser = JSON.parse(localStorage.getItem(username));
    if (storedUser && storedUser.password === password) {
      alert("Login successful!");
      sessionStorage.setItem("loggedInUser", username);
      window.location.href = "index.html";
    } else {
      alert("Invalid username or password!");
    }
  });

document
  .getElementById("listForm")
  ?.addEventListener("submit", function (event) {
    event.preventDefault();
    const itemName = document.getElementById("itemName").value;
    const itemDescription = document.getElementById("itemDescription").value;
    const ownerUsername = sessionStorage.getItem("loggedInUser");
    if (!ownerUsername) {
      alert("You must be logged in to list an item.");
      return;
    }
    localStorage.setItem(
      itemName,
      JSON.stringify({ itemDescription, ownerUsername })
    );
    alert("Item listed successfully!");
  });

document.addEventListener("DOMContentLoaded", function () {
  const itemsList = document.getElementById("itemsList");
  if (itemsList) {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key !== "loggedInUser") {
        const item = JSON.parse(localStorage.getItem(key));
        const div = document.createElement("div");
        div.innerHTML = `<strong>${key}</strong>: ${item.itemDescription} (Owner: ${item.ownerUsername})`;
        itemsList.appendChild(div);
      }
    }
  }
});
