import React from "react";
import {create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe ("Profile status component", () => {
    test("status from props should be in the state", () => {
        const component = create(<ProfileStatus status="itcam"/>);
        const instance = component.getInstance();
        expect(instance.state.status).toBe("itcam");
    });
    test("after creation span should be displayed", async () => {
        const component = create(<ProfileStatus status="itcam"/>);
        const root = component.root;
        let span = await root.findByType("span");
        expect(span).not.toBeNull();
    });
    test("after creation span contains correct status", async() => {
        const component = create(<ProfileStatus status="itcam"/>);
        const root = component.root;
        let span = await root.findByType("span");
        expect(span.children[0]).toBe('itcam');
    });
    test("input should be displayed in editMode instead of span", async() => {
        const component = create(<ProfileStatus status="itcam"/>);
        const root = component.root;
        let span = await root.findByType("span");
        span.props.onDoubleClick()
        let input = await root.findByType("input");
        expect(input.props.value).toBe('itcam');
    });

    test("callback should be called",() => {
        const mockCallback = jest.fn()
        const component = create(<ProfileStatus status="itcam" updateStatus={mockCallback}/>);
        const instance = component.getInstance();
        instance.deactivateEditMode()
        expect(mockCallback.mock.calls.length).toBe(1);
    });
})