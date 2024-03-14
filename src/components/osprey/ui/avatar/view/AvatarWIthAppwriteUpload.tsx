import Image from "next/image";
import { FunctionComponent, MutableRefObject, useRef } from "react";
import { AvatarProps } from "../utils/props";
import { styles } from "../utils/styles";
import { useLspDetailsStore } from "@lms/utilities/stores/lsp-details-store";

export const AvatarWIthAppwriteUpload: FunctionComponent<AvatarProps> = ({
  source,
  alt = "avatar",
  size = "md",
  roundedness = "full",
  width = 1000,
  height = 1000,
}) => {
  const inputRef = useRef() as MutableRefObject<HTMLInputElement>;
  const uploadedPhoto = useLspDetailsStore((state) => state.uploadedPhoto);
  const setUploadedPhoto = useLspDetailsStore((state) => state.setUploadedPhoto);

  return (
    <div className="relative group">
      <Image src={source} alt={alt} height={height} width={width} className={styles.avatar(size, roundedness)} />
      <button className="absolute bottom-0 left-10" onClick={() => inputRef?.current.click()}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 fill-gray-700">
          <path d="M12 9a3.75 3.75 0 1 0 0 7.5A3.75 3.75 0 0 0 12 9Z" />
          <path
            fillRule="evenodd"
            d="M9.344 3.071a49.52 49.52 0 0 1 5.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 0 1-3 3h-15a3 3 0 0 1-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 0 0 1.11-.71l.822-1.315a2.942 2.942 0 0 1 2.332-1.39ZM6.75 12.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Zm12-1.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <input
        type="file"
        ref={inputRef}
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.length === 0) {
          } else if (e.target.files) {
            setUploadedPhoto(e.target.files[0]);
          }
        }}
      />
    </div>
  );
};
