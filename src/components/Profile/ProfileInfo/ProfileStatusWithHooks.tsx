import React, {ChangeEvent, useEffect, useState} from 'react';

type ProfileStatusWithHooksPropsType = {
    status: string
    updateStatusTC: (status: string) => void
}

export const ProfileStatusWithHooks = React.memo((props: ProfileStatusWithHooksPropsType) => {

    let [editMode, setEditMode] = useState<boolean>(false)
    let [status, setStatus] = useState<string>(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true)
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
                <span onDoubleClick={activateEditMode}>{props.status || 'No Status'}</span>
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

