import Head from 'next/head'
import Fetch from "isomorphic-unfetch"
import styles from '../styles/Home.module.css'
import Link from "next/link"
import { useState, useEffect } from 'react';
const defaultEndpoint = `https://rickandmortyapi.com/api/character/`;

export async function getServerSideProps() {
  const res = await fetch(defaultEndpoint)
  const data = await res.json();
  return {
    props: {
      data
    }
  }
}
//const { results = [] } = data;

export default  function Home({data}){
  const {info, results: defaultResults = []} = data;
  const [results,updateResults]=useState(defaultResults);
  const [page, updatePage] = useState({
    ...info,
    current: defaultEndpoint
  });
  const { current } = page;

useEffect(() => {
  if ( current === defaultEndpoint ) return;

  async function request() {
    const res = await fetch(current)
    const nextData = await res.json();

    updatePage({
      current,
      ...nextData.info
    });

    if ( !nextData.info?.prev ) {
      updateResults(nextData.results);
      return;
    }

    updateResults(prev => {
      return [
        ...prev,
        ...nextData.results
      ]
    });
  }

  request();
}, [current]);

function handlerResult(){
  updatePage(prev=>{
    return{
    ...prev,
    current:page?.next
    }
  }
  )
}
function handleSearch(e){
e.preventDefault();
const { currentTarget = {} } = e;
const fields = Array.from(currentTarget?.elements);//e= all form element we have which is input and Button

const fieldQuery = fields.find(field => field.name === 'query');//input name value

const value = fieldQuery.value || '';

const endpoint = `https://rickandmortyapi.com/api/character/?name=${value}`;

updatePage({
  current: endpoint
});
}
  //console.log('data',data)
  return(<div className={styles.container}>
<div>

<div className={styles.card}>
<h1 className="text_center">Rick and Morty</h1>
<form className="search" onSubmit={handleSearch}>
  <input name="query" type="search" />
  <button  className="btn">Search</button>
</form>
</div>
<div className={styles.grid}>

{results.map(result=>{
  const {id,name, image}=result;
  return(

    <ul key={id}  className={styles.card}>
    <Link href="/character/[id]" as={`/character/${id}`} ><a><h3>{ name }</h3>  </a>
    </Link>
  <img src={ image } className="Mcimg"/>

  </ul>

  )
})
}
 <button className={styles.card} onClick={handlerResult}>ReadMore</button>
  

</div>
</div>  
</div>
)
}

  
 


