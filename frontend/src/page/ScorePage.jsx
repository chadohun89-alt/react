import { useEffect, useState } from "react";

function ScorePage({students}) {
    const [studentId, setStudentId] = useState("");
    const [pythonScore, setPythonScore] = useState("");
    const [numpyScore, setNumpyScore] = useState("");
    const [pandasScore, setPandasScore] = useState("");
    const [javaScore, setJavaScore] = useState("");
    const [projectScore, setProjectScore] = useState("");


    const [scores, setScores] = useState([]);

    const API_URL = "http://localhost:8000";

    const getScores = async () => {
        const response = await fetch(`${API_URL}/scores`);
        const data = await response.json();
        setScores(data);
    };

    const addScore = async () => {
        if (studentId === "") {
            alert("학생을 선택하시오"); return;
        }
        const scoreData = {
            student_id: Number(studentId),
            python_score: Number(pythonScore),
            numpy_score: Number(numpyScore),
            pandas_score: Number(pandasScore),
            java_score: Number(javaScore),
            project_score: Number(projectScore),
        };
        const response = await fetch(`${API_URL}/scores`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(scoreData),
        });
        const result = await response.json();
        if (!response.ok) {
            alert(result.message); return;
        }
        setStudentId(""); setPythonScore(""); setNumpyScore("");
        setPandasScore(""); setJavaScore(""); setProjectScore("");
        getScores();
    };

    useEffect(() => {
        getScores();
    }, []);

    return (
        <div>
            <h1>성적 입력/조회</h1>
            <p>Python, NumPy, Pandas, Java, Project 점수를 입력하고 학생별 평균 점수를 확인하는 화면입니다.</p>

            <section>
                <h2>성적 입력</h2>
                <div>
                    <div>
                        <label>학생 선택</label>
                        <select value={studentId} onChange={(e) => setStudentId(e.target.value)}>
                            <option value="">선택하세요</option>
                            {students.map((std) => (
                                <option key={std.id} value={std.id}>{std.name}</option>
                            ))}
                        </select>
                    </div>
                    {[
                        { label: "Python", value: pythonScore, setter: setPythonScore },
                        { label: "NumPy", value: numpyScore, setter: setNumpyScore },
                        { label: "Pandas", value: pandasScore, setter: setPandasScore },
                        { label: "Java", value: javaScore, setter: setJavaScore },
                        { label: "Project", value: projectScore, setter: setProjectScore },
                    ].map(({ label, value, setter }) => (
                        <div key={label}>
                            <label>{label} 점수</label>
                            <input type="number"
                                value={value} onChange={(e) => setter(e.target.value)} />
                        </div>
                    ))}
                    <button onClick={addScore}>성적 저장</button>
                </div>
            </section>

            <section>
                <h2>성적 목록</h2>
                <table>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>이름</th>
                            <th>Python</th>
                            <th>NumPy</th>
                            <th>Pandas</th>
                            <th>Java</th>
                            <th>Project</th>
                            <th>평균 점수</th>
                            <th>관리</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scores.map((score) => (
                            <tr key={score.id}>
                                <td>{score.student_id}</td>
                                <td>{score.student_name}</td>
                                <td>{score.python_score}</td>
                                <td>{score.numpy_score}</td>
                                <td>{score.pandas_score}</td>
                                <td>{score.java_score}</td>
                                <td>{score.project_score}</td>
                                <td>{score.avg_score}</td>
                                <td>
                                    <button>수정</button>
                                    <button>삭제</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
}

export default ScorePage;
