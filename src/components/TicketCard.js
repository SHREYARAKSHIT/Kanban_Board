// src/components/TicketCard.js
import React from 'react';
import '../styles/TicketCard.css';

const TicketCard = ({ ticket, groupBy }) => {
  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
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
      default:
        return null;
    }
  };

  const getUserIcon = (userName) => {
    return require("../icons_FEtask/usericon.png");
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 4:
        return require("../icons_FEtask/SVG - Urgent Priority grey.svg").default;
      case 3:
        return require("../icons_FEtask/Img - High Priority.svg").default;
      case 2:
        return require("../icons_FEtask/Img - Medium Priority.svg").default;
      case 1:
        return require("../icons_FEtask/Img - Low Priority.svg").default;
      case 0:
        return require("../icons_FEtask/No-priority.svg").default;
      default:
        return null;
    }
  };

  return (
    <div className="ticket-card">
      <div class="first_line">
        <span class="card-first-left" id="cardid">{ticket.id}</span>
        {groupBy!=="user" && (<span class="card-first-right" id="carduicon"><img src={getUserIcon(ticket.userName)} alt=""/></span>)}  
      </div>
      <div class="second_line">
        {groupBy!=="status" && (<div class="cardstatus"><img src={getStatusIcon(ticket.status)} alt=""/></div>)}
        <div class="cardtitlecontainer"><span class="cardtitle">{ticket.title}</span></div>
      </div>
      <div className="third_line">
        {groupBy!=="priority" && (<div class="priority"><img src={getPriorityIcon(ticket.priority)} alt=""/></div>)}
        <div class="tags-container">{ticket.tag.map((tag, index) => (
          <div className="tag" key={index}>
            <div class="grey-circle"></div>
            <span className="tag-text">{tag}</span>
          </div>
        ))}</div>
      </div>
    </div>
  );
};

export default TicketCard;
