import React from 'react';
import { PopupButton } from "react-calendly";

function Schedule() {

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

export default Schedule;
