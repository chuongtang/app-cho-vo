import React, { useState } from "react";
import dateFns from "date-fns";
import "./Calendar.css";

const Calendar = () => {

  const [currentDate, setCurrentDate] = useState(new Date()); // to render proper month
  const [selectedDate, setSelectedDate] = useState(new Date()); // date selected by user

  const nextMonth = () => {
    setCurrentDate(dateFns.addMonths(currentDate, 1));
  };
  const prevMonth = () => {
    setCurrentDate(dateFns.subMonths(currentDate, 1));
  };

  //Header
  const header = () => {
    const dateFormat = "MMMM YYYY";
    return (
      <div className="header row flex-middle">
        <div className="column col-start">
          <div className="icon" onClick={prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="column col-center">
          <span>{dateFns.format(currentDate, dateFormat)}</span>
        </div>
        <div className="column col-end">
          <div className="icon" onClick={nextMonth}>
            chevron_right
          </div>
        </div>
      </div>
    );
  };

  // daysOfWeek
  const daysOfWeek = () => {
    const dateFormat = "ddd";
    const days = [];
    let startDate = dateFns.startOfWeek(currentDate);
    // Loop to render the days of the week (Sun-Sat)
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="column col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i),
            dateFormat)}
        </div>
      );
    }
    return <div className="days row">{days}</div>;
  };


  // cells in calendar body
  const cells = () => {
    const monthStart = dateFns.startOfMonth(currentDate);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);
    const dateFormat = "D";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";
    // Loop the entirety of the month to render week days
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`column cell ${!dateFns.isSameMonth(day, monthStart) ? "disabled" : dateFns.isSameDay(day, selectedDate) ? "selected" : ""}`}
            key={day}
            onClick={() => onDateClick(dateFns.parse(cloneDay))}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </div>
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}> {days} </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  };


  return (
    <div className="calendar">
      <div>{header()}</div>
      <div>{daysOfWeek()}</div>
      <div>{cells()}</div>
    </div>
  );
};
export default Calendar;