function greetUser(user) {
  let username = "";
  if (!user) {
    username = "Guest";
  } else {
    username = user;
  }

  const greetingBox = document.querySelector(".home-container");
  greetingBox.innerText = `Greetings ${username}, welcome to the web`;
}

const user = localStorage.getItem("user");
const token = localStorage.getItem("token");
if (!token || !user) {
  alert("Please log in");
  window.location("/login");
} else {
  greetUser(user);
}

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const content = document.querySelector("#post").value;
  const res = await fetch("http://localhost:3000", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content }),
  });
  const data = await res.json();
  console.log(data);
});
