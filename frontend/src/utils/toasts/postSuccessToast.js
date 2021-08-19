import { toast } from 'react-toastify'

const postSuccessToast = displayMessage =>
  toast.success(displayMessage, {
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
  })

export default postSuccessToast
