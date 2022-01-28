
import './Spinner1.css'

export default function Spinner1({sm, md, lg, light, dark}){
    return(
        <div className={`loader-div${sm ? ' sm' : lg ? ' lg' : ''}${light ? ' light' : ' dark'}`}>
            <div className={`loader-dual-ring${light ? ' light' : ' dark'}`}>&nbsp;</div>
        </div>
    )
}
