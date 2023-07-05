import { Divider, Modal } from "antd";
// import { Suspense, lazy } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleModal } from "../redux/features/FormModal/formModalSlice.js";
import NoteForm from "./ModalForms/NoteForm";
import StoryForm from "./ModalForms/StoryForm";

const FormModal = () => {
  const { isOpen, formName, formTitle, editable, formInfo } = useSelector(
    (state) => state.formModal
  );
  const dispatch = useDispatch();

  return (
    <Modal
      title={formTitle}
      centered
      destroyOnClose
      footer={null}
      open={isOpen}
      onCancel={() => dispatch(toggleModal())}
    >
      <Divider />
      {formName === "NoteForm" && (
        <NoteForm editable={editable} formInfo={formInfo} />
      )}
      {formName === "StoryForm" && (
        <StoryForm editable={editable} formInfo={formInfo} />
      )}
    </Modal>
  );
};

export default FormModal;
