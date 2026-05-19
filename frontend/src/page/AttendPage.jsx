import { useEffect, useState } from "react";

function AttendPage() {
    const [studentId, setStudentId] = useState("");
    const [attend, setAttend] = useState("");
    const [late, setLate] = useState("");
    const [absent, setAbsent] = useState("");
    const [earlyLeave, setEarlyLeave] = useState("");

    const [students, setStudents] = useState([]);
    const [attendList, setAttendList] = useState([]);

    const API_URL = "http://localhost:8000";

    const getStudents = async () => {
        const response = await fetch(`${API_URL}/students`);
        const data = await response.json();
        setStudents(data);
    };

    const getAttendList = async () => {
        const response = await fetch(`${API_URL}/attend`);
        const data = await response.json();
        setAttendList(data);
    };

    const addAttend = async () => {
        if (studentId === "") {
            alert("학생을 선택하세요."); return;
        }
        if (attend === "" || late === "" || absent === "" || earlyLeave === "") {
            alert("모든 횟수를 입력하세요."); return;
        }

        const attendData = {
            student_id: Number(studentId),
            attend: Number(attend),
            late: Number(late),
            absent: Number(absent),
            early_leave: Number(earlyLeave),
        };

        const response = await fetch(`${API_URL}/attend`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(attendData),
        });
        const result = await response.json();

        if (!response.ok) {
            alert(result.message); return;
        }

        setStudentId(""); setAttend(""); setLate(""); setAbsent(""); setEarlyLeave("");
        getAttendList();
    };

    useEffect(() => {
        getStudents();
        getAttendList();
    }, []);

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-2">출석 데이터 입력 화면</h1>
            <p className="text-gray-500 mb-6">학생별 출석, 지각, 결석, 조퇴 횟수를 입력하고 출석률을 확인하는 화면입니다.</p>

            <section className="border rounded p-4 mb-6">
                <h2 className="text-lg font-semibold mb-3">출석 입력</h2>
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
                        { label: "출석 횟수", value: attend, setter: setAttend },
                        { label: "지각 횟수", value: late, setter: setLate },
                        { label: "결석 횟수", value: absent, setter: setAbsent },
                        { label: "조퇴 횟수", value: earlyLeave, setter: setEarlyLeave },
                    ].map(({ label, value, setter }) => (
                        <div key={label} className="flex flex-col gap-1">
                            <label className="text-sm">{label}</label>
                            <input className="border rounded px-2 py-1 w-20" type="number"
                                value={value} onChange={(e) => setter(e.target.value)} />
                        </div>
                    ))}
                    <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                        onClick={addAttend}>출석 저장</button>
                </div>
            </section>

            <section className="border rounded p-4">
                <h2 className="text-lg font-semibold mb-3">출석 목록</h2>
                <table className="w-full border-collapse text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border px-3 py-2">번호</th>
                            <th className="border px-3 py-2">이름</th>
                            <th className="border px-3 py-2">출석</th>
                            <th className="border px-3 py-2">지각</th>
                            <th className="border px-3 py-2">결석</th>
                            <th className="border px-3 py-2">조퇴</th>
                            <th className="border px-3 py-2">전체 결결 횟수</th>
                            <th className="border px-3 py-2">출석률</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendList.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50">
                                <td className="border px-3 py-1 text-center">{item.student_id}</td>
                                <td className="border px-3 py-1">{item.student_name}</td>
                                <td className="border px-3 py-1 text-center">{item.attend}</td>
                                <td className="border px-3 py-1 text-center">{item.late}</td>
                                <td className="border px-3 py-1 text-center">{item.absent}</td>
                                <td className="border px-3 py-1 text-center">{item.early_leave}</td>
                                <td className="border px-3 py-1 text-center">{item.total_count}</td>
                                <td className="border px-3 py-1 text-center">{item.attendance_rate}%</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
}

export default AttendPage;
