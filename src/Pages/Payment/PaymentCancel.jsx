import { Link } from "react-router";

const PaymentCancel = () => {
    return (
        <div>
            <p>payment cancel</p>
            <Link to='/dashboard/allScholarShip'>
                <button className="btn btn-primary">Try Again</button>
            </Link>
        </div>
    );
};

export default PaymentCancel;