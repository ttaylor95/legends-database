import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

function LegendForm({addNewLegend, legends}){
    const defaultFormData = {
        name: "",
        nickname: "",
        trailer: "",
        legendType:"",
        likes: 0
    }
    const [formData, setFormData] = useState(defaultFormData)

    const params = useParams()
    console.log(params)

    // && legends.length > 0

    useEffect(() => {
        if(params.id && legends.length > 0 ){
            //find the legend
            const legendToEdit = legends.find(legend => legend.id === parseInt(params.id))
            console.log(legendToEdit)
            setFormData(legendToEdit)
        } else {
            setFormData(defaultFormData)
        }
    }, [params, legends])

    function handleSubmit(e){
        e.preventDefault()

        const newLegend = {...formData, likes:0}

        const configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newLegend)
        }
        fetch('http://localhost:3004/legends', configObj)
        .then(r => r.json())
        .then(data => {
            addNewLegend(data)
            setFormData(defaultFormData)
        })
    }

    function handleChange(e){
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    return (
        <div>
            <h2>Add a New Legend</h2>
           <form onSubmit={handleSubmit}>
               <div>
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
               </div>
               <div>
                <label>Nickname:</label>
                <input type="text" name="nickname" value={formData.nickname} onChange={handleChange} />
               </div>
               <div>
                <label>Trailer URL:</label>
                <input type="text" name="trailer" value={formData.trailer} onChange={handleChange} />
               </div>
                <div>
                <label>Legend Type:</label>
                <input type="text" name="legendType" value={formData.legendType} onChange={handleChange} />
               </div> 
                <input type="submit" value={formData.id ? "Update" : "Create"}/>
           </form>
        </div>
    )
}

export default LegendForm