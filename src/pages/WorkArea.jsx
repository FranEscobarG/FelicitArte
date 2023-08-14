import Navbar from "../components/molecules/Navbar";
import FlexWorkArea from "../components/organism/FlexWorkArea";
import { useParams } from "react-router-dom";
function WorkArea() {
    const { projectName } = useParams();
    console.log(projectName);
    return ( 
        <div>
            <Navbar btnBack={true} />
            <FlexWorkArea projectName={projectName}/>
        </div>
     );
}

export default WorkArea;