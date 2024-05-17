import axios from "axios";
import { useEffect, useState } from "react";

export default function UploadButton() {
  const [files, setFiles] = useState<Array<File>>([]);
  const [msg, setMsg] = useState("");
  const [progress, setProgress] = useState({ started: false, pc: 0 });

  const handleUpload = () => {
    if (!files) {
      return;
    }

    const fd = new FormData();
    // fd.append("files", files);
    for (let i = 0; i < files.length; i++) {
      fd.append(`files${i + 1}`, files[i]);
    }

    setMsg("Uploading...");
    setProgress((prev) => {
      return { ...prev, started: true };
    });

    axios
      .post("http://httpbin.org/post", fd, {
        onUploadProgress: (event) => {
          setProgress((prev) => {
            return { ...prev, pc: event.progress! * 100 };
          });
        },
        headers: {
          "Custom-Header": "value",
        },
      })
      .then((res) => {
        setMsg("Upload successful");
      })

      .catch((err) => {
        setMsg("Upload failed");
        console.error(err);
      });
  };

  return (
    <div>
      <label htmlFor="uploader">Upload</label>
      <input
        multiple
        type="file"
        // onChange={(e) => {
        //   setFiles(e.target.files);
        // }}
      />

      <button onClick={handleUpload}>Upload</button>

      {progress.started && <progress max={100} value={progress.pc} />}
      {msg && <span>{msg}</span>}
    </div>
  );
}
