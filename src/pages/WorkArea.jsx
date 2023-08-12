import Navbar from "../components/molecules/Navbar";
import FlexWorkArea from "../components/organism/FlexWorkArea";

function WorkArea() {
    return ( 
        <div>
            <Navbar btnBack={true} />
            <FlexWorkArea/>
        </div>
     );
}

export default WorkArea;