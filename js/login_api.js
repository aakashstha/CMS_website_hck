// For Login Admin
async function login() {
  let email = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  const login = {
    email: email,
    password: password,
  };

  try {
    const res = await axios.post("http://127.0.0.1:3000/admin/login", login);
    console.log(res);
    localStorage.setItem("token", res.data.token);
    // Redirect to admin page
    window.location.href = "http://127.0.0.1:5500/admin/course_panel.html";
  } catch (error) {
    console.log(error);
  }
}

document.getElementById("loginbtn").addEventListener("click", login);
