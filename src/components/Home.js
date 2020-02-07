import React, { useState } from 'react';

const Home = () => {
  const [step1, setStep1] = useState(false);
  const [step2, setStep2] = useState(false);

  //Initial
  const [clientId, setClientId] = useState('');
  const [scope, setScope] = useState('');
  const [redirectUrl, setRedirectUrl] = useState('');
  const [fhirendpoint, setFhirendpoint] = useState('');

  // STEP 1
  const [authURL, setAuthURL] = useState('');
  const [tokenURL, setTokenURL] = useState('');
  const [authorizationURL, setAuthorizationURL] = useState('');

  async function fetchMetadata() {
    try {
      const response = await fetch(`${fhirendpoint}/metadata`, {
        headers: {
          Accept: 'application/json'
        }
      });
      const json = await response.json();
      setAuthURL(json.rest[0].security.extension[0].extension[0].valueUri);
      setTokenURL(json.rest[0].security.extension[0].extension[1].valueUri);
      setStep1(true);
    } catch (error) {}
  }

  const FrameURL = () => {
    setAuthorizationURL(
      `${authURL}?response_type=code&client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope}&aud=${fhirendpoint}`
    );
    setStep2(true);
  };

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
        }}
      >
        <label>
          client-id:
          <input
            type="text"
            placeholder="my-app-id"
            onChange={e => setClientId(e.target.value)}
          />
        </label>
        <label>
          scope:
          <input
            type="text"
            placeholder="my-app-id"
            onChange={e => setScope(e.target.value)}
          />
        </label>
        <label>
          redirect-url:
          <input
            type="text"
            placeholder="http://localhost:3004/home"
            onChange={e => setRedirectUrl(e.target.value)}
          />
        </label>
        <label>
          fhir-endpoint:
          <input
            type="text"
            placeholder="https://launch.smarthealthit.org/v/r3/sim/eyJrIjoiMSIsImIiOiJzbWFydC03Nzc3NzAxIn0/fhir"
            onChange={e => setFhirendpoint(e.target.value)}
          />
        </label>
        <br></br>
        <br></br>

        {step1 ? (
          <div>
            {/* <input type="submit" value="STEP 1 - Completed" /> */}
            <br></br>
            <input type="submit" value="STEP 2" onClick={FrameURL}></input>
          </div>
        ) : step2 ? (
          <div>
            {/* <input type="submit" value="STEP 1 - Completed" />
            <br></br>
            <input type="submit" value="STEP 2 - Completed" /> */}
          </div>
        ) : (
          <input type="submit" value="STEP 1" onClick={fetchMetadata} />
        )}

        <hr></hr>
      </form>

      <br></br>
      {authURL}

      <br></br>
      {tokenURL}

      <br></br>
      <br></br>
      <a href={authorizationURL}>{authorizationURL}</a>

      {step1}
      {step2}

      {/* {step1 ? (
          <input type="submit" value="STEP 1 - Completed" />
        ) : (
          <input type="submit" value="STEP 1" />
        )} */}
    </div>
  );
};

export default Home;
