import { useState } from 'react';
import Verify from 'frontend/components/buttons/Verify'

// Component for status tab
// -- state : data for the status tab will be passed here
// -- ...rest : additional prop for backend expansion 

export default function Status({ state, gpaCalc, ...rest }) {

    return(
        <div className="min-w-[25vw] max-w-[25vw] h-full mx-auto p-5 grid box-border overflow-auto">
            {/* Academic Achievement Box */}
            <div className="border rounded-lg p-4 grid row-auto">
                <h1 className="place-self-start inline text-lg inter">Academic Achievement</h1>
                {/* change the academic achievement Box depending on the Final GWA of the Student -lal */ 
                    (gpaCalc.gwa.toFixed(3) > 1.20) 
                        ? (gpaCalc.gwa.toFixed(3) > 1.45) 
                            ? (gpaCalc.gwa.toFixed(3) > 1.75) 
                                ? <p className="text-4xl text-center text-button-green font-bold my-4 mx-0 inline-block inter">N/A</p> 
                                : <p className="text-4xl text-center text-button-green font-bold my-4 mx-0 inline-block inter">Cum Laude</p> 
                            : <p className="text-4xl text-center text-button-green font-bold my-4 mx-0 inline-block inter">Magna Cum Laude</p> 
                        : <p className="text-4xl text-center text-button-green font-bold my-4 mx-0 inline-block inter">Summa Cum Laude</p> 
                }
            </div>
            {/* Table for Grades */}
            <div className="inter text-md">
                <table className="table-auto w-full my-5">
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

                <table className="table-auto w-full my-5">
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

                <table className="table-auto w-full my-5">
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
            
            {/* Verify Button */}
            <div className="self-end">
                <Verify isDisabled={false}/>
            </div>
        </div>
    );
}