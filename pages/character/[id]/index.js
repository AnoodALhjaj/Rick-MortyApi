
import styles from '../../../styles/Home.module.css'
const defaultEndpoint = `https://rickandmortyapi.com/api/character/`;

export async function getServerSideProps({query}) {
  const {id}=query;
  const res = await fetch(`${defaultEndpoint}/${id}`)
  const data = await res.json();
  return {
    props: {
      data
    }
  }
}
//const { results = [] } = data;

export default  function Character({data}){
  const { name, image, gender, location, origin, species, status } = data;
  //console.log('data',data)
  return(<div className={styles.container}>
<div>

<div className={styles.grid}>
<div className={styles.card}>
<p>Name: {name}</p>
<p>Gender: {gender}</p>
<p>Location: {location?.name}</p>
<p>Origin: { origin?.name }</p>
<p>Species: { species }</p>
<p>Status: { status }</p>
<img src={ image }/>
  
</div>
</div>
</div>  
</div>
)
}

  
 


