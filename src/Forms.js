import React from 'react';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { DatePicker } from 'office-ui-fabric-react/lib/DatePicker';


export default class Forms extends React.Component {
    constructor(props){
        super(props);
        initializeIcons();

        this.handleWonLostChange = this.handleWonLostChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleReasonChange = this.handleReasonChange.bind(this);
        this.handleDateChance = this.handleDateChance.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);

        this.state = {
            description: '',
            wonLost: 'won',
            closeDate: new Date(),
            reason: 0,
            error: '',
        };
    }

    componentDidMount(){
    }

    handleReasonChange(item){
        this.setState({reason: item.key});
    }

    handleWonLostChange(item){
        this.setState({wonLost: item.key});
    }

    handleDescriptionChange(item){
        this.setState({description: item});
    }

    handleDateChance(date){
        this.setState({closeDate: date});
    }


    handleOnClick(){
        if (this.state.description){
            this.setState({error: ''});
            this.props.formSubmit(this.state);

        } else {
            this.setState({error: 'Please enter description'});
        }
    }

    render(){
        return(
            <Fabric>
                <ChoiceGroup
                    defaultSelectedKey='won'
                    options={
                        [
                            {key: 'won', text: 'Won'},
                            {key: 'lost', text: 'Lost'}
                        ]
                    }
                    onChange={ (ev, item) => this.handleWonLostChange(item) }
                    required={ true }
                    selectedKey={this.state.wonLost}
                />
                <Dropdown
                    placeHolder='Reason'
                    label='Reason'
                    options={
                        [
                            { key: 0, text: 'Bad data' },
                            { key: 1, text: 'Unable to contact' },
                        ]
                    }
                    onChanged={this.handleReasonChange}
                    defaultSelectedKey={this.state.reason}
                />
                <DatePicker
                    label='Closing Date'
                    isRequired={ true }
                    allowTextInput={ false }
                    onSelectDate={ this.handleDateChance }
                    value={this.state.closeDate}
                />
                <TextField
                    label='Description'
                    multiline
                    rows={ 4 }
                    required={ true }
                    onChanged={this.handleDescriptionChange}
                />

                <PrimaryButton onClick={this.handleOnClick}>
                    Submit
                </PrimaryButton>


                <pre>{ this.state.wonLost }</pre>
                <pre>{ this.state.closeDate.toDateString()}</pre>
                <pre>{ this.state.reason}</pre>
                <pre>{ this.state.description}</pre>
                <pre>{ this.state.error}</pre>
            </Fabric>
        )
    }
}



