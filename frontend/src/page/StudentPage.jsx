import { useEffect, useState } from "react";

function StudentPage(){
    const [name, setName] = useState("");
    const [class_n, setClass_n] = useState("");
    const [team, setTeam] = useState("");
    const [students, setStudents] = useState([]);

    const getStudents = async() => {
        const response = await fetch("http://localhost:8000/students");
        const data = await response.json();
        setStudents(data);
    }

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
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">학생 데이터 입력</h1>

            <section className="border rounded p-4 mb-6">
                <h2 className="text-lg font-semibold mb-3">학생 등록</h2>
                <div className="flex gap-2">
                    <input className="border rounded px-2 py-1" type="text" placeholder="이름 입력"
                        value={name} onChange={(e) => setName(e.target.value)} />
                    <input className="border rounded px-2 py-1" type="text" placeholder="반 입력"
                        value={class_n} onChange={(e) => setClass_n(e.target.value)} />
                    <input className="border rounded px-2 py-1" type="text" placeholder="팀 입력"
                        value={team} onChange={(e) => setTeam(e.target.value)} />
                    <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                        onClick={addStudent}>학생 등록</button>
                </div>
            </section>

            <section className="border rounded p-4">
                <h2 className="text-lg font-semibold mb-3">학생 목록</h2>
                <table className="w-full border-collapse text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border px-3 py-2">ID</th>
                            <th className="border px-3 py-2">이름</th>
                            <th className="border px-3 py-2">반</th>
                            <th className="border px-3 py-2">팀명</th>
                            <th className="border px-3 py-2">등록일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((std) => (
                            <tr key={std.id} className="hover:bg-gray-50">
                                <td className="border px-3 py-1 text-center">{std.id}</td>
                                <td className="border px-3 py-1">{std.name}</td>
                                <td className="border px-3 py-1 text-center">{std.class_n}</td>
                                <td className="border px-3 py-1 text-center">{std.team}</td>
                                <td className="border px-3 py-1">{std.create_at}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
}

export default StudentPage;
