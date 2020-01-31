import React, { useContext, useEffect } from 'react';
import { CTX } from '../Store/Store';
import { ToastContainer, toast } from 'react-toastify';

const ToastifyComponent = () => {
  const [state, dispatch] = useContext(CTX);
  const { toastMsg } = state;

  useEffect(() => {
    const clearToastMessage = () => {
      dispatch({
        type: 'UPDATE_TOAST_MESSAGE',
        payload: null
      });
    };

    if (toastMsg && toastMsg !== null) {
      if (toastMsg.type === 'success') {
        toast(toastMsg.msg, {
          type: toast.TYPE.SUCCESS,
          position: toast.POSITION.BOTTOM_CENTER,
          onClose: () => {
            clearToastMessage();
          }
        });
      } else if (toastMsg.type === 'info') {
        toast(toastMsg.msg, {
          type: toast.TYPE.INFO,
          position: toast.POSITION.BOTTOM_CENTER,
          onClose: () => {
            clearToastMessage();
          }
        });
      } else if (toastMsg.type === 'warning') {
        toast(toastMsg.msg, {
          type: toast.TYPE.WARNING,
          position: toast.POSITION.BOTTOM_CENTER,
          onClose: () => {
            clearToastMessage();
          }
        });
      } else if (toastMsg.type === 'danger') {
        toast(toastMsg.msg, {
          type: toast.TYPE.ERROR,
          position: toast.POSITION.BOTTOM_CENTER,
          onClose: () => {
            clearToastMessage();
          }
        });
      }
    }
  }, [toastMsg, dispatch]);

  return (
    <div>
      <ToastContainer />
    </div>
  );
};

export default ToastifyComponent;
