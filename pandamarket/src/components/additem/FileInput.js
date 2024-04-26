import { useEffect, useRef, useState } from "react";
import fileUpLoad from "../../assets/file_upload.svg";
import styled from "styled-components";
import cancelButton from "../../assets/file_cancel.svg";
const FileInputHide = styled.input`
  display: none;
`;

const FileInputLabel = styled.label`
  width: 280px;
  height: 280px;
  border-radius: 12px;
  background-image: url(${fileUpLoad});
  margin: 12px 0 24px;
`;

const ImgDiv = styled.div`
  position: relative;
  width: 282px;
  height: 282px;
`;

const style = {
  width: "282px",
  height: "282px",
};

const Img = styled.img`
  background-color: #f3f4f6;
  border-radius: 12px;
`;

const FileCancelButton = styled.button`
  position: absolute;
  right: 12px;
  top: 12px;
  width: 20px;
  height: 20px;
  background-image: url(${cancelButton});
  border: none;
  border-radius: 999px;
  background-position: center;
`;

function FileInput({ name, value, onChange }) {
  const inputRef = useRef();
  const [preview, setPreview] = useState();

  const handleClearClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;

    inputNode.value = "";
    onChange(name, null);
  };

  const handleChange = (e) => {
    const nextValue = e.target.files[0];
    onChange(name, nextValue);
  };

  useEffect(() => {
    if (!value) return;
    const nextPreview = URL.createObjectURL(value);
    setPreview(nextPreview);
  }, [value]);
  return (
    <>
      {value && (
        <ImgDiv>
          <Img style={style} src={preview} alt="이미지 미리보기" />
          {value && <FileCancelButton onClick={handleClearClick} />}
        </ImgDiv>
      )}

      {/* <img src={fileUpLoad} style={style} alt="이미지 등록" /> */}
      <FileInputHide
        type="file"
        ref={inputRef}
        onChange={handleChange}
        id="imgFile"
      />
      {!value && <FileInputLabel htmlFor="imgFile" />}
    </>
  );
}

export default FileInput;
