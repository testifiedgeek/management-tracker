import React from 'react';
import '../scss/table.scss';

export default function TableContent(props) {

    let TableHeadings = props.title;
    let TableData = props.content;

    
    return (
       <table className="user_container">

           <thead>

            <tr>
                {TableHeadings.map((val,key) => {
                    return(
                        <th key={key} className="table_heading">{val}</th>
                    );
                })}
            </tr>

           </thead>
            <tbody>

                {TableData.map((val,key) => {
                    return(
                        <tr key={key}>


                        <td className="table_heading">{val.key1}</td>
                        <td className="table_heading">{val.key2}</td>
                        <td className="table_heading">{val.key3}</td>
                        <td className="table_heading">{val.key4}</td>
                        
                        </tr>


                    );
                })}
            
            </tbody>
       
                </table>
       
    )
}
