import getModal from '.';

const RenderModal = ({ modalInfo, hideModal, chooseChannel }) => {
  if (!modalInfo.type) {
    return null;
  }

  const Component = getModal(modalInfo.type);
  return <Component modalInfo={modalInfo} onHide={hideModal} chooseChannel={chooseChannel} />;
};

export default RenderModal;
