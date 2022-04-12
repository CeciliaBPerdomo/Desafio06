/* 
Consigna 1: Modificar el último entregable para que disponga de un canal de websocket que 
permita representar, por debajo del formulario de ingreso, una tabla con la lista de productos en 
tiempo real. 
- Puede haber varios clientes conectados simultáneamente y en cada uno de ellos se reflejarán 
los cambios que se realicen en los productos sin necesidad de recargar la vista.
- Cuando un cliente se conecte, recibirá la lista de productos a representar en la vista.
*/

/* 
Consigna 2: Añadiremos al proyecto un canal de chat entre los clientes y el servidor.
*/

/* 
npm init - y
npm i
npm install express socket.io
npm i ejs
*/

let socket = io.connect()

socket.on('messages', function(data){
    console.log(data)
    render(data)
})

function render(data) {
    let html = data.map(function(elem, index){
        return(`<div>
        <strong>${elem.author}</strong>:
        <em>${elem.text}</em></div>`)
    }).join(" ")
    document.getElementById('messages').innerHTML = html
}

function addMessage(e) {
    let mensaje = {
        author: document.getElementById('username').value, 
        text: document.getElementById('texto').value
    }
    // new-message es el nombre del evento
    socket.emit('new-message', mensaje)

    document.getElementById('texto').value = ''
    document.getElementById('texto').focus()

    return false
}