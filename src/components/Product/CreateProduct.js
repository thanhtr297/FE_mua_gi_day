import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from "./fireBase"
import {v4} from "uuid";
import {Field, Form, Formik} from "formik";



export default function CreateProduct() {
    const [categories, setCategories] = useState([])
    const [path, setPath] = useState([]);
    let navigate = useNavigate();

    const uploadImage = (files) => {
        if(!files || files.length === 0) return;

        const upload = Array.from(files).map((file) => {
            const imageRef = ref(storage,`image/${file.name +v4()}`);
            return uploadBytes(imageRef, file)
                .then((snapshot) => getDownloadURL(snapshot.ref))
                .then((url) => {
                    setPath((path) => [
                        ...path, {name: url}
                    ])
                })
        })
    }
    return(
        <>
            <div className={"container"} style={{width:"600px"}}>
                <h1 style={{textAlign: "center"}}>Create</h1>
                <Formik
                    initialValues={{
                        name:"",
                        dob:"",
                        address: '',
                        email: '',
                        phone: '',
                        classroom: {
                            id:1

                        }} }

                    onSubmit={(e) => {
                        // create(e)
                    }}
                >
                    <Form>
                        <div className="mb-3">
                            <label htmlFor={'image'} className="form-label">Image</label>
                            <input type={'file'}  multiple name={"image"}  className={'form-control'} id="{'image'}"
                                   onChange={(e)=> {
                                       uploadImage(e.target.files)
                                   }}/>
                            <label htmlFor="classroom">Class</label>


                        </div>
                    </Form>
                </Formik>
            </div>
        </>
    )


}