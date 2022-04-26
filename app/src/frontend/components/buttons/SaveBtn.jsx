import 'tailwindcss/tailwind.css';
import Swal from 'sweetalert2';

// Button for saving changes in Student Record View Page
const SaveBtn = () => {

  // Sweet alert text styling
  const swalStyle = Swal.mixin({
    customClass: {
      text: 'font-inter',
      inputLabel: 'font-inter',
      confirmButton: 'font-montserrat',
      cancelButton: 'font-montserrat',
    },
  })

  const ConfirmPassword = () => {
    swalStyle.fire({
      input: 'password',
      inputLabel: 'Please enter your password to confirm changes made.',
      inputPlaceholder: '******************',
      showCancelButton: true,
      confirmButtonColor: '#2A7146',
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      inputAttributes: {
        maxlength: 18,
        autocapitalize: 'off',
        autocorrect: 'off',
        background: '#ffffff'
      },
      preConfirm: (value) => {
        if (value == '') {            // Check if user did not enter a password
          swalStyle.showValidationMessage(`Password required`)

        } else {                      // If user did enter a password,
          console.log(value)          // log password value to console
        }
      }

    // Password entered is correct
    }).then((result) => {
      if (result.isConfirmed) {
        swalStyle.fire({
          text: 'Changes successfully saved.',
          icon: 'success',
          confirmButtonColor: '#2A7146',
        })
      }
    });
  }

  return (
    <>
      {/* Save Button */}
      <button
        className="
        w-1/6 h-10 bg-login-green m-2 rounded-xl text-white font-montserrat font-bold hover:shadow-lg hover:bg-login-green-hover"
        type="button"
        onClick={ConfirmPassword}
      >
        <p className="text-sm font-montserrat inline-block">Save</p>
      </button>
    </>
  );
};

export default SaveBtn;
