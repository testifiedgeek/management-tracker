import React from 'react';
import '../scss/table.scss';

export default function TableContent(props) {

    let TableData = props.content;
    let TableTitle = props.title;
    
    return (
       <table className="user_container">
            <caption id="table_caption">{TableTitle}</caption>
           <thead>

           <tr className="table_row">
                {Object.keys(TableData[0]).map((key) => {
                    return(

                <th className="table_heading">
                    {key}
                </th>
                );
                })}
            </tr>

           </thead>
            <tbody>

            

                {TableData.map((val,key) => {
                    return(
                        <tr className="table_row" key={key}>

                        {Object.values(val).map((finalval,key) => {
                            return(
                            
                            <td className="table_heading" key={key}>{finalval}</td> 
                            );
                        })}                        
                        </tr>    
                    );
                })}
                
            
            </tbody>
       
                </table>
       
    )
}
