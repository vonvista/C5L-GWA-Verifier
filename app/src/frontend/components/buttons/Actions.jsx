import 'tailwindcss/tailwind.css';

// Function contains the Actions buttons (edit and delete)

// PROPS:
// handleEdit, handleDelete: function to handle click event

const Actions = ({ handleEdit, handleDelete, data }) => {
  const buttons = `w-[2vw] h-[2vw] hover:bg-gray-300 rounded-3xl bg-zinc-200 relative mx-1 grow`; // styling of button

  return (
    <div className="mx-auto w-auto items-center justify-items-center inline-block">
      {/* edit */}
      <button className={buttons} type="button" onClick={handleEdit}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="[1.5vw] h-[1.5vw] m-auto hover:fill-black"
          viewBox="0 0 20 20"
          fill="rgb(107 114 128)"
        >
          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
        </svg>
      </button>
      {/* delete */}
      {/* This is for user management page lang -vov */}
      {data && data.Role === 'admin' ? (
        <></>
      ) : (
        <button className={buttons} type="button" onClick={handleDelete}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="[1.5vw] h-[1.5vw] m-auto hover:fill-black"
            viewBox="0 0 20 20"
            fill="rgb(107 114 128)"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Actions;
