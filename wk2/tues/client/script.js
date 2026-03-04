const token = localStorage.getItem("token");
const email = localStorage.getItem("email");
const container = document.querySelector("#status");

async function getData() {
  const res = await fetch("http://localhost:3000/auth", {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  console.log(data);

  container.innerText = `You are logged in ${email} here is something ${data.personal}`;
}

if (token) {
  getData();
} else {
  container.innerText = "Please log in";
}
