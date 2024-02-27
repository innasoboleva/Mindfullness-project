import React from 'react';
import { PopupButton } from "react-calendly";

function Scheduler() {

  // const handleSchedule = () => {

  // }

  return (
    <React.Fragment>
        <div>
        ПОНЕДЕЛЬНИК
        УТРЕННЯЯ
        МАЙНДФУЛНЕС-МЕДИТАЦИЯ
        с Викторией Евменовой
        c 9:00 до 10:00 am PST
        <div className="calendly">
        <PopupButton
          url="https://calendly.com/irsokolova/morning-mindfulness-practice"
          
          /*
          * react-calendly uses React's Portal feature (https://reactjs.org/docs/portals.html) to render the popup modal. As a result, you'll need to
          * specify the rootElement property to ensure that the modal is inserted into the correct domNode.
          */
          rootElement={document.getElementById("root")}
          text="Записаться утром в пн"
        />
        </div>
        </div>
        <div>
        ПОНЕДЕЛЬНИК
        Коучинг-группа
        АГРЕССИЯ И ЧТО С НЕЙ ДЕЛАТЬ?
        с Ирой Соболевой
        с 5:00 до 6:30 pm PST
        <div className="calendly">
        <PopupButton
          url="https://calendly.com/irsokolova/relationship"
          
          /*
          * react-calendly uses React's Portal feature (https://reactjs.org/docs/portals.html) to render the popup modal. As a result, you'll need to
          * specify the rootElement property to ensure that the modal is inserted into the correct domNode.
          */
          rootElement={document.getElementById("root")}
          text="Записаться вечером в пн"
        />
        </div>
        </div>
        <div>
        ВТОРНИК
        ВЕЧЕРНЯЯ
        МАЙНДФУЛНЕС МЕДИТАЦИЯ
        с Аленой Атаянц
        с 8:00 до 9:00 pm PST
        <div className="calendly">
        <PopupButton
          url="https://calendly.com/irsokolova/tuesday-night-mindfulness-practice"
          
          /*
          * react-calendly uses React's Portal feature (https://reactjs.org/docs/portals.html) to render the popup modal. As a result, you'll need to
          * specify the rootElement property to ensure that the modal is inserted into the correct domNode.
          */
          rootElement={document.getElementById("root")}
          text="Записаться на вторник"
        />
        </div>
        </div>
        <div>
        СРЕДА
        Коучинг-группа
        МОТИВАЦИЯ И ЛИЧНОСТНАЯ ЭФФЕКТИВНОСТЬ
        с Ирой Соболевой
        с 5:00 до 6:30 pm PST
        <div className="calendly">
        <PopupButton
          url="https://calendly.com/irsokolova/rj"
          
          /*
          * react-calendly uses React's Portal feature (https://reactjs.org/docs/portals.html) to render the popup modal. As a result, you'll need to
          * specify the rootElement property to ensure that the modal is inserted into the correct domNode.
          */
          rootElement={document.getElementById("root")}
          text="Записаться на среду"
        />
        </div>
        </div>
        <div>
        ЧЕТВЕРГ
        ВЕЧЕРНЯЯ
        МАЙНДФУЛНЕС МЕДИТАЦИЯ
        с Аленой Атаянц
        с 8:00 до 9:00 pm PST
       
        </div>
       
        
    </React.Fragment>
  );
}

export default Scheduler;
