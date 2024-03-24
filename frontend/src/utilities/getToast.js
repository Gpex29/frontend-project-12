import { Bounce, toast } from 'react-toastify';

const getToast = (type, translation) => toast.success(translation(`toasts.${type}`), {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
  transition: Bounce,
});

export default getToast;
