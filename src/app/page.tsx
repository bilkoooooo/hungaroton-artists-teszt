import React, {Suspense} from 'react';
import ArtistsPage from "@/src/components/ArtistPage";

export default function App() {

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ArtistsPage/>
        </Suspense>
    )
}