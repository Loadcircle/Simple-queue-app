const path  = require('path');
const fs    = require('fs');

class Ticket{
    constructor(number, desktop = null){
        this.number = number;
        this.desktop = desktop;
    }
}

class TicketControl {
    constructor(){
        this.last       = 0;
        this.today      = new Date().getDate();
        this.tickets    = [];
        this.lasts4     = [];

        this.init();
    }

    get toJSON(){
        return {
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            last4: this.lasts4,
        }
    }

    init(){
        const {today, tickets, last, last4} = require('../db/data.json');
        if(today === this.today){
            this.tickets    = tickets;
            this.lasts4     = last4;
            this.last       = last;
        }else{
            this.saveDB();
        }
    }

    saveDB(){
        const dbPath = path.join(__dirname, '../db/data.json');
        fs.writeFileSync(dbPath, JSON.stringify(this.toJSON));
    }

    next(){
        this.last += 1;
        const ticket = new Ticket(this.last);
        this.tickets.push(ticket);

        this.saveDB();
        return ticket.number;
    }

    takeTicket(desktop){
        if(this.tickets.length === 0){
            return null;
        }

        const ticket = this.tickets.shift();

        ticket.desktop = desktop;

        this.lasts4.unshift( ticket );

        if(this.lasts4.length > 4){
            this.lasts4.splice(-1, 1);
        };

        this.saveDB();      
        return ticket;
    }

}

module.exports = TicketControl;