/*CURRENT*/

/*********************************************************CONSTANTES/VARIABLES*************************************************************/
let URLorigin = window.location.origin,
  UrlCurrent = URLorigin + "/api/sessions/current";

const contain = document.querySelector(".currentContain");

async function getData() {
  try {
    let response = await fetch(`${UrlCurrent}`, {
      method: "GET",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      mode: "cors",
    });
    const data = await response.json();
    return data;
  } catch {
    console.log(Error);
  }
}

async function initCurrentUser() {
  const user = await getData();
  contain.innerHTML = "";
  if (user.error) {
    contain.innerHTML = 
    `<ul>
      <div>
        <u><b>Session: "Expired or Invalid"</b></u>
      </div>
      <li>
        <b>Error</b><p>${user.error}</p>
      </li>
    </ul>`
  ;
  }else{
    contain.innerHTML = 
    `<ul>
      <div>
        <u><b>Session: "${user.Session}"</b></u>
      </div>
      <li>
        <div>
          <b>Role:</b><p>${user.Role}</p>
        </div>
      </li>
      <li>
        <div>
          <b>FullName:</b><p>${user.FullName}</p>
        </div>
      </li>
      <li>
        <div>
          <b>Age:</b><p>${user.Age}</p>
        </div>
      </li>
    </ul>`
  ;
  }
 
}

initCurrentUser();
