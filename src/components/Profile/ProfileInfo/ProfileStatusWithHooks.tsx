import React, {ChangeEvent, useEffect, useState} from 'react';

type ProfileStatusWithHooksPropsType = {
    status: string
    updateStatusTC: (status: string) => void
    isOwner: boolean
}

export const ProfileStatusWithHooks = React.memo((props: ProfileStatusWithHooksPropsType) => {

    let [editMode, setEditMode] = useState<boolean>(false)
    let [status, setStatus] = useState<string>(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        props.isOwner && setEditMode(true)
    }
    const deactivateActivateEditMode = () => {
        setEditMode(false)
        props.updateStatusTC(status)
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div>
            {!editMode &&
            <div>
                <span onDoubleClick={activateEditMode}><b>Status: </b>{props.status || 'No Status'}</span>
            </div>
            }
            {editMode &&
            <div>
                <input autoFocus onBlur={deactivateActivateEditMode} onChange={onStatusChange} value={status}/>
            </div>
            }

        </div>
    )
})

