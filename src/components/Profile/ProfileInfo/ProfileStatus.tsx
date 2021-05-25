import React from 'react';


type profileStatusPropsType = {
    status: string
}

export class ProfileStatus extends React.Component<profileStatusPropsType> {
    state = {
        editMode: false
    }

    activateEditMode() {
        this.setState({
            editMode: true
        })
    }

    deactivateActivateEditMode() {
        this.setState({
            editMode: false
        })
    }

    render() {
        return (
            <div>
                {this.state.editMode && <input onBlur={this.deactivateActivateEditMode.bind(this)} autoFocus value={this.props.status}/>}
                {!this.state.editMode && <span onDoubleClick={this.activateEditMode.bind(this)}>{this.props.status}</span>}
            </div>
        )
    }
}
