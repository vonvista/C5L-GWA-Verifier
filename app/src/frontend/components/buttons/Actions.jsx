import 'tailwindcss/tailwind.css';
import { PencilIcon, TrashIcon } from '@heroicons/react/solid';


/* Parent component >> frontend/components/table/List */

/* This function contains the Actions buttons (edit and delete) */
/* Props:
    handleEdit      --- handles click event for edit button
    handleDelete    --- handles click event for delete button
    data            --- receives user data
*/
const Actions = ({ handleEdit, handleDelete, data }) => {
    const buttons = `w-[2vw] h-[2vw] transition ease-out duration-150 hover:transition hover:ease-in hover:duration-200 hover:bg-gray-300 rounded-3xl bg-zinc-200 relative mx-1 grow`; // styling of button
    const iconStyle = `text-[#666666] h-[1.5vw] transition ease-out duration-150 hover:transition hover:ease-in hover:duration-200 m-auto hover:fill-black`;

    return (
        <div className="mx-auto w-auto items-center justify-items-center inline-block">
            {/* Edit button */}
            <button className={buttons} type="button" onClick={handleEdit}>
                <PencilIcon className={iconStyle} />
            </button>

            {/* Delete button */}
            {data && data.Role === 'admin' ? (            /* This is for user management page lang -vov */
                <></>
            ) : (
                <button className={buttons} type="button" onClick={handleDelete}>
                    <TrashIcon className={iconStyle} />
                </button>
            )}
        </div>
    );
};


export default Actions;