import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Helmet from 'react-helmet';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import DayPicker, { DateUtils } from 'react-day-picker'
import 'react-day-picker/lib/style.css'

export default class Event extends Component {
    constructor(){
        super();
        this.handleDayClick = this.handleDayClick.bind(this);
        this.handleResetClick = this.handleResetClick.bind(this);
        this.state = {
            events: [],
            eventTitle: '',
            options:[]
        }
    }

    getInitialState() {
        return {
            from: undefined,
            to: undefined,
        };
    }

    handleDayClick(day) {
        const range = DateUtils.addDayToRange(day, this.state);
        this.setState(range);
    }

    handleResetClick() {
        this.setState(this.getInitialState());
    }

    changeHandler(e){
        this.setState({[e.target.name] : e.target.value})
    }

    submitHandler(e){
        e.preventDefault()
        const formData = {
            eventTitle : this.state.eventTitle,
            dateFrom : this.state.from,
            dateTo : this.state.to,
            dayOptions : this.state.options
        }
        axios.post('/api/event', formData).then(window.location.reload());
        // console.log(formData);
    }

    onChangeCheckBox(e){
        // current array of options
        const options = this.state.options
        let index

        // check if the check box is checked or unchecked
        if (e.target.checked) {
            // add the numerical value of the checkbox to options array
            options.push(+e.target.value)
        } else {
            // or remove the value from the unchecked checkbox from the array
            index = options.indexOf(+e.target.value)
            options.splice(index, 1)
        }

        // update the state with the new array of options
        this.setState({ options: options })

        console.log(this.state.options)
    }

    componentDidMount(){
        axios.get('/api/event').then(response => {
            this.setState({
                events: response.data,
                data: [],
            });
            this.state.events.map(event => {
                this.setState(previousState =>({
                    data:[...previousState.data, { title: event.title, date: event.date }]
                }))
            })
        }).catch(errors => {
            console.log(errors);
        })
    }

    render() {
        const { from, to } = this.state;
        const modifiers = { start: from, end: to };
        const {eventTitle} = this.state
        if(!this.state.data){
            return null
        }
        return (
            <div className="">
                <div className="event-form">
                    <form onSubmit={this.submitHandler.bind(this)}>
                    <div className="form-group">
                        <label htmlFor="event-title">Event Title</label>
                        <input type="text" className="form-control" name="eventTitle" id="eventTitle" placeholder="Event Title" onChange={this.changeHandler.bind(this)} value={this.state.eventTitle} required/>
                    </div>
                    <DayPicker
                        className="Selectable"
                        numberOfMonths={this.props.numberOfMonths}
                        selectedDays={[from, { from, to }]}
                        modifiers={modifiers}
                        onDayClick={this.handleDayClick}
                        onDayChange={day => console.log(day)}
                    />
                    <div className="checkboxes">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" id="monday" name='day' value={1} onChange={this.onChangeCheckBox.bind(this)}/>
                            <label className="form-check-label" htmlFor="monday">Monday</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" id="tuesday" name='day' value={2} onChange={this.onChangeCheckBox.bind(this)}/>
                            <label className="form-check-label" htmlFor="tuesday">Tue</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" id="wednesday" name='day' value={3} onChange={this.onChangeCheckBox.bind(this)}/>
                            <label className="form-check-label" htmlFor="wednesday">Wed</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" id="thursday" name='day' value={4} onChange={this.onChangeCheckBox.bind(this)}/>
                            <label className="form-check-label" htmlFor="thursday">Thu</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" id="friday" name='day' value={5} onChange={this.onChangeCheckBox.bind(this)}/>
                            <label className="form-check-label" htmlFor="friday">Fri</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" id="saturday" name='day' value={6} onChange={this.onChangeCheckBox.bind(this)}/>
                            <label className="form-check-label" htmlFor="saturday">Sat</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" id="sunday" name='day' value={7} onChange={this.onChangeCheckBox.bind(this)}/>
                            <label className="form-check-label" htmlFor="sunday">Sunday</label>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary submitBtn">Submit</button>
                    </form>
                </div>
                <div className="calendar">
                    <FullCalendar
                        header={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                        }}
                        defaultView="dayGridMonth"
                        plugins={[ dayGridPlugin ]}
                        events={this.state.data}
                    />
                </div>

                <Helmet>
                    <style>{`
                    .Selectable .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
                        background-color: #f0f8ff !important;
                        color: #4a90e2;
                    }
                    .Selectable .DayPicker-Day {
                        border-radius: 0 !important;
                    }
                    .Selectable .DayPicker-Day--start {
                        border-top-left-radius: 50% !important;
                        border-bottom-left-radius: 50% !important;
                    }
                    .Selectable .DayPicker-Day--end {
                        border-top-right-radius: 50% !important;
                        border-bottom-right-radius: 50% !important;
                    }
                    `}</style>
                </Helmet>
            </div>

        );
    }
}

if (document.getElementById('example')) {
    ReactDOM.render(<Event />, document.getElementById('example'));
}
