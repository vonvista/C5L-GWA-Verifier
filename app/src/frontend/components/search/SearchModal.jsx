import 'tailwindcss/tailwind.css';
import './SearchModal.css';

/*
SearchModal Component is a modal window which alerts user that student/user does not exist
To use this component,
(<SearchModal user={"STUDENT"} handleClose={() => setShowModal(false)}/>)   //for UserDashboard
(<SearchModal user={"USER"} handleClose={() => setShowModal1(false)}/>)   //for UserManagementPage

*/

const SearchModal = ({ user, handleClose }) => {
  return (
    <>
      {/* add user button */}
      <div className="modal-search h-screen">
        {/* content */}
        <div className="search-content">
          <div className="search-body">
            <section className="m-auto">
              <p className="text-white text-[2vw] ml-auto mr-auto mb-5 font-medium inter">
                {user} DOES NOT EXIST
              </p>
              <div className="flex">
                <button
                  className="inter text-black text-[2vw] w-2/5 ml-auto mr-auto bg-white rounded-lg hover:bg-slate-200 h-[4vw]"
                  type="button"
                  onClick={handleClose}
                >
                  OK
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchModal;
