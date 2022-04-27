import { useState } from 'react';
import Verify from '../../../components/buttons/Verify'

// status page

// props will be for placing values into the status page

export default function Status({state, ...rest}) {

    return(
        <div className="min-w-[25vw] max-w-[25vw] mx-auto p-5 block overflow-auto">
            {/* Academic Achievement Box */}
            <div className="border rounded-lg p-4 grid row-auto">
                <h1 className="place-self-start inline inter">Academic Achievement</h1>
                <p className="text-4xl text-center text-login-green font-bold my-4 mx-0 inline-block inter">Summa Cum Laude</p> 
            </div>
            {/* Table for Grades */}
            <div className="inter text-sm">
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
                            <td>{state.GPACalc.totalGradePoints.toFixed(3)}</td>
                        </tr>
                        <tr>
                            <td>Units Taken Toward GPA</td>
                            <td>{state.GPACalc.totalUnitsGPA.toFixed(3)}</td>
                        </tr>

                        <tr>
                            <td className="pt-5">Total</td>
                            <td className="pt-5">{state.GPACalc.totalGWA.toFixed(3)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            {/* Verify Button */}
            <div className="mt-[42%] ld:mt-[34%] mb-0">
                <Verify isDisabled={false}/>
            </div>
        </div>
    );
}