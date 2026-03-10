const main = document.querySelector("#main-container");
const title = document.querySelector("#title");

let user = null;

async function fetchUser() {
  console.log("Fetching user...");
  const token = localStorage.getItem("token");
  const res = await fetch("http://localhost:3000/data", {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  console.log(data.user.user);

  return data.user.user;
}

async function loginUser(email) {
  const res = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email }),
  });
  const data = await res.json();
  console.log("Saving token");

  localStorage.setItem("token", data.token);
  reRender();
}

function makeLogin() {
  title.innerText = "Login";
  const loginForm = document.createElement("form");
  loginForm.classList.add("d-flex", "flex-column", "mx-auto", "border", "p-3");
  loginForm.style.maxWidth = "20rem";
  const emailLabel = document.createElement("label");
  emailLabel.innerText = "Enter email";
  const emailInput = document.createElement("input");
  const loginButton = document.createElement("button");
  loginButton.type = "submit";
  loginButton.innerText = "Login";

  loginForm.append(emailLabel, emailInput, loginButton);

  const loginElements = loginForm.querySelectorAll("*");
  loginElements.forEach((element) => {
    element.classList.add("m-1");
  });
  main.append(loginForm);

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = emailInput.value;

    await loginUser(email);
  });
}

function greetUser(user) {
  title.innerText = `Welcome back ${user.displayName}`;
  const userCard = document.createElement("div");
  userCard.style.maxWidth = "40rem";
  const cardTitle = document.createElement("div");
  const cardBody = document.createElement("div");
  userCard.classList.add("card", "mx-auto");
  cardTitle.classList.add("card-title", "h2", "p-3");
  cardBody.classList.add("card-body");

  cardTitle.innerText = `Username: ${user.displayName}`;
  cardBody.innerText = `
  Email: ${user.email}
  Avatar: ${user.avatar}
  `;

  userCard.append(cardTitle, cardBody);

  const logout = document.createElement("button");
  logout.innerText = "Logout";
  document.querySelector("header").append(logout);
  main.append(userCard);

  logout.addEventListener("click", () => {
    localStorage.removeItem("token");
    reRender();
  });
}

async function reRender() {
  const token = localStorage.getItem("token");
  console.log("Rendering...");
  main.innerHTML = "";
  if (token) {
    user = await fetchUser();
    greetUser(user);
  } else {
    makeLogin();
  }
}
reRender();
