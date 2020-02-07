import React from 'react';
import axios from 'axios';
import qs from 'querystring'

function Codeurl() {
  const code = window.location.href.split('?code=')[1];
  console.log(code);

  let postUrl =
    'https://launch.smarthealthit.org/v/r3/sim/eyJrIjoiMSIsImIiOiJzbWFydC03Nzc3NzAxIn0/auth/token';

  var reqData = {
    grant_type: 'authorization_code',
    code:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjb250ZXh0Ijp7Im5lZWRfcGF0aWVudF9iYW5uZXIiOnRydWUsInNtYXJ0X3N0eWxlX3VybCI6Imh0dHBzOi8vbGF1bmNoLnNtYXJ0aGVhbHRoaXQub3JnL3NtYXJ0LXN0eWxlLmpzb24iLCJwYXRpZW50Ijoic21hcnQtNzc3NzcwMSIsImVuY291bnRlciI6InNtYXJ0LTk4MyJ9LCJjbGllbnRfaWQiOiJhcHAtY2xpZW50LWlkIiwic2NvcGUiOiJsYXVuY2ggbGF1bmNoL3BhdGllbnQgcGF0aWVudC9yZWFkIG9mZmxpbmVfYWNjZXNzIG9wZW5pZCBmaGlyVXNlciIsInVzZXIiOiJQYXRpZW50L3NtYXJ0LTc3Nzc3MDEiLCJpYXQiOjE1ODA3MjU1ODIsImV4cCI6MTU4MDcyNTg4Mn0.cNN7wqBk385eD7TVCU1c46acmPGZhwzaX90wOtBqXGg',
    redirect_uri: 'http://localhost:3000/tokenurl',
    client_id: 'app-client-id'
  };

  var config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };

  async function gettoken(postUrl) {
    await axios
      .post(postUrl, qs.stringify(reqData), config)
      .then(result => {
        console.log('\n\n The access token is\n\n' + result.data.access_token);
        // accesstoken = result.data.access_token;
        // console.log(result.data.access_token);
      })
      .catch(err => {
        console.log(err);
      });
  }
  console.log('Executing func');
  gettoken(postUrl);
  console.log('Exec completed');

  return <div>{code}</div>;

  //   const [postUrl, setPostUrl] = useState('');
  //   const code = window.location.href.split("?code=")[1]

  //   return (
  //     <div>
  //       {code}

  //       <hr></hr>
  //       <br></br>
  //       <form
  //         onSubmit={e => {
  //           e.preventDefault();

  //           async function gettoken(postUrl) {
  //             await axios
  //               .post(postUrl, {
  //                 headers: {
  //                   'Content-Type': 'application/x-www-form-urlencoded'
  //                 },
  //                 body: {
  //                   grant_type: 'authorization_code',
  //                   code: code,
  //                   redirect_uri: 'http://localhost:3000/tokenurl',
  //                   client_id: 'app-client-id'
  //                 }
  //               })
  //               .then(result => {
  //                 console.log('\n\n The access token is\n\n');
  //                 // accesstoken = result.data.access_token;
  //                 // console.log(result.data.access_token);
  //               })
  //               .catch(err => {
  //                 console.log(err);
  //               });
  //           }

  //           gettoken(postUrl);
  //         }}
  //       >
  //         <label>CODE : </label>
  //         <input
  //           type="text"
  //         //   placeholder="CODE"
  //         //   onChange={e => setCode(e.target.value)}
  //         />
  //         <br></br>

  //         <label>TOken URL : </label>
  //         <input
  //           type="text"
  //           placeholder="https://launch.smarthealthit.org/v/r3/sim/eyJrIjoiMSIsImIiOiJzbWFydC03Nzc3NzAxIn0/auth/token"
  //           onChange={e => setPostUrl(e.target.value)}
  //         />
  //         <br></br>

  //         <label>grant_type: </label>
  //         <input type="text" vaule="authorization_code" />
  //         <br></br>

  //         <label>redirect_uri: </label>
  //         <input type="text" placeholder="http://localhost:3000/tokenurl" />
  //         <br></br>

  //         <label>client_id: </label>
  //         <input type="text" placeholder="app-client-id" />
  //         <br></br>

  //         <br></br>
  //         <input type="submit" value="Exchange CODE" />
  //         <br></br>
  //       </form>
  //     </div>
  //   );
}

export default Codeurl;
