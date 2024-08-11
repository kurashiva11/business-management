import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';

export default (WrappedComponent: any) => {
    const queryClient = new QueryClient();
    class ReactQueryProviderHOC extends React.Component {
        render () {
            return (
                <QueryClientProvider client={queryClient} contextSharing={true}>
                    <WrappedComponent />
                </QueryClientProvider>
            )
        }
    }

    return ReactQueryProviderHOC;
}