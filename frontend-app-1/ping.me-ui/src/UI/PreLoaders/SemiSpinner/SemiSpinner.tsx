
import './SemiSpinner.css';

const SemiSpinner : React.FC<{sm? : boolean, md? : boolean, lg? : boolean, blue? : boolean, light? : boolean, dark? : boolean}> = ({sm, md, lg, blue, light, dark}) => {
    return(
        <div className={`semi-spinner-div${sm ? ' sm' : lg ? ' lg' : ' md'}${light ? ' light' : ' dark'}`}>
            <div className={`semi-spinner-dual-ring${blue ? ' blue' : light ? ' light' : ' dark'}`}>&nbsp;&nbsp;&nbsp;&nbsp;</div>
        </div>
    )
}

export default SemiSpinner;