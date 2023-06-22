/*LOGIN*/

/*********************************************************CONSTANTES/VARIABLES*************************************************************/
let URLorigin = window.location.origin,
  UrlCook = URLorigin + "/api/",
  Urlsession = URLorigin + "/api/sessions/session",
  UrlForgot = URLorigin + "/api/sessions/forgot",
  UrlLogin = URLorigin + "/api/sessions/login";

const form = document.querySelector("form"),
  Login = document.querySelector(".btnLogin"),
  inputUser = document.getElementById("user");

/*****************************************************************CLASES*************************************************************/
class RecoveryUser {
  constructor() {
    this.email = inputUser.value;
    this.password = "123";
  }
}
/*********************************************************FUNCIONES*************************************************************/
async function VerificateSession() {
  try {
    let response = await fetch(Urlsession, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      mode: "cors",
    });
    const { error, msj, session, role } = await response.json();
    if (response.status === 200) {
      if (role === "admin") {
        sessionStorage.setItem(
          "userSession",
          JSON.stringify({ msj: msj, role: role })
        );
        setTimeout(() => {
          window.location.href = "../products";
        }, 2000),
          Swal.fire({
            position: "center",
            icon: "info",
            title: "ADMIN SESSION ACTIVE",
            text: session.email,
            showConfirmButton: false,
            allowOutsideClick: false,
          });
      } else if (role === "user") {
        sessionStorage.setItem(
          "userSession",
          JSON.stringify({ msj: msj, role: role })
        );
        setTimeout(() => {
          window.location.href = "../products";
        }, 2000),
          Swal.fire({
            position: "center",
            icon: "info",
            title: "USER SESSION ACTIVE",
            text: session.email,
            showConfirmButton: false,
            allowOutsideClick: false,
          });
      }
    } else if (response.status === 401||403) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
}

async function sendRecover(data) {
  try {
    let response = await fetch(UrlForgot, {
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
    const recoveryValues = new RecoveryUser();
    const { status, recoveryData } = await sendRecover(recoveryValues);
    if (status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: recoveryData.success ,
          text: "Check your gmail inbox please!",
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
});

Login.addEventListener("click", async (e) => {
  e.preventDefault();
  window.location.href = "../login";
});

VerificateSession();