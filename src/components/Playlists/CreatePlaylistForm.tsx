import { useForm } from "react-hook-form";
import DropImageInput from "../Form/DropImageInput";
import styles from "./CreatePlaylistForm.module.css";
import DisplayErrors from "../Auth/DisplayErrors";
import axios from "axios";
import { createSetUrl } from "../../utils/endpoints";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ISetCreateResponse } from "../../models/set.models";
interface ICreatePlaylistForm {
    poster?: File,
    name: string;
}

const CreatePlaylistForm = () => {
    const { handleSubmit, register, control, formState: { errors }, setError } = useForm<ICreatePlaylistForm>({
        defaultValues: {
            name: "",
            poster: undefined,
        }
    });

    const [serverErrors, setServerErrors] = useState<Array<string>>([]);
    const [successMessage, setSuccessMessage] = useState<string | undefined>(undefined);

    const navigate = useNavigate();

    const onSubmit = (values: ICreatePlaylistForm) => {
        console.log("Submited values in create playlist form - ", values);
        setServerErrors([]);
        setSuccessMessage(undefined);
        try {
            axios.post<ISetCreateResponse>(createSetUrl, values, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }).then(
                res => {
                    console.log("Success from creating", res.data);
                    setSuccessMessage(res.data.message);
                },
                rej => {
                    setServerErrors(rej.response.data);
                }
            )
        } catch (error) {
            setServerErrors(["Something went wrong."])
            console.log("Error from creating ", error);
        }
    }

    return <>
        <div className={styles["create-playlist-form-wrapper"]}>
            {serverErrors.length > 0 && <>
                <DisplayErrors erorrs={serverErrors} />
            </>}
            {successMessage && serverErrors.length < 1 &&
                <>
                    <h4 style={{ "textAlign": "center", color: "green", margin: "20px 0px" }}>{successMessage}</h4>
                </>}
            <form className={styles["create-playlist-form"]} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles["create-playlist-image-field"]}>
                    <DropImageInput control={control} name={"poster"} rules={{ required: false }} />
                </div>
                <div className={styles["create-playlist-field"]}>
                    {errors.name?.message && <>
                        {console.log("Error", errors.name.message)}
                        <DisplayErrors erorrs={[errors.name.message]} />
                    </>}
                    <p>Playlist name: </p>
                    <div className={styles["create-playlist-input"]}>
                        <input {...register("name", {
                            required: "Name can`t be blank"
                        })} />
                    </div>
                </div>

                <div className={styles["buttons"]}>
                    <button className={styles["button"]} type="submit">Create</button>
                </div>
            </form>
        </div>
    </>
};

export default CreatePlaylistForm;