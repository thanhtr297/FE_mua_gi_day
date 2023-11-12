import {RingLoader} from "react-spinners";

export function LoadingButton({ loading }) {
    if (loading) {
        return (
            <p className="loading-button" style={{width:'100px',fontSize:'14px',marginLeft:'100%'}}>
                Đang tải..
                <RingLoader color="#36D7B7" loading={loading} size={30} />
            </p>
        );
    } else {
        return (
            <button disabled={loading} className="btn btn-primary"  style={{width:'100px',fontSize:'14px',marginLeft:'100%'}} type={'submit'} >
                Lưu
            </button>
        );
    }
}
