document.querySelector(".auth-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const res = await fetch("http://localhost:3000/auth/register", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  console.log(data);
  if (data.user) {
    alert("Sucessfully signed up");
    window.location = "/login";
  }
});
