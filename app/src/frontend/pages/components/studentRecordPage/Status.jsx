import { useState } from 'react';
import Verify from '../../../components/buttons/Verify'

// status page

// props will be for placing values into the status page

export default function Status(props) {

    return(
        <div className="w-full mx-auto p-7 block">
            {/* Academic Achievement Box */}
            <div className="border rounded-lg p-4 grid row-auto">
                <h1 className="place-self-start inline">Academic Achievement</h1>
                <p className="text-4xl text-center text-login-green font-bold my-4 mx-0 inline-block">Summa Cum Laude</p> 
            </div>
            {/* Table for Grades */}
            <div>
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
                        <td>33.000</td>
                    </tr>
                    <tr>
                        <td>Passed</td>
                        <td>33.000</td>
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
                        <td>33.000</td>
                    </tr>
                    <tr>
                        <td>Passed</td>
                        <td>33.000</td>
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
                        <td>33.000</td>
                    </tr>
                    <tr>
                        <td>Units Taken Toward GPA</td>
                        <td>33.000</td>
                    </tr>

                    <tr>
                        <td className="pt-5">Total</td>
                        <td className="pt-5">1.000</td>
                    </tr>
                </tbody>
            </table>
            </div>
            
            {/* Verify Button */}
            <div>
                <Verify isDisabled={false}/>
            </div>
        </div>
    );
}