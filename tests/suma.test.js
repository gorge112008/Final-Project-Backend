import suma from "../src/public/js/suma.js";

  const response= suma(2,4);
  if (response>0) {
    console.log("Suma correcta");
  }else{
    console.log("Suma incorrecta");
  }