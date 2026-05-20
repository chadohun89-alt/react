import { useEffect, useState } from "react";

function AttendPage({students}) {
    const [studentId, setStudentId] = useState("");
    const [attend, setAttend] = useState("");
    const [late, setLate] = useState("");
    const [absent, setAbsent] = useState("");
    const [earlyLeave, setEarlyLeave] = useState("");

    const [attendList, setAttendList] = useState([]);

    const API_URL = "http://localhost:8000";

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
        getAttendList();
    }, []);

    return (
        <div>
            <h1>출석 데이터 입력 화면</h1>
            <p>학생별 출석, 지각, 결석, 조퇴 횟수를 입력하고 출석률을 확인하는 화면입니다.</p>

            <section>
                <h2>출석 입력</h2>
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
                        { label: "출석 횟수", value: attend, setter: setAttend },
                        { label: "지각 횟수", value: late, setter: setLate },
                        { label: "결석 횟수", value: absent, setter: setAbsent },
                        { label: "조퇴 횟수", value: earlyLeave, setter: setEarlyLeave },
                    ].map(({ label, value, setter }) => (
                        <div key={label}>
                            <label>{label}</label>
                            <input type="number"
                                value={value} onChange={(e) => setter(e.target.value)} />
                        </div>
                    ))}
                    <button onClick={addAttend}>출석 저장</button>
                </div>
            </section>

            <section>
                <h2>출석 목록</h2>
                <table>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>이름</th>
                            <th>출석</th>
                            <th>지각</th>
                            <th>결석</th>
                            <th>조퇴</th>
                            <th>전체 결결 횟수</th>
                            <th>출석률</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendList.map((item) => (
                            <tr key={item.id}>
                                <td>{item.student_id}</td>
                                <td>{item.student_name}</td>
                                <td>{item.attend}</td>
                                <td>{item.late}</td>
                                <td>{item.absent}</td>
                                <td>{item.early_leave}</td>
                                <td>{item.total_count}</td>
                                <td>{item.attendance_rate}%</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
}

export default AttendPage;
