import React, {ChangeEvent} from 'react';

type profileStatusPropsType = {
    status: string
    updateStatusTC: (status: string) => void
}

export class ProfileStatus extends React.PureComponent<profileStatusPropsType> {

    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }

    deactivateActivateEditMode = () => {
        this.setState({
            editMode: false
        });
        this.props.updateStatusTC(this.state.status)
    }

    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    componentDidUpdate(prevProps: Readonly<profileStatusPropsType>, prevState: Readonly<{}>) {
        let {status}= this.props
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: status
            })
        }
    }

    render() {
        return (
            <div>
                {this.state.editMode &&
                <input onChange={this.onStatusChange} onBlur={this.deactivateActivateEditMode} autoFocus
                       value={this.state.status}/>}
                {!this.state.editMode &&
                <span onDoubleClick={this.activateEditMode}>{this.props.status || 'No Status'}</span>}
            </div>
        )
    }
}
