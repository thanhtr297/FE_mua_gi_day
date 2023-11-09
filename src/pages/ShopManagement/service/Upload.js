import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {v4} from "uuid";

const uploadImage = (storage, files, setPath) => {
    if (!files || files.length === 0) return;
    const upload = Array.from(files).map((file) => {
        const imageRef = ref(storage, `image/${file.name + v4()}`);
        return uploadBytes(imageRef, file)
            .then((snapshot) => getDownloadURL(snapshot.ref))
            .then((url) => {
                setPath((path) => [
                    ...path,
                    { name: url }
                ]);
            });
    });
    Promise.all(upload).then();
};

export default uploadImage;