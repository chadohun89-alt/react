import { useEffect, useState } from "react";

function ScorePage() {
    const [studentId, setStudentId] = useState("");
    const [pythonScore, setPythonScore] = useState("");
    const [numpyScore, setNumpyScore] = useState("");
    const [pandasScore, setPandasScore] = useState("");
    const [javaScore, setJavaScore] = useState("");
    const [projectScore, setProjectScore] = useState("");

    const [students, setStudents] = useState([]);
    const [scores, setScores] = useState([]);

    const API_URL = "http://localhost:8000";

    const getStudents = async () => {
        const response = await fetch(`${API_URL}/students`);
        const data = await response.json();
        setStudents(data);
    };

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
        getStudents();
        getScores();
    }, []);

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-2">성적 입력/조회</h1>
            <p className="text-gray-500 mb-6">Python, NumPy, Pandas, Java, Project 점수를 입력하고 학생별 평균 점수를 확인하는 화면입니다.</p>

            <section className="border rounded p-4 mb-6">
                <h2 className="text-lg font-semibold mb-3">성적 입력</h2>
                <div className="flex flex-wrap gap-3 items-end">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm">학생 선택</label>
                        <select className="border rounded px-2 py-1" value={studentId} onChange={(e) => setStudentId(e.target.value)}>
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
                        <div key={label} className="flex flex-col gap-1">
                            <label className="text-sm">{label} 점수</label>
                            <input className="border rounded px-2 py-1 w-20" type="number"
                                value={value} onChange={(e) => setter(e.target.value)} />
                        </div>
                    ))}
                    <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                        onClick={addScore}>성적 저장</button>
                </div>
            </section>

            <section className="border rounded p-4">
                <h2 className="text-lg font-semibold mb-3">성적 목록</h2>
                <table className="w-full border-collapse text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border px-3 py-2">번호</th>
                            <th className="border px-3 py-2">이름</th>
                            <th className="border px-3 py-2">Python</th>
                            <th className="border px-3 py-2">NumPy</th>
                            <th className="border px-3 py-2">Pandas</th>
                            <th className="border px-3 py-2">Java</th>
                            <th className="border px-3 py-2">Project</th>
                            <th className="border px-3 py-2">평균 점수</th>
                            <th className="border px-3 py-2">관리</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scores.map((score) => (
                            <tr key={score.id} className="hover:bg-gray-50">
                                <td className="border px-3 py-1 text-center">{score.student_id}</td>
                                <td className="border px-3 py-1">{score.student_name}</td>
                                <td className="border px-3 py-1 text-center">{score.python_score}</td>
                                <td className="border px-3 py-1 text-center">{score.numpy_score}</td>
                                <td className="border px-3 py-1 text-center">{score.pandas_score}</td>
                                <td className="border px-3 py-1 text-center">{score.java_score}</td>
                                <td className="border px-3 py-1 text-center">{score.project_score}</td>
                                <td className="border px-3 py-1 text-center">{score.avg_score}</td>
                                <td className="border px-3 py-1 text-center">
                                    <button className="text-blue-500 hover:underline mr-2">수정</button>
                                    <button className="text-red-500 hover:underline">삭제</button>
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
