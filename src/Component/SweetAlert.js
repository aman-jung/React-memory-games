import swal from "sweetalert2";

function SweetAlert() {
  swal({
    title: "Matched",
    text: "Do you want to continue?",
    type: "success",
    button: {
      text: "OK",
      value: true,
      visible: true,
      className: "",
      closeModal: true
    }
  });
}

export default SweetAlert;
