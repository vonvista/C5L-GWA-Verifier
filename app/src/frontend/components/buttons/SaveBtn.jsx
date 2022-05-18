import 'tailwindcss/tailwind.css';
import Swal from 'sweetalert2';


// This button component is used for saving changes in Student Record Page
const SaveBtn = ({ handleSave, isDisabled }) => {

  // // Sweet alert text styling
  // const swalStyle = Swal.mixin({
  //   customClass: {
  //     text: 'font-inter',
  //     inputLabel: 'font-inter',
  //     confirmButton: 'font-montserrat',
  //     cancelButton: 'font-montserrat',
  //   },
  // })

  // const ConfirmPassword = () => {
  //   swalStyle.fire({
  //     input: 'password',
  //     inputLabel: 'Please enter your password to confirm changes made.',
  //     inputPlaceholder: '******************',
  //     showCancelButton: true,
  //     confirmButtonColor: '#2A7146',
  //     confirmButtonText: 'Confirm',
  //     cancelButtonText: 'Cancel',
  //     inputAttributes: {
  //       maxlength: 18,
  //       autocapitalize: 'off',
  //       autocorrect: 'off',
  //       background: '#ffffff'
  //     },
  //     preConfirm: (value) => {
  //       if (value == '') {            // Check if user did not enter a password
  //         swalStyle.showValidationMessage(`Password required`)

  //       } else {                      // If user did enter a password,
  //         console.log(value)          // log password value to console
  //       }
  //     }

  //   // Password entered is correct
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       swalStyle.fire({
  //         text: 'Changes successfully saved.',
  //         icon: 'success',
  //         confirmButtonColor: '#2A7146',
  //       })
  //     }
  //   });
  // }

  return (
    <>
      {/* Save Button */}
      <div className="mt-4">
          <button
              type="submit"
              className="text-sm font-inter font-medium inline-flex justify-center rounded-md border border-transparent bg-login-green px-4 py-2 text-white transition-all ease-out delay-200 hover:transition-all hover:ease-in hover:delay-200 hover:bg-login-green-hover disabled:bg-sr-disabled-green disabled:hover:bg-sr-disabled-green"
              onClick={handleSave}
              // onClick={confirmPassword}
              disabled={isDisabled}
          >
              Save
          </button>
      </div>
</>
  );
};

export default SaveBtn;
