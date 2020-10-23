import React, { useContext } from "react";
import AlertContext from "../../context/alert/alertContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Alerts = () => {
  const alertContext = useContext(AlertContext);

  if (alertContext.alerts.length > 0) {
    alertContext.alerts.map(alert =>
      toast.error(alert.msg, {
        position: "top-center",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
    );
  }

  return <ToastContainer />;
};

export default Alerts;
