/*LOGIN*/

/*********************************************************CONSTANTES/VARIABLES*************************************************************/
let URLorigin = window.location.origin,
  UrlCook = URLorigin + "/api/",
  Urlsession = URLorigin + "/api/sessions/session",
  UrlForgot = URLorigin + "/api/sessions/forgot",
  UrlRecover= URLorigin + "/api/sessions/recover",
  UrlLogin = URLorigin + "/api/sessions/login";

const form = document.querySelector("form"),
  Login = document.querySelector(".btnLogin"),
  inputUser = document.getElementById("user"),
  inputPassword = document.getElementById("password"),
  inputPasswordRep = document.getElementById("passwordRep"),
  btnViewPsw = document.getElementById("btnTogglePsw"),
  btnViewPswRep = document.getElementById("btnTogglePswRep");

const psw1 = document.querySelector(".forgot__psw"),
  psw2 = document.querySelector(".forgot__psw2");

psw1.classList.remove("hidden"); //UNLOCK PASSWORD UNTIL IMPLEMENT VALIDATION
psw2.classList.remove("hidden"); //UNLOCK PASSWORD2 UNTIL IMPLEMENT VALIDATION

/*****************************************************************CLASES*************************************************************/
class RecoveryUser {
  constructor() {
    this.email = inputUser.value;
    this.password = inputPassword.value;
  }
}

/*********************************************************FUNCIONES*************************************************************/
async function VerificateRecovery() {
  try {
    const userRecover = await getDataCookie("getRecoveryUser");
    if (userRecover) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Recovery Request Accepted",
        text: "Please enter your new password",
        showConfirmButton: true,
      });
      inputUser.value = userRecover;
    } else {
      setTimeout(() => {
        window.location.href = "../login";
      }, 2000),
        Swal.fire({
          position: "center",
          icon: "info",
          title: "Expired or Invalid Recovery Request",
          text: "Redirect to Login...",
          showConfirmButton: false,
          allowOutsideClick: false,
        });
    }
  } catch (error) {
    console.log(error);
  }
}

async function sendRecover(data) {
  try {
    let response = await fetch(UrlRecover, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      mode: "cors",
      body: JSON.stringify(data),
    });
    const dataRes = await response.json();
    return { status: response.status, recoveryData: dataRes };
  } catch {
    console.log(Error);
  }
}

async function startSession(user) {
  try {
    let response = await fetch(UrlLogin, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      mode: "cors",
      body: JSON.stringify(user),
    });
    const dataRes = await response.json();
    return { status: response.status, sessionData: dataRes };
  } catch {
    console.log(Error);
  }
}

/*********************************************************EVENTOS*************************************************************/

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (inputPassword.value === inputPasswordRep.value) {
    const recoveryValues = new RecoveryUser();
    const { status, recoveryData } = await sendRecover(recoveryValues);
    if (status === 200) {
      const { sessionData } = await startSession(recoveryValues);
      const userSession = sessionData.session;
      sessionStorage.setItem(
        "userSession",
        JSON.stringify({ msj: sessionData.success, role: userSession.role })
      );
      delDataCookie({name:"RecoveryUser"});
      setTimeout(() => {
        window.location.href = "../products";
      },3000),
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Recovery Password Success!!!" ,
          text: "Logging in...",
          showConfirmButton: false,
          allowOutsideClick: false,
        });
    } else if (status === 404 || 401) {
      Swal.fire({
        title: recoveryData.error,
        text: "Your credentials entered are incorrect",
        icon: "error",
        showDenyButton: true,
        confirmButtonText: "Try again",
        denyButtonText: "Sign up",
      }).then((result) => {
        if (result.isConfirmed) {
          form.reset();
          inputUser.value = recoveryValues.email;
        } else if (result.isDenied) {
          window.location.href = "../signup";
        }
      });
    }
  } else {
    Swal.fire({
      title: "Passwords do not match!",
      text: "Check your passwords please",
      icon: "error",
      confirmButtonText: "Accept",
    });
  }
});

async function getDataCookie(name) {
  try {
    let response = await fetch(UrlCook + name, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      mode: "cors",
    });
    if (response.status == 400) {
      console.warn("Client authorization expired or invalid");
      return;
    } else if (response.status == 200) {
      return response.json();
    }
  } catch {
    console.log(Error);
  }
}

async function delDataCookie(name) {
    try {
      await fetch(UrlCook + "delCookie", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        mode: "cors",
        body: JSON.stringify(name),
      });
    } catch {
      console.log(Error);
    }
  }

Login.addEventListener("click", async (e) => {
  e.preventDefault();
  window.location.href = "../login";
});

btnViewPsw.addEventListener("click", function () {
  if (inputPassword.type === "password") {
    inputPassword.type = "text";
    btnViewPsw.innerHTML = `<i class="fa-regular fa-eye"></i>`;
  } else {
    inputPassword.type = "password";
    btnViewPsw.innerHTML = `<i class="fa-regular fa-eye-slash"></i>`;
  }
});

btnViewPswRep.addEventListener("click", function () {
  if (inputPasswordRep.type === "password") {
    inputPasswordRep.type = "text";
    btnViewPswRep.innerHTML = `<i class="fa-regular fa-eye"></i>`;
  } else {
    inputPasswordRep.type = "password";
    btnViewPswRep.innerHTML = `<i class="fa-regular fa-eye-slash"></i>`;
  }
});

VerificateRecovery();
