import Navbar from "../components/molecules/Navbar";
import { useParams } from "react-router-dom";
import FlexWorkProjects from "../components/organism/FlexWorkProjects";
function Projects() {
    const { projectName } = useParams();
    console.log("Recuperando el parametro en Projects");
    console.log(projectName);  
    return ( 
        <>
        <Navbar btnBack={true} />
        <FlexWorkProjects projectName={projectName}/>
        </>
     );
}

export default Projects;