import React from 'react'

function FHIRurl() {
    return (
        <div>
            {localStorage.getItem('FHIRurl')}
        </div>
    )
}

export default FHIRurl
