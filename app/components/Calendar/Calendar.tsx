import React from "react";
import moment from "moment";
import {useState} from "react";

const createBlanks = (firstOfMonth )=>{
	let blanks = [];
	for(let i = 0; i < firstOfMonth; i++){
		blanks.push(<td className="calendar-day empty">{""}</td>);
	}
	return blanks;
}

const buildCalendar = (date)=>{
	const firstOfMonth = date.startOf("month").format("d");
	const currentDay = moment().format("D");
	const daysInMonth = date.daysInMonth();

	let daysInMonthList = [];
	for(let i = 1; i <= daysInMonth;i++){
		let day = i == parseInt(currentDay) ? "today" : i;
		daysInMonthList.push(
			<td key={i} className={`calendar-day ${day}`}>
				{day}
			</td>
		)
	}
	return [...createBlanks(firstOfMonth), ...daysInMonthList];
}

const buildCalendarNicely=(calendar)=>{
	let rows = [];
	let cells = [];
	calendar.map((row, i) => {
		if(i % 7 !== 0){
			cells.push(row);
		} else{
			rows.push(cells);
			cells = [];
			cells.push(row);
		}
		if(i === calendar.length - 1){
			rows.push(cells);
		}
	});
	return rows;
}

export const Calendar = (props) => {
	const [date, setDate] = useState(moment());
	const weekdayshort = moment.weekdaysShort();
	let rows = buildCalendarNicely(buildCalendar(date));

	return (
		<div>
			Calendar
			<table className="calendar-day">
				<thead>
					{weekdayshort.map((day) => {
						return (
							<th key={day} className="week-day">
								{day}
							</th>
						)
					})}
				</thead>
				<tbody>
					{rows.map((day)=>{
						return (
						<tr>
							{day}
						</tr>)
					})}
				</tbody>
			</table>
		</div>
	);
}