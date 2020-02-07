import React, { useState } from 'react';
import '../App.css';

const Authorization = () => {
  const [authUrl, setAuthUrl] = useState('');
  const [responsetype, setResponseType] = useState('');
  const [clientId, setClientId] = useState('');
  const [redirectUri, setRedirectUri] = useState('');
  const [scope, setScope] = useState('');
  const [aud, setAud] = useState('');

  const [query, setQuery] = useState('');
  //   const [result, loading] = useAsyncHook(query);

  return (
    <div className="Auth">
      <h3>
        STEP 2: Framing the Authorization URL with paramaters for Authentication
        with server
      </h3>
      <form
        onSubmit={e => {
          e.preventDefault();
          setQuery(
            authUrl +
              '?response_type=' +
              responsetype +
              '&client_id=' +
              clientId +
              '&redirect_uri=' +
              redirectUri +
              '&scope=' +
              scope +
              '&aud=' +
              aud
          );
        }}
      >
        <label>Authorization URL : </label>
        <input
          type="text"
          placeholder="https://launch.smarthealthit.org/v/r3/sim/eyJrIjoiMSIsImIiOiJzbWFydC03Nzc3NzAxIn0/auth/authorize"
          onChange={e => setAuthUrl(e.target.value)}
        />
        <br></br>
        <label>response_type: </label>
        <input
          type="text"
          placeholder="code"
          onChange={e => setResponseType(e.target.value)}
        />
        <br></br>
        <label>client_id: </label>value
        <input
          type="text"
          placeholder="app-client-id"
          onChange={e => setClientId(e.target.value)}
        />
        <br></br>
        <label>redirect_uri: </label>
        <input
          type="text"
          placeholder="http://localhost:3000/codeurl"
          onChange={e => setRedirectUri(e.target.value)}
        />
        <br></br>
        <label>scope: </label>
        <input
          type="text"
          placeholder="launch launch/patient patient/read offline_access openid fhirUser"
          onChange={e => setScope(e.target.value)}
        />
        <br></br>
        <label>aud: </label>
        <input
          type="text"
          placeholder="https://launch.smarthealthit.org/v/r3/sim/eyJrIjoiMSIsImIiOiJzbWFydC03Nzc3NzAxIn0/fhir"
          onChange={e => setAud(e.target.value)}
        />
        <br></br>
        <br></br>
        <input type="submit" value="Frame URL" />
        <br></br>
      </form>
      {/* {
            loading === "false" ? (<h5>Fill in the paramaters</h5>)
              : loading === "null" ? (<h1>!!!</h1>)
                : (result.map(item => { return <p key={item}>URL : {item}</p>; }))
          } */}

      <a href={query}>{query}</a>
    </div>
  );
};

export default Authorization;
