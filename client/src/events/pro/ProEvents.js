import React, { useEffect } from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import * as eventAction from '../../redux/events/event.action';
import * as eventReducer from '../../redux/events/event.reducer';

let ProEvents =()=>{

    let dispatch =useDispatch();

    useEffect(()=>{
        dispatch(eventAction.getProEvents());
    },[]);
    
    let eventInfo = useSelector((state)=>{
        return state[eventReducer.eventFeaturesKey]
    })
    let {events} = eventInfo;

    return(
        <React.Fragment>
            <section className="p-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3 text-teal">Pro Events</p>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="p-3">
                <div className="container">
                    <div className="row">
                    <div className="col">
                            {
                                events.length > 0 ?
                                <React.Fragment> 
                                    {
                                        events.map(event =>{
                                            return (
                                                <React.Fragment>
                                                    <div className="card m-3" key={event._id}>
                                                        <img src={event.image} alt="" />
                                                        <div className="card-body">
                                                        <div className="row bg-light p-3">
                                                            <div className="col ">
                                                                    <p className="h3 text-danger font-weight-bold">{event.name}</p>
                                                                    <small>Date : {event.date}</small><br/>
                                                                    <small>Price : Rs. {event.price}</small>
                                                            </div>
                                                            <div className="col ">
                                                                <Link to='/' className="btn btn-teal btn-sm">Book Now</Link>
                                                            </div>
                                                        </div>
                                                        </div>
                                                    </div> <hr/>
                                                </React.Fragment>
                                            )
                                        })
                                    }
                                </React.Fragment> : ''
                            }
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}
export default ProEvents;