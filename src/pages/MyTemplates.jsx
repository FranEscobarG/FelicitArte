import Navbar from "../components/molecules/Navbar";
import FlexMyTemplates from "../components/organism/FlexMyTemplates";

function MyTemplates() {
    return ( 
        <>
            <Navbar btnBack={false} />
            <FlexMyTemplates/>
        </>
     );
}

export default MyTemplates;