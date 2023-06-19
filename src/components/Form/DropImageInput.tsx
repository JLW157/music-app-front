import { faCloudArrowUp, faImage, faPhotoFilm } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import classes from "./DropImageInput.module.css";
import React from "react";
import { useController } from "react-hook-form";


interface DropFileInputProps {
    control: any;
    name: string;
    rules?: Record<string, unknown>;
}

const DropImageInput = ({ control, name, rules }: DropFileInputProps) => {
    const [selectedFile, setFileName] = useState<string | null>(null);

    const { field } = useController({
        name,
        control,
        rules,
        defaultValue: null,
    });

    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const onDragEnter = () => wrapperRef.current?.classList.add("dragover");
    const onDragLeave = () => wrapperRef.current?.classList.remove("dragover");
    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        const file = e.dataTransfer.files[0];
        if (file) {
            setFileName(file.name);
            field.onChange(file);
        }
        wrapperRef.current?.classList.remove("dragover");
    };

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileName(file.name);
            field.onChange(file);
        }
    };

    const wrapperRef = React.useRef<HTMLDivElement>(null);


    return <>
        <div
            ref={wrapperRef}
            className={classes["drop-file-input"]}
            onDragOver={onDragOver}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
        >
            <div className={classes["drop-file-input__label"]}>
                {!field.value ? (
                    <>
                        <FontAwesomeIcon className="" icon={faImage} />
                    </>
                ) : (
                    <>
                        <div style={{width: "100px", height: "100px"}} className={classes["upload-image-wrapper"]}>
                            <img className={classes["upload-image__preview"]} src={URL.createObjectURL(field.value)} alt="Uploaded" />
                        </div>
                    </>
                )}
            </div>
            <input type="file" accept="image/*" onChange={onFileChange} />
        </div>
    </>
};

export default DropImageInput;