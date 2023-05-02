import { useEffect, useState } from "react";
import classes from "./DropFileInput.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useController } from "react-hook-form";
import React from "react";
import { useNavigate } from "react-router-dom";

interface DropFileInputProps {
  control: any;
  name: string;
  onLoaded: (fileName: string | null) => void,
  rules?: Record<string, unknown>;
}

const DropFileInput = ({ control, name, rules, onLoaded }: DropFileInputProps) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [progressLoaded, setProgressLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (progressLoaded) {
      onLoaded(fileName);
    }
  }, [progressLoaded])

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

      const reader = new FileReader();
      reader.onloadstart = () => setProgress(0);
      reader.onprogress = (event) => {
        if (event.lengthComputable) {
          setProgress((event.loaded / event.total) * 100);
        }
      };
      reader.onloadend = () => setProgressLoaded(true);
      reader.readAsDataURL(file);

      field.onChange(file);
    }
    wrapperRef.current?.classList.remove("dragover");
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);

      const reader = new FileReader();
      reader.onloadstart = () => setProgress(0);
      reader.onprogress = (event) => {
        if (event.lengthComputable) {
          setProgress((event.loaded / event.total) * 100);
        }
      };
      reader.onloadend = () => setProgressLoaded(true);
      reader.readAsDataURL(file);

      field.onChange(file);
    }
  };

  const wrapperRef = React.useRef<HTMLDivElement>(null);

  return (
    <div
      ref={wrapperRef}
      className={classes["drop-file-input"]}
      onDragOver={onDragOver}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <div className={classes["drop-file-input__label"]}>
        <FontAwesomeIcon icon={faCloudArrowUp} />
        <p style={{ fontWeight: "lighter" }}>Drag and drop audio here</p>
        {fileName && (
          <>
            <br />
            <p>Name of audio: {fileName}</p>
          </>
        )}
        {progress !== null && (
          <>
            <br />
            <div>Progress: {progress === 100 ? "Loaded" : `${progress.toFixed(0)}%`}</div>
          </>
        )}
      </div>
      <input type="file" accept="audio/mp3,audio/*;capture=microphone" onChange={onFileChange} />
    </div>
  );
};

export default DropFileInput;
