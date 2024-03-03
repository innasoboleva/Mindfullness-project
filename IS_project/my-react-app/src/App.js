import React, { useEffect } from 'react';
import './App.css';
import { logged } from './index';

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Checkout from './checkout';


function App() {
 
  const initialOptions = {
    'client-id': "AaM7EWfJN3pojl3GMiAThBxvfiDFNcfEKsHPV-x8fKzEJLzk3hXyanJhLfOKrSEeOjWhqPGmThn8j1XF",
    'currency': 'USD',
    'intent': 'capture'
    // "enable-funding": "venmo",
    // "disable-funding": "paylater,card",
    // "data-sdk-integration-source": "integrationbuilder_sc",
    };
    
  useEffect(() => {
    const jwtToken = localStorage.getItem('token');

    fetch('http://127.0.0.1:8000/api/get_user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.status == 'success') {
          logged(true);
        } else {
          logged(false);
        }
      })
      .catch(error => {
        console.error('Error: ', error);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className="wide-screen">
          <img src="/img/IS_portrait_bg.jpg" alt="Ira Soboleba portrait" />
        </div>
        <div>
          <span>ПРИВЕТ!‌МЕНЯ ЗОВУТ ИРА СОБОЛЕВА И Я ЗНАЮ, КАК СПРАВИТЬСЯ ‌С ВЫГОРАНИЕМ</span>
          <span>‌‌Привет!‌Меня зовут Ира Соболева.‌Я психолог по образованию и коуч федерации ICF Основная проблема, с которой вот уже 4 года ко мне приходят люди — это эмоциональное выгорание.‌Притом вопреки распространенному мнению, люди сталкиваются с выгоранием не только на работе, но и дома.‌Для того, чтобы помогать эффективно решать проблему эмоционального выгорания мы с коллегами и создали Mindful Club</span>
        </div>
        <button>Подробнее</button>
        <button>Мой подкаст на YouTube</button>
        {/* <iframe 
          width="560" 
          height="315" 
          src="https://www.youtube.com/embed/iyMMxvXxpis"
          title="Video about Mindfullness programm" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
        ></iframe> */}
        
        <button>Тест на выгорание</button>
        <h3>Расписание занятий</h3>
        <div className="calendar-screen">
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
          <div>Sun</div>
        </div>
        <button>Подключить тариф на месяц</button>
        <noscript>You need to enable JavaScript to run this app.</noscript>
      </header>

      <PayPalScriptProvider options={initialOptions}>
        <Checkout/>
      </PayPalScriptProvider>

    </div>
  );
}

export default App;
