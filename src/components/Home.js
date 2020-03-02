import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Extensions from './Extensions'

import qs from 'qs';

import '../App.css';

const Home = () => {
  const [fhirUrl, setFhirUrl] = useState('');
  const [authUrl, setAuthUrl] = useState('');
  const [tokenUrl, setTokenUrl] = useState('');
  const [loginUrl, setLoginUrl] = useState('');
  const [code, setCode] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [resource, setResource] = useState([]);
  const [listURLs, setListURLs] = useState([])

  const parm1 = 'response_type=code';
  const parm2 = 'client_id=id123';
  const parm3 = 'redirect_uri=http://localhost:3000/Home';
  const parm4 =
    'scope=launch launch/patient patient/read offline_access openid fhirUser';

  useEffect(() => {
    setLoginUrl(
      `${authUrl}?${parm1}&${parm2}&${parm3}&${parm4}&aud=${fhirUrl}`
    );
  }, [authUrl]);

  const ENDPOINT = () => {
    return <div>{localStorage.getItem('fhirUrl')}</div>;
  };

  const AUTHURL = () => {
    return <div>{localStorage.getItem('authUrl')}</div>;
  };

  const TOKENURL = () => {
    return <div>{localStorage.getItem('tokenUrl')}</div>;
  };

  const LOGINURL = () => {
    if (authUrl) {
      return (
        <div style={{ color: 'red' }}>
          <a href={loginUrl}>LOGIN TO FHIR AUTHORIZATION SERVER.</a>
        </div>
      );
    } else if (code) {
      return 'Authentication Completed';
    } else {
      return 'Waiting for Authorization';
    }
  };

  const CODE = () => {
    const checkcode = window.location.href;
    try {
      setCode(checkcode.split('?code=')[1]);
    } catch (error) { }

    if (code) {
      return (
        <div>
          <h4>Authorization accepted, Below is the CODE</h4>
          <textarea cols="150" rows="5">
            {code}
          </textarea>
        </div>
      );
    } else {
      return 'waitng for authorization to complete';
    }
  };

  const POST = () => {
    if (code) {
      return (
        <div>
          <button onClick={handlePOSTclick}>
            Click to Exchange above CODE for TOKEN
          </button>
          <br></br>
          <br></br>
          <textarea cols="150" rows="15">
            {accessToken}
          </textarea>
        </div>
      );
    } else {
      return 'waiting for code';
    }
  };

  const RESOURCE = () => {
    var listURLs = []
    if (accessToken) {
      axios({
        method: 'get',
        url: `${localStorage.getItem('fhirUrl')}/Patient`,
        headers: { Authorization: `Bearer ${accessToken}` }
      })
        .then(resp => {
          setResource(resp.data.entry)
          listURLs = resource.map((items) => <li>{items}</li>)          
        })
        .catch(errfinal => { });
      return listURLs
    } else {
      return 'waiting for access_token';
    }
  }

  const handlePOSTclick = () => {
    async function handlePOST() {
      const requestBody = {
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: 'http://localhost:3000/Home',
        client_id: 'app-client-id'
      };
      const config = {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      };
      let posturl = localStorage.getItem('tokenUrl');
      const result = await axios
        .post(posturl, qs.stringify(requestBody), config)
        .then(resp => {
          setAccessToken(resp.data.access_token);
        })
        .catch(err => {
          setAccessToken(err + '\n Authorization CODE might have expired');
        });
    }
    handlePOST();
  };

  async function handleFETCHclick() {
    try {
      const response = await fetch(`${fhirUrl}/metadata`, {
        headers: { Accept: 'application/json' }
      });
      const json = await response.json();

      setAuthUrl(json.rest[0].security.extension[0].extension[0].valueUri);
      localStorage.setItem(
        'authUrl',
        json.rest[0].security.extension[0].extension[0].valueUri
      );

      setTokenUrl(json.rest[0].security.extension[0].extension[1].valueUri);
      localStorage.setItem(
        'tokenUrl',
        json.rest[0].security.extension[0].extension[1].valueUri
      );
    } catch (error) { }
  }

  const handleTEXTchange = e => {
    setFhirUrl(e.target.value);
    localStorage.setItem('fhirUrl', e.target.value);
  };

  const handleCLEARclick = () => {
    localStorage.clear();
  };

  return (
    <div>
      <form>
        <input type="text" onChange={handleTEXTchange} />
        <input type="button" value="SMART Fetch" onClick={handleFETCHclick} />
        <input type="button" value="CLEAR URL's" onClick={handleCLEARclick} />
        <br></br>
        <br></br>
      </form>
      <hr></hr>
      <ENDPOINT></ENDPOINT>
      <AUTHURL></AUTHURL>
      <TOKENURL></TOKENURL>

      <Extensions authUR='testauth'></Extensions>
      <hr></hr>

      <h3>Step-1: App asks for authorization, asking for end-user input</h3>
      <LOGINURL></LOGINURL>
      <hr></hr>

      <h3>Step-2: EHR evaluates authorization request and provides CODE</h3>
      <CODE></CODE>
      <hr></hr>

      <h3>Step-3: App exchanges authorization code for access token</h3>
      <POST></POST>
      <hr></hr>

      <h3>Step 4: App accesses clinical data via FHIR API</h3>
      <RESOURCE></RESOURCE>
    </div>
  );
};

export default Home;
