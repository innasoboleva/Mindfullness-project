import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import Checkout from './checkout';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";


function Home(props) {
  const { isLoggedIn, isSubscribed, setIsSubscribed } = props;

  const initialOptions = {
    'client-id': "AaM7EWfJN3pojl3GMiAThBxvfiDFNcfEKsHPV-x8fKzEJLzk3hXyanJhLfOKrSEeOjWhqPGmThn8j1XF",
    'currency': 'USD',
    'intent': 'capture',
    "enable-funding": "venmo",
    // "disable-funding": "paylater,card",
    "data-sdk-integration-source": "integrationbuilder_sc",
  };

  const navigate = useNavigate();

  const handleSuccessfullCheckoout = () => {
    setIsSubscribed(true);
  };

  const handleLoginRedirect = () => {
    const data = { message: 'You must be logged in for making payments' };
    // Encoding data into URL parameters
    const params = new URLSearchParams(data).toString();
    navigate(`/login?${params}`);
  };

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
          <div><div>Mon</div>
            <p>Утренняя
              майндфулнес-медитация
              c 9:00 до 10:00 am PST</p>
            <p>Коучинг-группа
              Отношения на работе и в бизнесе
              с 5:00 до 6:30 pm PST</p>
          </div>
          <div><div>Tue</div>
            <span>
              Вечерняя
              майндфулнес-медитация
              с 8:00 до 9:00 pm PST
            </span>
          </div>
          <div><div>Wed</div>
            <span>
              Коучинг-группа
              Проблемы отношений в семье
              с 5:00 до 6:30 pm PST
            </span>
          </div>
          <div><div>Thu</div>
            <span>
              Вечерняя
              майндфулнес-медитация
              с 8:00 до 9:00 pm PST
            </span>
          </div>

        </div>
        <div>
        Тариф ЛАЙТ 45 USD/ МЕСЯЦ
        <p>Неограниченный доступ к MINDFUL CLUB на месяц</p>
        <p>+ ко всем коучинг-группам</p>
        <p>+ ко всем майндфулнес-медитациям</p>
        <p>+ ко всем событиям и тренингам</p>
        </div>
        { !isLoggedIn && (
        <button onClick={handleLoginRedirect}>Подключить тариф на месяц</button>
        )}

        <noscript>You need to enable JavaScript to run this app.</noscript>
      </header>

      { isLoggedIn && !isSubscribed && (
        <PayPalScriptProvider options={initialOptions}>
          <Checkout handleSuccessfullCheckoout={handleSuccessfullCheckoout} />
        </PayPalScriptProvider>
      )}
    </div>
  );
}

export default Home;
