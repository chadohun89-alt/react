// Analysis.jsx

import ClassSummaryPage from "./ClassSummaryPage"
import GraphPage from "./GraphPage";
import StudentAnalysisPage from "./StudentAnalysisPage";

function Analysis(){
    return(
        <>
            <ClassSummaryPage />
            <hr />
            <StudentAnalysisPage />
            <hr />
            <GraphPage/>
        </>
    );
}
export default Analysis;