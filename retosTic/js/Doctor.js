function autoInicioEspecialidad(){
    console.log("se esta ejecutando")
    $.ajax({
        url:"http://129.151.111.95:8080/api/Specialty/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-specialty");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            }); 
        }
    
    })
}

function traerInformacionDoctor() {
    $.ajax({
        url:"http://129.151.111.95:8080/api/Doctor/all",
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            console.log(response);
            pintarRespuestaDoctor(response);
        }

    });

}

function pintarRespuestaDoctor(response){

    let myTable="<table>"
    myTable+="<tr>";
        myTable+="<td>Nombre</td>";
        myTable+="<td>Departamento</td>";
        myTable+="<td>Año</td>";
        myTable+="<td>Descripcion</td>";
        myTable+="<td>Especialidad</td>";
    "</tr>";

    for(i=0;i<response.length;i++){
    myTable+="<tr>";
        myTable+="<td>" + response[i].name + "</td>";
        myTable+="<td>" + response[i].deparment + "</td>";
        myTable+="<td>" + response[i].year + "</td>";
        myTable+="<td>" + response[i].description + "</td>";
        myTable+="<td>" + response[i].specialty.name + "</td>";
        myTable+='<td><button class = "botonDoctor2" onclick="borrar(' + response[i].id + ')">Borrar Doctor!</button></td>';
        myTable+='<td><button class = "botonDoctor2" onclick="cargarDatosDoctor(' + response[i].id + ')">Editar Doctor!</button></td>';
        myTable+='<td><button class = "botonDoctor2" onclick="actualizar(' + response[i].id + ')">Actualizar Doctor!</button></td>';
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#miListaDoctor").html(myTable);
}

function cargarDatosDoctor(id) {
    $.ajax({
        dataType: 'json',
        url:"http://129.151.111.95:8080/api/Doctor/"+id,
        type: 'GET',

        success: function (response) {
            console.log(response);
            var item = response;

            $("#id").val(item.id);
            $("#name2").val(item.name);
            $("#department").val(item.department);
            $("#year").val(item.year);
            $("#description2").val(item.description);

        },

        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function agregarDoctor() {

    if($("#name2").val().length == 0 || $("#department").val().length == 0 || $("#year").val().length == 0 || $("#description2").val().length == 0){
       alert("Todos los campos son obligatorios")
    }else{

            let elemento = {
                name: $("#name2").val(),
                department: $("#department").val(),
                year: $("#year").val(),
                description: $("#description2").val(),
                specialty:{id: +$("#select-specialty").val()},
            }

            let dataToSend = JSON.stringify(elemento);
            console.log(elemento);

            $.ajax({
                type: "POST",
                contentType: "application/json",
                url:"http://129.151.111.95:8080/api/Doctor/save",
                data: dataToSend,
                datatype: 'json',

                success: function (response) {
                    console.log(response);
                    console.log("Se guardo Correctamente");
                   
                    $("#resultado2").empty();
                    $("#name2").val("");
                    $("#department").val("");
                    $("#year").val("");
                    $("#description2").val("");
                    

               

                    alert("Se ha guardado Correctamente!")
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("No se Guardo Correctamente")
                }
            });
    }
}

function borrar(idElemento) {
    var elemento = {
        id: idElemento
    }

    var dataToSend = JSON.stringify(elemento);
console.log(dataToSend);
    $.ajax(
        {
            dataType: 'json',
            data: dataToSend,
            url:"http://129.151.111.95:8080/api/Doctor/"+idElemento,
            type: 'DELETE',
            contentType: "application/JSON",
            success: function (response) {
                console.log(response);
                $("#miListaDoctor").empty();

                alert("se ha Eliminado Correctamente!")
            },

            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Elimino Correctamente!")
            }
        });
}

function actualizar(idElemento) {
    
    if($("#name2").val().length == 0 || $("#department").val().length == 0 || $("#year").val().length == 0 || $("#description2").val().length == 0){
        alert("Todos los campos deben estar llenos")
    }else{
        let elemento = {
            id: idElemento,
            name: $("#name2").val(),
            department: $("#department").val(),
            year: $("#year").val(),
            description: $("#description2").val(),
            specialty:{id: +$("#select-specialty").val()},
        }

        console.log(elemento);
        let dataToSend = JSON.stringify(elemento);

        $.ajax({
            datatype: 'json',
            data: dataToSend,
            contentType: "application/JSON",
            url:"http://129.151.111.95:8080/api/Doctor/update",
            type: "PUT",

            success: function (response) {
                console.log(response);
                $("#miListaDoctor").empty();
                listarSkate();
                alert("se ha Actualizado Correctamente!")

                $("#resultado2").empty();
                $("#id").val("");
                $("#name2").val("");
                $("#department").val("");
                $("#year").val("");
                $("#description2").val("");


            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Actualizo Correctamente!")
            }
        });
    }
}