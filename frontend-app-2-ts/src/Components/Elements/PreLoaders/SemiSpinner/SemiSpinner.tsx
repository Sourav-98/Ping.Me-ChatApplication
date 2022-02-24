
import './SemiSpinner.css';

const SemiSpinner : React.FC<{sm? : boolean, md? : boolean, lg? : boolean, light? : boolean, dark? : boolean}> = ({sm, md, lg, light, dark}) => {
    return(
        <div className={`loader-div${sm ? ' sm' : lg ? ' lg' : ''}${light ? ' light' : ' dark'}`}>
            <div className={`loader-dual-ring${light ? ' light' : ' dark'}`}>&nbsp;&nbsp;&nbsp;&nbsp;</div>
        </div>
    )
}

export default SemiSpinner;