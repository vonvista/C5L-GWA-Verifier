import { useState } from 'react';
import Verify from '../../../components/buttons/Verify'

// notes page

// props will be for placing values into the status page

// eventHandler in placed here for deletion or editing of notes


export default function Notes({eventHandler, notes}) { 

    return(
        <div className="w-full h-[70vh] h-max-[70vh] mx-auto p-7 block overflow-auto">
            {
                notes.map( (data, idx) => {
                    return(
                        <div className="grid border rounded-lg p-5 mb-2" key={idx}>
                            <h1 className="text-2xl font-bold">
                               {data.sem}

                            </h1>
                            <h2 className="font-light italic">
                                {data.author} {data.date}
                            </h2>
                            <p className="mt-3">
                                {data.content}
                            </p>
                        </div>
                    )
                }
                )
            }
            
        </div>
    );
}