import React, { createContext, useContext } from 'react';
import { useZustandStore } from '../store/store';

const WorkflowContext = createContext<ReturnType<typeof useZustandStore> | null>(null);

export const WorkflowProvider: React.FC = ({ children }) => {
    const store = useZustandStore();
    return <WorkflowContext.Provider value={store}>{children}</WorkflowContext.Provider>;
};

export const useWorkflowStore = () => {
    const store = useContext(WorkflowContext);
    if (!store) {
        throw new Error('Missing WorkflowContext.Provider in the tree');
    }
    return store;
};

export function useStore<T>(selector: (state: ReturnType<typeof useZustandStore>) => T): T {
    const store = useContext(WorkflowContext);
    if (!store) {
        throw new Error('Missing WorkflowContext.Provider in the tree');
    }
    return selector(store.getState());
}
