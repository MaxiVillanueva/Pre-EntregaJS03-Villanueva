//constructor de productos
const Producto = function(nombre,precio,stock){
    this.nombre= nombre,
    this.precio = precio
    this. stock = stock
}

let producto1= new Producto ("airpods", 115900, 25)
let producto2= new Producto ("cargador iphone 14", 29999, 15)
let producto3= new Producto ("apple watch", 250000,5)
let producto4= new Producto ("ipad", 400000, 3)
let producto5= new Producto ("iphone 14", 955000, 2)
let producto6= new Producto ("macbook", 1300000, 1)
let producto7= new Producto ("samsung 65 neoqled", 1500000, 1)
let producto8= new Producto ("samsung 85 neoqled", 3000000, 1)


let lista = [producto1,producto2,producto3,producto4,producto5,producto6,producto7,producto8]


if (localStorage.getItem("productos")) {
  lista = JSON.parse(localStorage.getItem("productos"));
} else {
  lista = lista
}



function filtrarProductos(){

    Swal.fire({
        title: 'Ingresa el producto que deseas buscar',
        input: 'text',
        showCancelButton: true,
        confirmButtonText: 'Buscar',
        showLoaderOnConfirm: true,

        preConfirm: (palabraClave) => {
            palabraClave = palabraClave.trim().toUpperCase()
            let resultado = lista.filter((producto)=> producto.nombre.toUpperCase().includes(palabraClave))

             if (resultado.length > 0){
                console.table(resultado)
               
                Swal.fire({
                    title: 'Resultados de búsqueda',
                    html: '<table><tr><th>Nombre</th><th>Precio</th><th>Stock</th></tr>' +
                          resultado.map(producto => `<tr><td>${producto.nombre}</td><td>${producto.precio}</td><td>${producto.stock}</td></tr>`).join('') +
                          '</table>',
                    confirmButtonText: 'OK'
                })
                
            } else {
                Swal.fire({
                    title: 'No se encontraron coincidencias',
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
            }
        }
    });

}

console.table(lista)


function agregarProducto() {
 
    Swal.fire({
        title: "Agregar Producto",
        html:
          `<label>Nombre:</label> <input id="nombre-input"             class="swal2-input" type="text" autofocus>

           <label>Precio:</label><input id="precio-input" class="swal2-input" type="number" step="0.01">

           <label>Stock:</label><input id="stock-input" class="swal2-input" type="number" step="1">`,
        showCancelButton: true,
        confirmButtonText: "Agregar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
           let nombre= document.getElementById("nombre-input").value.trim();
          let precio = parseFloat(document.getElementById("precio-input").value);
          let stock = parseInt(document.getElementById("stock-input").value);
      
          if (isNaN(precio) || isNaN(stock) || nombre === "") {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Por favor ingresa valores válidos."
            });
            return;
          }
      
          let producto = new Producto(nombre, precio, stock);
      
          if (lista.some((elemento) => elemento.nombre === producto.nombre)) {
            Swal.fire({
              icon: "warning",
              title: "Advertencia",
              text: "El producto ya existe en la lista."
            });
            return;
          }
      
          lista.push(producto);
      
          Swal.fire({
            icon: "success",
            title: "Producto agregado",
            text: `Se ha agregado el producto "${producto.nombre}" a la lista.`,
            timer: 3000 // Tiempo en milisegundos para cerrar la ventana automáticamente
          });
      
          console.table(lista);
          
          // Mostrar la lista de productos en un nuevo modal
          let productosDiv = document.createElement("div");
          productosDiv.setAttribute("id", "productos-div");
          productosDiv.innerHTML = `<h3>Lista de Productos</h3><ul>${lista.map(producto => `<li>${producto.nombre} - Precio: ${producto.precio} - Stock: ${producto.stock}</li>`).join("")}</ul>`;
          
          Swal.fire({
            title: "Lista de Productos",
            html: productosDiv,
            confirmButtonText: "Cerrar"
          });
        }
      });
}



lista.sort((a, b) => a.precio - b.precio);
    console.table(lista);


    //botonera

    const filtrarBtn = document.getElementById("filtrar");
      filtrarBtn.addEventListener("click", () => {
        filtrarProductos();
      });
      
      const agregarBtn = document.getElementById("agregar");
      agregarBtn.addEventListener("click", () => {
        agregarProducto();
      });
      
      const ordenarBtn = document.getElementById("ordenar");
