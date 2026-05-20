import { useState } from "react";

function GraphPage(){
    const [ summary , setSummary] = useState(null);
    const requestGraph = async () => {
        const res = await fetch("http://localhost:8000/analysis/graph-summary")
        const data = await res.json();
        setSummary(data);
    }
    return(
        <div>
            <h2>성적 & 출석 그래프</h2>
            <div className="flex gap-3">
                <section>
                    <h2>성적 분포 그래프</h2>
                    <img src="" />
                    <div className="flex justify-between">
                        <p>평균점수</p>
                        <p>최고점수</p>
                        <p>최저점수</p>
                        <p>표준편차</p>
                    </div>
                </section>
                <section>
                    <h2>출석률 분포 그래프</h2>
                    <img src="" />
                    <div className="flex justify-between">
                        <p>평균출석률</p>
                        <p>최고출석률</p>
                        <p>최저출석률</p>
                        <p>표준편차</p>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default GraphPage;