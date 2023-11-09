import {RingLoader} from "react-spinners";

export function LoadingButton({ loading }) {
    if (loading) {
        return (
            <p className="loading-button">
                Đang tải..
                <RingLoader color="#36D7B7" loading={loading} size={30} />
            </p>
        );
    } else {
        return (
            <button className="btn btn-primary"  type={'submit'} >
                Đăng ký
            </button>
        );
    }
}
