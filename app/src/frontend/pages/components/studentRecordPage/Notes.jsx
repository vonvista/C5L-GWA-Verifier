import { useState } from 'react';
import Verify from '../../../components/buttons/Verify'

// notes page

// props will be for placing values into the status page

// eventHandler in placed here for deletion or editing of notes


export default function Notes({eventHandler, notes}) { 

    return(
        <div className="max-w-[25vw] max-h-[41rem] mx-auto p-5 block overflow-auto">
            {
                notes.map( (data, idx) => {
                    return(
                        <div className="grid border rounded-lg p-5 mb-2" key={idx}>
                            <h1 className="text-xl inter font-bold">
                                {data.Semyear}

                            </h1>
                            {/* <h2 className="inter font-light italic">
                                {data.User} {data.createdAt}
                            </h2> */}
                            <p className="inter text-sm mt-3">
                                {data.Details}
                            </p>
                        </div>
                    )
                }
                )
            }
            
        </div>
    );
}