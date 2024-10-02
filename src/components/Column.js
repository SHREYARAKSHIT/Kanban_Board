// src/components/Column.js
import React from 'react';
import TicketCard from './TicketCard';
import '../styles/Column.css';

const Column = ({ title, tickets, groupBy}) => {
    const getIconForTitle = (title,isUser) => {
        if(groupBy==='user'){
            return require("../icons_FEtask/usericon.png");
        }
        switch (title.toLowerCase()) {
          case 'backlog':
            return require("../icons_FEtask/Backlog.svg").default;
          case 'todo':
            return require("../icons_FEtask/To-do.svg").default;
          case 'in progress':
            return require("../icons_FEtask/in-progress.svg").default;
          case 'done':
            return require("../icons_FEtask/Done.svg").default;
          case 'cancelled':
            return require("../icons_FEtask/Cancelled.svg").default;
          case 'no priority':
            return require("../icons_FEtask/No-priority.svg").default;
          case 'urgent':
            return require("../icons_FEtask/SVG - Urgent Priority colour.svg").default;
          case 'high':
            return require("../icons_FEtask/Img - High Priority.svg").default;
          case 'medium':
            return require("../icons_FEtask/Img - Medium Priority.svg").default;
          case 'low':
            return require("../icons_FEtask/Img - Low Priority.svg").default;
          default:
            return null; // Return null if no match found
        }
      };
      
      
    return (
        <div className="column">
            <div class="columnheading">
                <span class="columndetails">
                    <span class="columndetailsitem" id="usericon"><img src={getIconForTitle(title,groupBy)} alt=""/></span>
                    <span class="columndetailsitem" id="cardname">{title}</span>
                    <span class="columndetailsitem" id="cardnumber">{tickets.length}</span>
                </span>
                <span class="columnedit">
                    <span class="columnedititem" id="add"><img src={require("../icons_FEtask/add.svg").default} alt=""/></span>
                    <span class="columnedititem" id="3-dot"><img src={require("../icons_FEtask/3 dot menu.svg").default} alt=""/></span>
                </span>
            </div>
            {tickets.map(ticket => (
                <TicketCard key={ticket.id} ticket={ticket} groupBy={groupBy}/>
            ))}
        </div>
    );
};

export default Column;
