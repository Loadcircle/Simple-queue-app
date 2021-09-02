const TicketControl = require("../models/tocket-control");

const ticketControl = new TicketControl();

const socketController = (socket) => {
  
    socket.emit('last-ticket', ticketControl.last);
    socket.emit('actual-status', ticketControl.lasts4);
    socket.emit('pending-tickets', ticketControl.tickets.length);
    
    socket.on('next-ticket', ( payload, callback ) => {        
        const next = ticketControl.next();
        callback(next);

        socket.broadcast.emit('pending-tickets', ticketControl.tickets.length);
    });
    
    socket.on('attend-ticket', ( {desktop}, callback ) => {      
        if(!desktop){
            return callback({
                ok: false,
                msg: 'Desktop is required',
            });
        }
        
        const ticket = ticketControl.takeTicket(desktop);
        if(!ticket){
            return callback({
                ok: false,
                msg: 'No more pending tickets',
            });
        }else{
            callback({
                ok: true,
                ticket
            });
        }
        socket.broadcast.emit('actual-status', ticketControl.lasts4);
        
        socket.emit('pending-tickets', ticketControl.tickets.length);
        socket.broadcast.emit('pending-tickets', ticketControl.tickets.length);
    });

}



module.exports = {
    socketController
}

