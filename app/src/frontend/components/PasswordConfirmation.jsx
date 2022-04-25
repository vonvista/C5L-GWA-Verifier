import 'tailwindcss/tailwind.css';
import './PasswordConfirmation.css';
import Swal from 'sweetalert2';

const ConfirmPassword = () => {

  // Sweet alert styling
  const swalStyle = Swal.mixin({
    customClass: {
      text: 'inter',
      inputLabel: 'inter',
      confirmButton: 'montserrat',
      cancelButton: 'montserrat',
    },
  })

  const openSweetAlert = () => {
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
        autocorrect: 'off'
      },
      inputValidator: (value) => {                // Checks if user entered a password
        // console.log("Result: " + value);
        if (!value) return 'Password required'
        else return null
      }
      // preConfirm: () => {
      //   return fetch(``)  // Verify password here
      //   .then(response => response.json())
      //   .catch(err => {
      //     Swal.showValidationMessage(
      //       `Password required`
      //     )
      //   })
      // }

    // Password entered is correct
    }).then((result) => {
      if (result.isConfirmed) {
        swalStyle.fire({
          text: 'Changes successfully saved.',
          icon: 'success',
          confirmButtonColor: '#2A7146',
        })
      }
    })
  }

  return (
    <>
      {/* Save Changes Button */}
      <button
        className="
        w-1/6 h-10 bg-login-green m-2 rounded-xl text-white font-montserrat font-bold hover:shadow-lg hover:bg-login-green-hover"
        type="button"
        onClick={openSweetAlert}
      >
        <p className="text-sm font-montserrat inline-block">Save Changes</p>
      </button>
    </>
  );
};

export default ConfirmPassword;
