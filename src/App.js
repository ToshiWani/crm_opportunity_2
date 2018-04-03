import React from 'react';
import axios from 'axios';
import getIds from './querystr';
import Forms from './Forms';
import OpportunityTable from './OpportunityTable';



export default class App extends React.Component {

    constructor(){
        super();
        this.state = {
            opportunityIds: [],
            opportunities: [],
            description: '',
            formState: {},
            postResults: []
        }
    }

    componentDidMount(){
        // Get opportunity IDs from query string
        let url = location.search;
        let ids = getIds(url);
        this.setState({opportunityIds: ids});

        // Get opportunity obj from the API
        ids.map(id=>{
            axios.get(`/api/data/v8.2/opportunities(${id})`)
                .then(res => {
                    let joined = this.state.opportunities.concat(res.data);
                    this.setState({opportunities: joined});
                })
        });
    }

    handleFormSubmit(formState){

        console.log('handleFormSubmit', formState);
        this.setState({formState: formState});

        //
        // Start closing opportunities
        //
        const headers = {
            "headers": [
                {"OData-MaxVersion": "4.0"},
                {"OData-Version": "4.0"}
            ]
        };

        this.state.opportunityIds.map(id=>{

            const opportunityClose = {
                "opportunityid@odata.bind": `/opportunities(${id})`,
                "actualend": formState.closeDate,
                "description": formState.description
            };

            const parameters = {
                "OpportunityClose": opportunityClose,
                "Status": -1
            };

            let postUrl = formState.wonLost === 'won'
                ? '/api/data/v8.2/WinOpportunity'
                : '/api/data/v8.2/LoseOpportunity';


            axios.post(postUrl, parameters, headers)
                .then(res => {
                    console.log('API res', res);
                    const result = this.state.postResults.concat({status: 'SUCCESS', opportunityId: id});
                    this.setState({postResults: result});
                })
                .catch(error => {
                    console.log('API error', error);
                    const result = this.state.postResults.concat({status: 'FAILED', opportunityId: id});
                    this.setState({postResults: result});
                });
        });

    }

    render(){
        return(
            <div className="ms-Grid">

                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-md12">
                        <h1 className="ms-font-su">Opportunity Bulk Close</h1>
                        <OpportunityTable opportunities={this.state.opportunities}/>
                    </div>
                </div>

                <hr className="ms-borderBase"/>

                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-md12 ms-lg6 ms-xl3">
                        <h2 className="ms-font-xxl">Please Enter the Parameters</h2>
                        <Forms formSubmit={this.handleFormSubmit.bind(this)} opportunities={this.state.opportunities}/>
                    </div>
                </div>

                <hr/>

                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-md12">
                        <h2 className="ms-font-xxl">Results</h2>
                        <ul>
                            {
                                this.state.postResults.map(result=>(
                                    <li key={result.opportunityId}>
                                        {result.opportunityId} ... {result.status}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>

            </div>
        )
    }
}
