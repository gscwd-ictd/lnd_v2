import { Uploader } from "uploader";
import { UploadDropzone } from "react-uploader";

// TODO REMOVE THIS LATER
const uploader = Uploader({
  apiKey: "free",
});

export const UploadBtn = () => {
  return (
    <UploadDropzone
      className=""
      uploader={uploader}
      options={{ multi: true }}
      width="100%"
      height="262px"
      // onUpdate={(files) => alert(files.map((x) => x.fileUrl).join("\n"))}

      onUpdate={(files) => {
        files.map((x) => console.log(x.fileUrl));
      }}
      onComplete={(files) => console.log(files)}
    />
  );
};
