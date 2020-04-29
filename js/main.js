// Define HTML elements
let ordersList = document.getElementById("ordersList");
let userEmail = document.getElementById("userEmail");
let userEmailDelete = document.getElementById("userEmailDelete");
let userOrder = document.getElementById("userOrder");
let enterButton = document.getElementById("enterButton");
let deleteButton = document.getElementById("deleteButton");
let submission = document.getElementById("submission");
let request = new XMLHttpRequest();

// Print out existing orders
request.onload = function (result) {
  console.log(this);
  let orders = Object.values(JSON.parse(this.responseText));
  let order = orders.map((order) => {
    return `<li class="list-group-item">
                <div class="row">
                    <div class="col-10">
                        <p>${order.emailAddress} ordered a ${order.coffee}</p>
                    </div>
                    <div class="col-2">
                        <button
                        type="submit"
                        id="deleteButton"
                        class="btn btn-outline-danger btn-sm float-right"
                        onclick="submission"
                        >
                        Delete
                        </button>
                    </div>
                </div>
            </li>`;
  });
  ordersList.innerHTML = order.join("");
};

// Prevent empty form sumbission

// Send new orders
enterButton.addEventListener("click", function () {
  let newOrderEmail = userEmail.value;
  let newOrderCoffee = userOrder.value;
  let order = {
    emailAddress: newOrderEmail,
    coffee: newOrderCoffee,
  };
  console.log(order);
  console.log("order submitted");
  let postRequest = new XMLHttpRequest();
  postRequest.open(
    "POST",
    "https://dc-coffeerun.herokuapp.com/api/coffeeorders/"
  );
  postRequest.setRequestHeader("Content-type", "application/json");
  postRequest.send(JSON.stringify(order));
  postRequest.onload = function () {
    let newOrder = JSON.parse(this.responseText);
    ordersList.innerHTML += `<li>
                    <label>${newOrder.emailAddress}</label>
                    <label>${newOrder.coffee}</label>
                </li>`;
  };
});

// Delete existing orders
deleteButton.addEventListener("click", function () {
  let deleteOrder = new XMLHttpRequest();
  deleteOrder.onload = function () {
    console.log(this.responseText);
  };
  deleteOrder.open(
    "DELETE",
    `https://dc-coffeerun.herokuapp.com/api/coffeeorders/${userEmailDelete.value}`
  );
  deleteOrder.setRequestHeader("Content-Type", "application/json");
  deleteOrder.send();
  setTimeout(function () {
    window.location.reload();
  }, 10);
});

// API Calls
request.open("GET", "https://dc-coffeerun.herokuapp.com/api/coffeeorders/");
request.send();
