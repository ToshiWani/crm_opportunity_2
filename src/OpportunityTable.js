import React from 'react';



const OpportunityTable = (props) => (
    <table className="ms-Table">
        <thead>
        <tr className="ms-font-s">
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
        </tr>
        </thead>
        <tbody>
        {
            props.opportunities.map(op=>(
                <tr className="ms-font-s" key={op.opportunityid}>
                    <td>{op.opportunityid}</td>
                    <td>{op.name}</td>
                    <td>{op.description}</td>
                </tr>
            ))
        }
        </tbody>
    </table>

);


export default OpportunityTable;