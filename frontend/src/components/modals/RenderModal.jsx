import { useSelector } from 'react-redux';
import getModal from '.';

const RenderSliceModal = () => {
  const modalInfo = useSelector((state) => state.modals);

  if (!modalInfo.type) {
    return null;
  }

  const Component = getModal(modalInfo.type);
  return <Component />;
};

export default RenderSliceModal;
