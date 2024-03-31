import { useSelector } from 'react-redux';
import getModal from '.';

const RenderSliceModal = () => {
  const modalInfo = useSelector((state) => state.modals);
  console.log(modalInfo);
  if (!modalInfo.type) {
    return null;
  }

  const Component = getModal(modalInfo.type);
  return <Component />;
};

export default RenderSliceModal;
