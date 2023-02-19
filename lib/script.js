
function GetInfo(a,b,c){
    let dataMy = removeTags(GetInf(a,b,c));
    return dataMy.trim();
}

function poupbox(title, messageA){

    let message = new MessageBox()
    .setTitle(title)
    .setMessage(messageA)
    .addButton("Cerrar", "red")

    message.show()
}

function enterfirst(ele) {
    if(event.key === 'Enter') {
        event.preventDefault();
        var texto = document.getElementById("inputDNI").value.toLowerCase();
        if(texto.length != 8)
            return poupbox('GuxFiz - Dev Nestor', 'Ingresa 8 Dígitos para realizar la consulta : )');
        consultar(true);
    }
}

function GetInf(string, start, end){
    let dataward = string.split(start);
    dataward = dataward[1].split(end)
    return dataward[0];
}

function removeTags(str) {
    if ((str===null) || (str===''))
        return false;
    else
        str = str.toString();

    return str.replace( /(<([^>]+)>)/ig, '');
}

function DistritosVerify(a){
    let distritos = ['Lima','Ancón','Ate Vitarte', 'Barranco','Breña', 'Carabayllo','Comas','Chaclacayo','Chorrillos','El Agustino','Jesús María','La Molina','La Victoria','Lince', 'Lurigancho','Lurín','Magdalena del Mar','Miraflores','Pachacamac','Pucusana','Pueblo Libre','Puente Piedra','Punta Negra','Punta Hermosa','Rímac','San Bartolo','San Isidro','Independencia','San Juan de Miraflores','San Luis','San Martín de Porres','San Miguel','Santiago de Surco','Surquillo','Villa María delTriunfo','San Juan de Lurigancho','Santa María del Mar','Santa Rosa','Los Olivos','Cieneguilla','San Borja','Villa El Salvador','Santa Anita']
    return distritos[a-1];

}

function DepartamentosVerify(a){
    let departamentos = ['Amazonas','Ancash','Apurimac','Arequipa','Ayacucho','Cajamarca','Cusco','Huancavelica','Huanuco','Ica','Junin','La libertad','Lambayeque','Lima','Callao','Loreto','Madre de Dios','Moquegua','Pasco','Piura','Puno','San Martin','Tacna','Tumbes','Ucayali']
    return departamentos[a-1];
}

    
async function consultar(a){

    const getapi = await fetch('api.php?dni='+document.getElementById("inputDNI").value.toLowerCase(), {method: 'GET',});
    const rsp = await getapi.text();
    if(a){
        if(rsp){
            if(GetInfo(rsp, '"rpta":', ',"') == 'false'){
                poupbox('GuxFiz - Dev Nestor', GetInfo(rsp, '"vMensajeResponse":"', '","'));
            }else{
                $("#NombrePs").val(GetInfo(rsp, '"Name":"', '","'));
                $("#ApellidoPs").val(GetInfo(rsp, '"LastName":"', '","'));
                $("#NacimientoPs").val(GetInfo(rsp, '"dtFecNacimiento":"', '","'));
                $("#DepartamentoPs").val(DepartamentosVerify(GetInfo(rsp, '"vCodDepartamento":"', '","')));            
                $("#ProvinciaPs").val('Code :' + GetInfo(rsp, '"vCodProvincia":"', '","'));
                $("#DistritoPs").val(DistritosVerify(GetInfo(rsp, '"vCodDistrito":"', '","')));
                $("#AddresPs").val(GetInfo(rsp, '"vDireccion":"', '","'));
                $("#IdPs").val(GetInfo(rsp, '"Id":"', '","'));
                $("#IdpeoplePs").val(GetInfo(rsp, '"biIdPersona":', ',"'));
                $("#GeneroPs").val(GetInfo(rsp, '"sexo":"', '","') == '1' ? 'MASCULINO' : 'FEMENINO');
            }
        }else{
            poupbox('GuxFiz - Dev Nestor', 'No se pudo lograr la conexión! Verifique que usted tenga Internet. En caso que el problema persista contactar con GuxFiz.');
        }
    }else{
        rsp ? poupbox('GuxFiz - Dev Nestor', rsp) : poupbox('GuxFiz - Dev Nestor', 'No se pudo lograr la conexión! Verifique que usted tenga Internet. En caso que el problema persista contactar con GuxFiz.'); ;
    }
}

function limpiardatos(){
    $("#NombrePs").val('');
    $("#ApellidoPs").val('');
    $("#NacimientoPs").val('');
    $("#DepartamentoPs").val('');            
    $("#ProvinciaPs").val('');
    $("#DistritoPs").val('');
    $("#AddresPs").val('');
    $("#IdPs").val('');
    $("#IdpeoplePs").val('');
    $("#GeneroPs").val('');
}

function versinformato(bool){
    consultar(false);
}