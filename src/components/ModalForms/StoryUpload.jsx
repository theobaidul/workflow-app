import { PlusOutlined } from "@ant-design/icons";
import { Form, Modal, Upload } from "antd";
import { useState } from "react";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const StoryUpload = ({ setStoryFile }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [storyFileList, setStoryFileList] = useState([]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = (uploadData) => {
    const { file: newFile, fileList: newFileList } = uploadData || {};
    setStoryFile(newFile);
    setStoryFileList(newFileList);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  return (
    <>
      <Form.Item
        style={{
          marginBottom: "9px",
        }}
      >
        <Upload
          listType="picture-card"
          fileList={storyFileList}
          onPreview={handlePreview}
          onChange={handleChange}
          beforeUpload={() => false}
        >
          {storyFileList.length >= 1 ? null : uploadButton}
        </Upload>
      </Form.Item>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="example"
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>
    </>
  );
};
export default StoryUpload;
