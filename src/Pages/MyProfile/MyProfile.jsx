import useAuth from "../../Hooks/useAuth";

const MyProfile = () => {
    const {user} = useAuth()
    return (
        <div>
            <p>Name : {user.displayName}</p>
            <p>Email : {user.email}</p>
            <div>
                <img src={user.photoURL} alt="" />
            </div>
        </div>
    );
};

export default MyProfile;