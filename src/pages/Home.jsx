import Navbar from "../components/molecules/Navbar";
import FlexTemplates from "../components/organism/FlexTemplates";

function Home() {
    return ( 
        <>
            <Navbar btnBack={false} />
            <FlexTemplates />
        </>
     );
}

export default Home;