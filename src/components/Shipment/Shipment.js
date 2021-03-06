import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { userContext } from '../../App';
import './shipment.css'

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => console.log(data);

    console.log(watch("example")); // watch input value by passing the name of it
    const [loggedInUser, setLoggedInUser] = useContext(userContext);

    return (
        <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
            <input name="example" defaultValue="test" ref={register} />

            <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder='' />
            {errors.name && <span className="error">Name is required</span>}

            <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder='' />
            {errors.email && <span className="error">Email is required</span>}

            <input name="address" ref={register({ required: true })} placeholder='Your address' />
            {errors.address && <span className="error">address is required</span>}

            <input name="phone" ref={register({ required: true })} placeholder='Your Phone number' />
            {errors.phone && <span className="error">phone is required</span>}
            
            <input type="submit" />
        </form>
    );
};

export default Shipment;