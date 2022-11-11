const $seleccionArchivos = document.querySelector("#image");
    const $imagenPrevisualizacion = document.querySelector("#imagenes");
    const $icon = document.querySelector(".addimagen");

    // Escuchar cuando cambie
    $seleccionArchivos.addEventListener("change", () => {
      // Los archivos seleccionados, pueden ser muchos o uno
      const archivos = $seleccionArchivos.files;
      // Si no hay archivos salimos de la función y quitamos la imagen
      // if (!archivos || !archivos.length) {
      //   $imagenPrevisualizacion.src = "";
      //   return;
      // }
      // Ahora tomamos el primer archivo, el cual vamos a previsualizar
      const primerArchivo = archivos[0];
      // Lo convertimos a un objeto de tipo objectURL
      const objectURL = URL.createObjectURL(primerArchivo);
      // Y a la fuente de la imagen le ponemos el objectURL
      $imagenPrevisualizacion.src = objectURL;
      $icon.style = "display: none;";
    });

    function confirmarreceta(id){
      Swal.fire({
        title: '¿Seguro que desea eliminar la receta?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        confirmButtonColor: '#c999af',
        denyButtonText: `Denenegar`,
        denyButtonColor: '#ffffff',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          window.location= '/receta/delete/'+id
        }
      })
    }
    function confirmarcategoria(id){
      Swal.fire({
        title: '¿Seguro que desea eliminar la categoría?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        confirmButtonColor: '#c999af',
        denyButtonText: `Denenegar`,
        denyButtonColor: '#ffffff',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          window.location= '/category/delete/'+id
        }
      })
    }
    function confirmaruser(id){
      Swal.fire({
        title: '¿Seguro que desea eliminar el usuario?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        confirmButtonColor: '#c999af',
        denyButtonText: `Denenegar`,
        denyButtonColor: '#ffffff',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          window.location= '/user/delete/'+id
        }
      })
    }


