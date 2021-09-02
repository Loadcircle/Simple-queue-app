const lblNuevoTicket = document.querySelector('#lblNuevoTicket'),
      createTicketBtn = document.querySelector('#createTicketBtn');

const socket = io();

socket.on('connect', () => {
    createTicketBtn.disabled = false;

});

socket.on('disconnect', () => {
    createTicketBtn.disabled = true;
});


socket.on('last-ticket', (ticket) => {
    lblNuevoTicket.innerText = 'Ticket: '+ticket;
});


createTicketBtn.addEventListener( 'click', () => {
    socket.emit('next-ticket', null, ( ticket ) => {
        lblNuevoTicket.innerText = 'Ticket: '+ticket;
    });
});