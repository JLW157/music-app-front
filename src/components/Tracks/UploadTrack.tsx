import { useForm } from "react-hook-form";
import classes from "./UploadTrack.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowDown } from "@fortawesome/free-solid-svg-icons";
import DropFileInput from "../Form/DropFileInput";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../store/store";
import { uploadTrack } from "../../store/features/audiosSlice";
import { IUploadTrackDTO } from "../../models/track-models";
import DropImageInput from "../Form/DropImageInput";
import Select from "react-select";
import { InputActionMeta } from "react-select/dist/declarations/src";
import axios from "axios";
import { genresAllUrl } from "../../utils/endpoints";
import { getGenres } from "../../services/tracks-service";
import { IGenre } from "../../models/genres-models";

const UploadTrackPage = () => {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
    setValue
  } = useForm<IUploadTrackDTO>();

  const [selectedOptions, setSelectedOptions] = useState<string>("");
  const [genres, setGenres] = useState<IGenre[]>([]);

  useEffect(() => {
    getGenres().then(res => {
      setGenres(res);
    });
  }, []);

  const dispatch = useAppDispatch();

  const [page, setPage] = useState<number>(1);
  const FormTitles = ["Upload audio", "Basic Info"];

  const onSubmit = (formData: IUploadTrackDTO) => {
    console.log("Submited", formData);
    dispatch(uploadTrack(formData));
  };

  const onAudioLoaded = (title: string | null) => {
    setPage(page + 1);
    setValue("title", title ?? "");
  }

  return (
    <>
      <div className={classes["form-upload"]}>
        <div className={classes["progressbar"]}><div style={{ width: page === 1 ? "50%" : "100%" }}></div></div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={classes["form-container"]}>
            <div className={classes["form-upload-header"]}>
              <h3>{FormTitles[page - 1]}</h3>
            </div>
            {page === 1 &&
              <>
                <DropFileInput
                  onLoaded={(title) => { onAudioLoaded(title) }}
                  control={control}
                  name="file"
                  rules={{ required: "Audio file is required" }}
                />
                {errors.file && <p>{errors.file.message}</p>}
              </>}
            {page === 2 &&
              <>
                <div className={classes["form-upload-basic-info"]}>
                  <div className={classes["form-upload-image"]}>
                    <DropImageInput
                      control={control}
                      name="image" />
                  </div>
                  <div className={classes["form-upload-other"]}>
                    <div className={classes["input-box"]}>
                      <input {...register('title', {
                        required: "Title is required!",
                      })} type="text" required />
                      <span>Title</span>
                    </div>
                    <div className={classes["select-box"]}>
                      <select {...register('genre', {
                        required: "Genre is required!",
                      })}>
                        <option value="">Select genre</option>
                        {genres.map((g, index) => <option key={index} value={g.genre}>{g.genre}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              </>}
          </div>
          <div className="form-upload-btns">
            {page === 1 &&
              <>
                <button onClick={() => setPage(page + 1)} type="button">Next</button>
              </>
            }
            {page === 2 &&
              <>
                <button onClick={() => setPage(page - 1)} type="button">Back</button>
                <button type="submit">Submit</button>
              </>
            }
          </div>
        </form>
      </div>
    </>
  );
};

export default UploadTrackPage;
