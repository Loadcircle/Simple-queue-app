const searchParams = new URLSearchParams(window.location.search);

if(!searchParams.has('escritorio')){
    window.location = 'index.html';
    throw new Error('Desktop is required');
}

const desktop = searchParams.get('escritorio');

const desktopTitle = document.querySelector('#desktopTitle'),
    actualTicket = document.querySelector('#actualTicket'),
    nextTicketBtn = document.querySelector('#nextTicketBtn'),
    lblPendientes = document.querySelector('#lblPendientes'),
    ticketAlert = document.querySelector('#ticketLefts');

desktopTitle.innerText = "Escritorio "+desktop;

const socket = io();

socket.on('connect', () => {
    ticketAlert.style.display = 'none';
    nextTicketBtn.disabled = false;

});

socket.on('disconnect', () => {
    nextTicketBtn.disabled = true;
});


socket.on('last-ticket', (ticket) => {
    // lblNuevoTicket.innerText = 'Ticket: '+ticket;
});

socket.on('pending-tickets', (tickets)=>{
    if(tickets === 0){
        ticketAlert.style.display = '';
    }else{
        ticketAlert.style.display = 'none';
    }
    lblPendientes.innerText = tickets;
});

nextTicketBtn.addEventListener( 'click', () => {
    socket.emit('attend-ticket', {desktop}, ( response ) => {
        if(!response.ok){
            actualTicket.innerText = 'Nadie';
            return ticketAlert.style.display = '';
        }
        ticketAlert.style.display = 'none';
        actualTicket.innerText = 'Ticket N: '+ response.ticket.number;
    });
});