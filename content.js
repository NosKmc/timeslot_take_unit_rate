if (location.href === "https://www.k.kyoto-u.ac.jp/student/la/timeslot/top") {
    location.href = "https://www.k.kyoto-u.ac.jp/student/la/timeslot/timeslot_list"
}
else {
    table = document.querySelector(".standard_list")
    head = table.querySelector("tr.th_normal")
    label = document.createElement("th")
    label.style.whiteSpace = "pre"
    label.textContent = "単位取得率(%)\n(取得/登録)"
    head.appendChild(label)
    let headtd = head.querySelectorAll("td");
    console.log(headtd);
    let position = 0;
    for (position = 0; position < headtd.length; position++) {
        if (headtd[position].innerHTML.includes("科目")) {
            break;
        }
    }
    position++;

    Promise.all([
        fetch(chrome.runtime.getURL("./2018.json")),
        fetch(chrome.runtime.getURL("./2017.json"))])
        .then(([res1, res2]) => {
            return Promise.all([res1.json(), res2.json()])
        })
        .then(([json1, json2]) => {
            table.querySelectorAll(".odd_normal,.even_normal").forEach((tr, i) => {
                subject = tr.querySelector(`td:nth-child(${position})`).textContent.replace(/(\d[A-Z]\d+,?)+/, '').trim()
                td = document.createElement("td")
                item = json1.find((item) => {
                    return item['授業科目名'] === subject
                })
                if (!item) {
                    item = json2.find((item) => {
                        return item['授業科目名'] === subject
                    })
                }
                console.log(subject);
                if (!item) {
                    td.textContent="データなし";
                }else{
                td.textContent = String(item["単位取得率"]).substr(0, 4) + "(" + item["単位取得者数（平均）"] + "/" + item["履修登録者数（平均）"] + ")"
                }
                tr.appendChild(td)
            })
        })
}