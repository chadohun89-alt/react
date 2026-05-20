import { useEffect, useState } from "react";

function StudentPage({students, getStudents}){
    const [name, setName] = useState("");
    const [class_n, setClass_n] = useState("");
    const [team, setTeam] = useState("");

    const addStudent = async () => {
        const data = { name, class_n, team };
        await fetch("http://localhost:8000/students", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(data),
        });
        setName(""); setClass_n(""); setTeam("");
        getStudents();
    }

    useEffect(() => {
        getStudents();
    }, []);

    return (
        <div>
            <h1>학생 데이터 입력</h1>

            <section>
                <h2>학생 등록</h2>
                <div>
                    <input type="text" placeholder="이름 입력"
                        value={name} onChange={(e) => setName(e.target.value)} />
                    <input type="text" placeholder="반 입력"
                        value={class_n} onChange={(e) => setClass_n(e.target.value)} />
                    <input type="text" placeholder="팀 입력"
                        value={team} onChange={(e) => setTeam(e.target.value)} />
                    <button onClick={addStudent}>학생 등록</button>
                </div>
            </section>

            <section>
                <h2>학생 목록</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>이름</th>
                            <th>반</th>
                            <th>팀명</th>
                            <th>등록일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((std) => (
                            <tr key={std.id}>
                                <td>{std.id}</td>
                                <td>{std.name}</td>
                                <td>{std.class_n}</td>
                                <td>{std.team}</td>
                                <td>{std.create_at}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
}

export default StudentPage;
