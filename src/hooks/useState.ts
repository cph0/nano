import { _render } from '../core';
import { _state } from '../state'

export const useState = (state: any, id: string, comp: (() => any) | undefined = undefined) => {
    const s = {
        setState(state: any) {
            if (state !== null) _state.set(id, state);


            if (comp) {
                const oldElements = [...comp.prototype._elements];

                // clear
                comp.prototype._elements = [];

                let el = comp();
                el = _render(el);
                const arr = Array.isArray(el) ? el : [el];
                comp.prototype._elements = [...arr];

                // console.log('old: ', oldElements)
                // console.log('new: ', this.elements)

                // get valid parent node
                const parent = oldElements[0].parentElement as HTMLElement;

                // make sure we have a parent
                if (!parent) console.warn('Component needs a parent element to get updated!');

                // add all new node elements
                comp.prototype._elements.forEach((child: HTMLElement) => {
                    parent.insertBefore(child, oldElements[0]);
                });

                // remove all elements
                oldElements.forEach((child: HTMLElement) => {
                    child.remove();
                    // @ts-ignore
                    child = null;
                });
            }

        },
        get state() {
            return _state.get(id)
        }
    }

    if (!_state.has(id)) _state.set(id, state)

    return [s.state, s.setState]
}

export const getState = (id: string) => {
    return _state.get(id)
}

export const setState = (id: string, state: any) => {
    return _state.set(id, state)
}
