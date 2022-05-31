import { useState } from 'react';


/* Parent component >> frontend/pages/student-record/StudentViewRecord */

/* This function contains the contents of the tab component called "Status" */
/* Props:
    state    ---  data for the status tab will be passed here
    ...rest  ---  additional prop for backend expansion 
*/
export default function Status({ state, gpaCalc, ...rest }) {

    return(
        <div className="min-w-[25vw] max-w-[25vw] h-full max-h-[61vh] mx-auto p-5 grid box-border overflow-auto">

            {/* Academic Achievement Box */}
            <div className="border rounded-lg pt-3 4xl:py-4 pl-2.5 pr-2.5 4xl:px-4 5xl:p-7 grid row-auto">
                <h1 className="place-self-start inline text-sm 1.5xl:text-base 1.75xl:text-[19px] 5xl:text-[1.05vw] font-inter">Academic Achievement</h1>

                {/* change the academic achievement Box depending on the Final GWA of the Student -lal */ 
                    (gpaCalc.gwa.toFixed(3) > 1.20) 
                        ? (gpaCalc.gwa.toFixed(3) > 1.45) 
                            ? (gpaCalc.gwa.toFixed(3) > 1.75) 
                                ? <p className="text-2xl 1.75xl:text-4xl 5xl:text-[1.9vw] text-center text-button-green font-bold my-4 mx-0 inline-block font-inter">N/A</p> 
                                : <p className="text-2xl 1.75xl:text-4xl 5xl:text-[1.9vw] text-center text-button-green font-bold my-4 mx-0 inline-block font-inter">Cum Laude</p> 
                            : <p className="text-2xl 1.75xl:text-4xl 5xl:text-[1.9vw] text-center text-button-green font-bold my-4 mx-0 inline-block font-inter">Magna Cum Laude</p> 
                        : <p className="text-2xl 1.75xl:text-4xl 5xl:text-[1.9vw] text-center text-button-green font-bold my-4 mx-0 inline-block font-inter">Summa Cum Laude</p> 
                }
            </div>

            {/* Table for Grades */}
            <div className="font-inter text-xs 1.5xl:text-sm 1.75xl:text-[1vw] 3xl:leading-7 5xl:leading-10">
                <table className="table-auto w-full my-[2vh]">
                    <thead className="text-left">
                        <tr>
                            <th className="w-4/5">Units Toward GPA</th>
                            <th className="w-1/5">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Taken</td>
                            <td>{state.GPAUnits.taken.toFixed(3)}</td>
                        </tr>
                        <tr>
                            <td>Passed</td>
                            <td>{state.GPAUnits.passed.toFixed(3)}</td>
                        </tr>
                    </tbody>
                </table>

                <table className="table-auto w-full">
                    <thead className="text-left">
                        <tr>
                            <th className="w-4/5">Units Not For GPA</th>
                            <th className="w-1/5"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Taken</td>
                            <td>{state.NotGPAUnits.taken.toFixed(3)}</td>
                        </tr>
                        <tr>
                            <td>Passed</td>
                            <td>{state.NotGPAUnits.passed.toFixed(3)}</td>
                        </tr>
                    </tbody>
                </table>

                <table className="table-auto w-full mt-[2vh]">
                    <thead className="text-left">
                        <tr>
                            <th className="w-4/5">GPA Calculation</th>
                            <th className="w-1/5"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Total Grade Points</td>
                            <td>{gpaCalc.totalGradePoints.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>Units Taken Toward GPA</td>
                            <td>{gpaCalc.totalUnitsGPA.toFixed(2)}</td>
                        </tr>

                        <tr>
                            <td className="pt-5">GWA</td>
                            <td className="pt-5">{gpaCalc.gwa.toFixed(5)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}