import { useReducer } from 'react';

export default (initState: any) => {
    const _reducer = (state: any, props: any) => ({
        ...state,
        ...props,
    });

    const [state, dispatch] = useReducer(_reducer, initState);

    return [state, dispatch];
};
