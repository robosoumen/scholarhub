import React from 'react';
import useAuth from '../../Hooks/useAuth';

const Profile = () => {
    const {user} = useAuth();
    return (
        <div>
            <p>Name : {user?.displayName}</p>
            <p>image : <img src={user?.photoURL} alt="image" /></p>
            <p>email : {user?.email}</p>
        </div>
    );
};

export default Profile;