import React from 'react'
import {create} from 'react-test-renderer';
import {ProfileStatus} from "./ProfileStatus";

describe('ProfileStatus component', ()=> {
    test('status from props should be in the state', ()=> {
        const component= create(<ProfileStatus status={'it-kamasutra'} updateStatusTC={() => {
        }}/>);
        const root=component.root
        expect(root.instance.state.status).toBe('it-kamasutra');
    })

    test(`after creation <span> should be displayed`, ()=> {
        const component= create(<ProfileStatus status={'it-kamasutra'} updateStatusTC={() => {
        }}/>);
        const root = component.root
        let span = root.findByType("span")
        expect(span).not.toBeNull()
    })

    test(`after creation <input> shouldn't be displayed`, ()=> {
        const component= create(<ProfileStatus status={'it-kamasutra'} updateStatusTC={() => {
        }}/>);
        const root = component.root
        expect(()=>{ root.findByType("input")}).toThrow()
    })

    test(`after creation <span> should contains correct status`, ()=> {
        const component= create(<ProfileStatus status={'it-kamasutra'} updateStatusTC={() => {
        }}/>);
        const root = component.root
        let span = root.findByType("span")
        expect(span.children[0]).toBe('it-kamasutra')
    })

    test(`input should be displayed in editMode instead of span`, ()=> {
        const component= create(<ProfileStatus status={'it-kamasutra'} updateStatusTC={() => {
        }}/>);
        const root = component.root
        let span = root.findByType("span")
        span.props.onDoubleClick()
        let input = root.findByType("input")
        expect(input.props.value).toBe('it-kamasutra')
    })

    test('callback should be called', () => {
        const mockCallBack = jest.fn() // тестовая функция для обработк наших вызовов колбэка
        const component = create(<ProfileStatus status="some  start status" updateStatusTC={mockCallBack}/>)
        const instance = component.getInstance()
        // @ts-ignore
        instance.deactivateActivateEditMode()
        expect(mockCallBack.mock.calls.length).toBe(1)
    })
})