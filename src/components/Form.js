import React, { useState } from 'react'

function Form() {

    const [fhirUrl, setFhirUrl] = useState('')

    const handleTEXTchange = (e) => {
        localStorage.setItem('FHIRurl', e.target.value)
        setFhirUrl(e.target.value)
    }

    const handleFETCHclick = () => {

    }

    return (
        <div>
            <form>
                <input type="text" onChange={handleTEXTchange} />
                <input type="button" value="SMART Fetch" onClick={handleFETCHclick} />
                <br></br>
                <br></br>
            </form>
        </div>
    )
}

export default Form
