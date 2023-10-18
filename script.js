let resultado, lista, formato1, formato2, entrada, table;

class Inversion{
    constructor(banco,cbu,plazo,capital){
        this.banco = banco;
        this.cbu = cbu;
        this.plazo = plazo;
        this.capital = capital;
    }

    interes(){
       resultado = Math.round(this.capital * (1.33 * this.plazo / 365)); //1,18 es la tasa de interés 
       return resultado;
    }
}

let datos = [];

function calcular(){
    let contenedor = document.getElementById("contenedor");
    contenedor.append(nuevoDiv);
    contenedor.append(nuevoBoton);
    document.getElementById("plataInversion").value = "";
    entrada = 0;
    formato2 = JSON.parse(formato1);
    let numero = lista.options[lista.selectedIndex].value;
    switch(+(numero)){
       case 30:
        datos.forEach((dato) => {
        entrada = dato.interes();
        })
       nuevoDiv.innerHTML = `<p>Banco: ${formato2[formato2.length-1].banco}<\p>
                             <p>CBU: ${formato2[formato2.length-1].cbu}<\p>
                             <p>Plazo elegido: ${formato2[formato2.length-1].plazo} días<\p>
                             <p>Capital invertido: $ ${formato2[formato2.length-1].capital}<\p>
                             <p>Interés:  $ ${entrada}<\p>
                             <p>Dinero a depositar: $ ${+(formato2[formato2.length-1].capital) + entrada}<\p>`
         break;
         case 60:
             datos.forEach((dato) => {
                 entrada = 2 * (dato.interes());
             })
             nuevoDiv.innerHTML = `<p>Banco: ${formato2[formato2.length-1].banco}<\p>
                                   <p>CBU: ${formato2[formato2.length-1].cbu}<\p>
                                   <p>Plazo elegido: ${formato2[formato2.length-1].plazo} días<\p>
                                   <p>Capital invertido: $ ${formato2[formato2.length-1].capital}<\p>
                                   <p>Interés:  $ ${entrada}<\p>
                                   <p>Dinero a depositar: $ ${+(formato2[formato2.length-1].capital) + entrada}<\p>`
         break;
        case 90:
             datos.forEach((dato) => {
                entrada = 4 * (dato.interes());
             })
             nuevoDiv.innerHTML = `<p>Banco: ${formato2[formato2.length-1].banco}<\p>
                                   <p>CBU: ${formato2[formato2.length-1].cbu}<\p>
                                   <p>Plazo elegido: ${formato2[formato2.length-1].plazo} días <\p>
                                   <p>Capital invertido: $ ${formato2[formato2.length-1].capital}<\p>
                                   <p>Interés:  $ ${entrada}<\p>
                                   <p>Dinero a depositar: $ ${+(formato2[formato2.length-1].capital) + entrada}<\p>`
         break;
         case 120:
             datos.forEach((dato) => {
                 entrada = 8 * (dato.interes());
           })
             nuevoDiv.innerHTML = `<p>Banco: ${formato2[formato2.length-1].banco}<\p>
                                   <p>CBU: ${formato2[formato2.length-1].cbu}<\p>
                                   <p>Plazo elegido: ${formato2[formato2.length-1].plazo} días<\p>
                                   <p>Capital invertido: $ ${formato2[formato2.length-1].capital}<\p>
                                   <p>Interés:  $ ${entrada}<\p>
                                   <p>Dinero a depositar: $ ${+(formato2[formato2.length-1].capital) + entrada}<\p>`
         break;
     }
}

let form = document.getElementById("formulario");
form.addEventListener("submit", function(e){
  e.preventDefault()
  lista = document.getElementById("plazoFijo");
    datos.push(new Inversion(
        document.getElementById("entidadBancaria").value,
        document.getElementById("cuentaBancaria").value,
        +(lista.options[lista.selectedIndex].value),
        +(document.getElementById("plataInversion").value)
    ));

    formato1 = JSON.stringify(datos);

    fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  body: formato1,
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json));
  localStorage.setItem("datos", formato1);
})

form.addEventListener("submit", calcular);

let nuevoDiv = document.createElement("div");
let nuevoBoton = document.createElement("button");
nuevoBoton.className = "btn btn-secondary me-md-2 w-15 nuevoBoton";
nuevoBoton.innerText = "Empezar a invertir";

function tabla(){
  table = document.createElement("table");
  table.innerHTML = `<tr>
                      <th>BANCO</th>
                      <th>CUENTA BANCARIA</th>
                      <th>INVERSIÓN</th>
                      <th>BALANCE TOTAL</th>
                    </tr>
                    <tr>
                      <td>${formato2[formato2.length-1].banco}</td>
                      <td>${formato2[formato2.length-1].cbu}</td>
                      <td>$ ${formato2[formato2.length-1].capital}</td>
                      <td>$ ${+(formato2[formato2.length-1].capital) + entrada}<img src="images/correcto.jpg" id="bien"></td>
                    </tr>`
  table.className = "tabla";
  document.getElementById("cuerpo").append(table);
}

nuevoBoton.addEventListener("click", ()=>{
    Swal.fire(
    '',
    'Inversión exitosa!',
    'success')
  nuevoDiv.remove();
  nuevoBoton.remove();
})
nuevoBoton.addEventListener("click", tabla);