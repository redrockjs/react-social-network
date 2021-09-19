import React from "react";

export class ProfileStatus extends React.Component {

    state = {
        editMode: false,
        status: this.props.profilePage.statusText
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.status != this.props.status){
            this.setState({status : this.props.status});
        }
    }

    activateEditMode = () => {
        this.props.authPage.authUserId !== this.props.profilePage.profile.userId
            ? this.setState({editMode: false})
            : this.setState({editMode: true})
    }

    deactivateEditMode = (e) => {
        this.setState({editMode: false});
        this.props.updateProfileStatus(this.state.status);
    }

    statusChange = (e) => {
        this.setState({status: e.currentTarget.value}
        )
    }

    render() {
        return (
            <div>
                {!this.state.editMode
                    ?
                    <div>
                        Статус: <span onDoubleClick={ this.activateEditMode }> {this.props.profilePage.statusText || "статус отсутствует"} </span>
                    </div>
                    :
                    <div>
                        Статус: <input autoFocus={true} onBlur={this.deactivateEditMode} onChange={this.statusChange}
                                       value={this.state.status}/>
                    </div>
                }
            </div>
        )
    }
}