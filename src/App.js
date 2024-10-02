// src/App.js
import React, { useState, useEffect } from 'react';
import KanbanBoard from './components/KanbanBoard';
import GroupingOptions from './components/GroupingOptions';
import SortingOptions from './components/SortingOptions';
import './App.css';

const App = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };
  const [tickets, setTickets] = useState([]);
  const [groupBy, setGroupBy] = useState(() => {
    return localStorage.getItem('groupBy') || 'status';
  });
  const [sortBy, setSortBy] = useState(() => {
    return localStorage.getItem('sortBy') || 'priority';
  });

  /*useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTickets(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchTickets();
  }, []);*/
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Ensure tickets is an array
        /*if (Array.isArray(data.tickets)) {
          setTickets(data.tickets);
        } else {
          console.error('Fetched data is not an array:', data.tickets);
        }*/
        const enrichedTickets = await data.tickets.map(ticket => {
          const user = data.users.find(user => user.id === ticket.userId); // Match user by ID
          return {
            ...ticket, // Spread existing ticket properties
            userName: user ? user.name : "Unknown user", // Add user details or unknown user
            availability: user? (user.available===true?"Available":"Not available"): "Unknown"
          };
        }); 
        setTickets(await enrichedTickets);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTickets();
  }, []);

  useEffect(() => {
    localStorage.setItem('groupBy', groupBy);
    localStorage.setItem('sortBy', sortBy);
  }, [groupBy, sortBy]);

  return (
    <div className="App">
      <header>
        <div className="controls">
          <button className="display-button" onClick={toggleDropdown}>
            <img src={require("./icons_FEtask/Display.svg").default} alt=""/>
            <span class="display">Display</span>
            <img src={require("./icons_FEtask/down.svg").default} alt=""/>
          </button>

          {dropdownOpen && (
            <div className="dropdown-menu">
              <GroupingOptions groupBy={groupBy} setGroupBy={setGroupBy} />
              <SortingOptions sortBy={sortBy} setSortBy={setSortBy} />
            </div>
          )}
        </div>
      </header>
      <KanbanBoard tickets={tickets} groupBy={groupBy} sortBy={sortBy} />
    </div>
  );
};

export default App;
