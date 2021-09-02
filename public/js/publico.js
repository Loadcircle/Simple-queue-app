const lblTicket1 = document.querySelector('#lblTicket1'),
    lblEscritorio1 = document.querySelector('#lblEscritorio1'),

    lblTicket2 = document.querySelector('#lblTicket2'),
    lblEscritorio2 = document.querySelector('#lblEscritorio2'),

    lblTicket3 = document.querySelector('#lblTicket3'),
    lblEscritorio3 = document.querySelector('#lblEscritorio3'),

    lblTicket4 = document.querySelector('#lblTicket4'),
    lblEscritorio4 = document.querySelector('#lblEscritorio4');

const socket = io();

socket.on('connect', () => {
    console.log('connect')
});

socket.on('disconnect', () => {
    
});


socket.on('actual-status', (payload) => {

    const audio = new Audio('./audio/new-ticket.mp3');
    audio.play();

    const [ticket1, ticket2, ticket3, ticket4] = payload;
    if(ticket1){
        lblTicket1.innerText = 'Ticket ' + ticket1.number
        lblEscritorio1.innerText = ticket1.desktop
    }    
    if(ticket2){
        lblTicket2.innerText = 'Ticket ' + ticket2.number
        lblEscritorio2.innerText = ticket2.desktop
    }
    if(ticket3){
        lblTicket3.innerText = 'Ticket ' + ticket3.number
        lblEscritorio3.innerText = ticket3.desktop
    }
    if(ticket4){
        lblTicket4.innerText = 'Ticket ' + ticket4.number
        lblEscritorio4.innerText = ticket4.desktop
    }
});