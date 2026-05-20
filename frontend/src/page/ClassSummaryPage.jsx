// ClassSummaryPage.jsx

import { useState } from "react";

function ClassSummaryPage(){

    const [summary, setSummary] = useState(null);

    const requestAnalysis = async () => {
        const response = await fetch("http://localhost:8000/analysis/class-summary");
        const data = await response.json()
        if(!response.ok){ // 요청에 오류가 있다면
            alert(data);
            return;
        }
        setSummary(data)
    }


    // 더미
    const [classN, setClassN] = useState("");
    const [analysisType, setAnalysisType] = useState("전체");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");

    const subjects = [];
    const fetchSummary = () => {};

    return(
        <div>
            <h1>반 전체 통계</h1>
            <p>반 전체 학습 데이터를 기반으로 평균 점수, 출석률, 과목별 최고점/최저점을 분석하여 제공하는 화면입니다.</p>

            <section className="flex justify-around">
                <h2>조회 조건</h2>
                <div>
                    <label>반 선택</label>
                    <select value={classN} onChange={(e) => setClassN(e.target.value)}>
                        <option value="">선택하세요</option>
                        <option value="1반">1반</option>
                        <option value="2반">2반</option>
                        <option value="3반">3반</option>
                    </select>
                </div>
                <div>
                    <label>분석 기준</label>
                    <select value={analysisType} onChange={(e) => setAnalysisType(e.target.value)}>
                        <option value="전체">전체</option>
                        <option value="성적">성적</option>
                        <option value="출석">출석</option>
                    </select>
                </div>
                <div>
                    <label>시작일</label>
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </div>
                <div>
                    <label>종료일</label>
                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>
                <button onClick={requestAnalysis}>분석 실행</button>
            </section>

            {error && <p>{error}</p>}

            
            <section className="flex justify-around">
                <h2>분석 결과</h2>
                <div>
                    <p>{summary ? summary.total_student : 0} 명</p>
                    <p>{summary ? summary.avg_score: 0} 점</p>
                    <p>{summary ? summary.avg_attend_rate : 0}%</p>
                </div>

                <h2>과목별 최고점 / 최저점</h2>
                <table>
                    <thead>
                        <tr>
                            <th>과목</th>
                            <th>최고점</th>
                            <th>최저점</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Python</td>
                            <td>{summary ? summary.python_max : 0}</td>
                            <td>{summary ? summary.python_min : 0}</td>
                        </tr>
                        <tr>
                            <td>Numpy</td>
                            <td>{summary ? summary.numpy_max : 0}</td>
                            <td>{summary ? summary.numpy_min : 0}</td>
                        </tr>
                        <tr>
                            <td>Pandas</td>
                            <td>{summary ? summary.pandas_max : 0}</td>
                            <td>{summary ? summary.pandas_min : 0}</td>
                        </tr>
                        <tr>
                            <td>Java</td>
                            <td>{summary ? summary.java_max : 0}</td>
                            <td>{summary ? summary.java_min : 0}</td>
                        </tr>
                        <tr>
                            <td>Project</td>
                            <td>{summary ? summary.project_max : 0}</td>
                            <td>{summary ? summary.project_min : 0}</td>
                        </tr>
                    </tbody>
                </table>
            </section>
            
        </div>

    )
}

export default ClassSummaryPage;
