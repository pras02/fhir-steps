import React,{useState, useEffect} from 'react'

const Metadata = () => {

    function useAsyncHook(searchBook) {

        const [result, setResult] = useState([]);
        const [loading, setLoading] = useState("false");
    
        useEffect(() => {
          async function fetchBookList() {
            try {
              setLoading("true");
              const response = await fetch(`${searchBook}/metadata`, {
                headers: {
                  'Accept': 'application/json'
                  // 'Content-Type': 'application/x-www-form-urlencoded',
                }
              });
              const json = await response.json();
              console.log(json);
              setResult(json.rest[0].security.extension[0].extension.map(item => {
                return item.valueUri;
              })
              );
            } catch (error) {
              setLoading("null");
            }
          }
          if (searchBook !== "") {
            fetchBookList();
          }
        }, [searchBook]);
    
        return [result, loading];
      }
    
      const [search, setSearch] = useState("");
      const [query, setQuery] = useState("");
      const [result, loading] = useAsyncHook(query);
    
      return (
        <div className="App">
          <h3>STEP 1: Fetching Authorization and Token URL from FHIR endpoint URL</h3>
          <form
            onSubmit={e => {
              e.preventDefault();
              setQuery(search);
            }}
          >
            <label>FHIR endpoint : </label>
            <input type="text" height="200" onChange={e => setSearch(e.target.value)} />
            <input type="submit" value="search" />
          </form>
          {
            loading === "false" ? (<h5>Input FHIR endpoint in the above search box</h5>)
              : loading === "null" ? (<h1>Auth and Token URL's not found!</h1>)
                : (result.map(item => { return <p key={item}>URL : {item}</p>; }))
          }
        </div>
      );
}

export default Metadata
