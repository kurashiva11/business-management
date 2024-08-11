"use client"
import { useQuery } from 'react-query';

import ReactQueryProviderHOC from '@/components/hoc/ReactQueryProviderHOC';

const userPage = function () {
    const {data, isLoading, isError, error} = useQuery('businessInventory', async () => {
        var res = await fetch('http://localhost:8080/business?businessName=test');
        if (!res.ok) {
            throw new Error("Failed to fetch business inventory.");
        }
        return res.json();
    })

    if (isError) {
        return (
            <div>
                <h1>Failed to fetch data.</h1>
                <p>{error}</p>
            </div>
        )
    }

    return <div className="user">
        <div>this is user page.</div>
        {isLoading ? (
            <p>loading data.</p>
        ) : (
            <ul>
                {data.data.map((inventory, idx) => <li key={idx}>{inventory.name}, {inventory.description}, {inventory.price}, {inventory.availableQuantity}</li>)}
            </ul>
        )}
    </div>
}

export default ReactQueryProviderHOC(userPage);