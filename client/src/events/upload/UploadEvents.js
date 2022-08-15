import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as eventAction from '../../redux/events/event.action';
import {useNavigate} from  'react-router-dom';
import * as userReduceer from '../../redux/user/user.reducer';

let UploadEvents =()=>{
    let dispatch = useDispatch();
    let navigate = useNavigate();

    let [event , setEvent] = useState({
        name : '',
        image :'',
        date:'',
        type:'',
        price :'',
        info:''
    });
    let updateInput =(e)=>{
        setEvent({
            ...event,
            [e.target.name] : e.target.value
        })
    };

    let submitUpload=(e)=>{
        e.preventDefault();
        dispatch(eventAction.uploadEvent(event , navigate));
    }


    let userInfo = useSelector((state)=>{
        return state[userReduceer.userFeaturesKey];
    });
    let {user } = userInfo;

    return(
        <React.Fragment>
            <section className="p-3 background">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3 text-teal"><i className="fa fa-file-upload" />Upload Events</p>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type</p>
                        </div>
                    </div>
                </div>
            </section>
            {
                user.isAdmin ?
                 <React.Fragment>
                        <section className="p-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <form onSubmit={submitUpload}>
                                <div className="form-group">
                                    <input 
                                    name='name'
                                    value={event.name}
                                    onChange={updateInput}
                                    required
                                    type="text" className="form-control" placeholder="Event Name" />
                                </div>
                                <div className="form-group">
                                    <input 
                                    name='image'
                                    value={event.image}
                                    onChange={updateInput}
                                    required
                                    type="text" className="form-control" placeholder="Image URL" />
                                </div>
                                <div className="form-group">
                                    <input 
                                    name='date'
                                    value={event.date}
                                    onChange={updateInput}
                                    required
                                    type="date" className="form-control" placeholder="Date" />
                                </div>
                                <div className="form-group">
                                    <select
                                    name='type'
                                    value={event.type}
                                    onChange={updateInput}
                                    required
                                    className="form-control">
                                        <option value="">Event Type</option>
                                        <option value="FREE">FREE</option>
                                        <option value="PRO">PRO</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <input
                                    name='price'
                                    value={event.price}
                                    onChange={updateInput}
                                    required
                                    type="number" className="form-control" placeholder="Price" />
                                </div>
                                <div className="form-group">
                                    <textarea
                                    name='info'
                                    value={event.info}
                                    onChange={updateInput}
                                    required
                                    className="form-control" rows="3" placeholder="Infromation" />
                                </div>
                                <div >
                                    <input type="submit" className="btn btn-teal btn-sm" value="Upload" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
                 </React.Fragment> :
                 <React.Fragment>
                         <section>
                            <div className="container">
                                <div className="row">
                                    <div className="col text-center">
                                        <p className="h4 text-danger">---------- You are not Authorized to Upload -----------</p>
                                        <small>If you are an admin ?, please contact your DBA to allow access</small>
                                    </div>
                                </div>
                            </div>
                        </section>
                 </React.Fragment>
            }
        </React.Fragment>
    )
}
export default UploadEvents;