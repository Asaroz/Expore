import { useState , useEffect} from 'react';
import getUniverse from '../libs/getItems';
import { NavLink } from 'react-router-dom';
import '../scss/Searchbar.scss';

export default function Searchbar(props){
    const [searchString,setSearchString] = useState("");
    const [searchModal,setSearchModal] = useState(false);
    const [allItems,setAllItems] = useState([]);
    const [currentItems,setCurrentItems] = useState(null)
    let descendantsRequest;
    let universeId = props.universeId

    useEffect(() => {
        async function getDesc(){
            if(allItems.length===0){
                descendantsRequest = await getUniverse({ universeId: universeId});
                setAllItems(descendantsRequest.result)
                console.log("universe was fetched")
            }
            let currentHelper;
            currentHelper = allItems.filter((element) =>{
                return element.title.toLowerCase().includes(searchString.toLocaleLowerCase())
            })
            setCurrentItems(currentHelper)
            
        }
        getDesc();
      },[searchString]);

    function handleChange(e){
        setSearchString(e.target.value);
        
    };

    return <div >
        <div className="searchButton" onClick={
            ()=>{setSearchModal(!searchModal)}
        }>
            Search
        </div>
        {searchModal ?
        <div className='searchModal'>
            <button onClick={()=>setSearchModal(!searchModal)}>close</button>
            <input placeholder="search here..." onChange={handleChange} type="text" />
            <hr></hr>
            {currentItems.map((item)=>{
                return<div>
                    <NavLink onClick={()=>setSearchModal(!searchModal)} exact replace to={{ pathname:'/item', hash: `${item._id}` } }>{item.title}</NavLink>
                </div>
            })
                
            }
        </div>
        :
        null
    }
    </div>
}