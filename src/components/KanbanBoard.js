// src/components/KanbanBoard.js
import React from 'react';
import { useMemo } from 'react';
import Column from './Column';
import '../styles/KanbanBoard.css';

const KanbanBoard = ({ tickets, groupBy, sortBy }) => {
  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 4:
        return 'Urgent';
      case 3:
        return 'High';
      case 2:
        return 'Medium';
      case 1:
        return 'Low';
      default:
        return 'No Priority';
    }
  };
  const groupTickets = useMemo(() => {
    let grouped = {};
    switch (groupBy) {
        case 'status':
          grouped["Backlog"] = [];
          grouped["Todo"] = [];
          grouped["In progress"] = [];
          grouped["Done"] = [];
          grouped["Cancelled"] = [];
          break;
        case 'user':
          break;
        case 'priority':
          grouped["No Priority"] = [];
          grouped["Urgent"] = [];
          grouped["High"] = [];
          grouped["Medium"] = [];
          grouped["Low"] = [];
          break;
        default:
    }
    if (tickets.length === 0) {
        return grouped;
    }
    tickets.forEach(ticket => {
      let key;
      switch (groupBy) {
        case 'status':
          key = ticket.status;
          break;
        case 'user':
          key = ticket.userName;
          break;
        case 'priority':
          key = getPriorityLabel(ticket.priority);
          break;
        default:
          key = 'Others';
      }

      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(ticket);
    });

    
    if(groupBy==='user'){
        const sortedGroups = Object.entries(grouped).sort(([keyA], [keyB]) => {
            return keyA.localeCompare(keyB);
        });
        
        grouped = Object.fromEntries(sortedGroups);
    }

    for (let key in grouped) {
      grouped[key].sort((a, b) => {
        if (sortBy === 'priority') {
          return b.priority - a.priority;
        } else if (sortBy === 'title') {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
    }

    return grouped;
  }, [tickets, groupBy, sortBy]);


  return (
    <div className="kanban-board">
      {Object.keys(groupTickets).map(group => (
        <Column key={group} title={group} tickets={groupTickets[group]} groupBy={groupBy} />
      ))}
    </div>
  );
};

export default KanbanBoard;
