import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

export default class Event extends Component {
    constructor(){
        super();
        this.state = {
            events: [],
        }
    }

    componentDidMount(){
        axios.get('/api/event').then(response => {
            this.setState({
                events: response.data,
                data: [],
            });
            this.setState(previousState =>({
                data:[...previousState.data, { title: 'event 3', date: '2019-10-05' }]
            }))
            // this.state.events.map(event =>  {
            //     this.state.data.push({ title: 'event 3', date: '2019-10-05' })
            // })
        }).catch(errors => {
            console.log(errors);
        })
    }

    render() {
        if(!this.state.data){
            return null
        }
        return (
            /**
             * {this.state.events.map(event => <li key={event.id}>{event.title}</li>)}
             * [
                    { title: 'event 1', date: '2019-10-01' },
                    { title: 'event 2', date: '2019-10-03' }
                ]
             */
            <div className="container">
                test
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
                {console.log(this.state.data)}
            </div>

        );
    }
}

if (document.getElementById('example')) {
    ReactDOM.render(<Event />, document.getElementById('example'));
}
