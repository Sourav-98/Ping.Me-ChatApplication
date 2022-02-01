
import './SemiSpinner.css'

export default function SemiSpinner({sm, md, lg, light, dark}){
    return(
        <div className={`loader-div${sm ? ' sm' : lg ? ' lg' : ''}${light ? ' light' : ' dark'}`}>
            <div className={`loader-dual-ring${light ? ' light' : ' dark'}`}>&nbsp;&nbsp;&nbsp;&nbsp;</div>
        </div>
    )
}
