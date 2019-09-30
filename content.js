table = document.querySelector(".standard_list")
head = table.querySelector("tr.th_normal")
label = document.createElement("th")
label.style.whiteSpace = "pre"
label.textContent = "単位取得率(%)\n(取得/登録)"
head.appendChild(label)

Promise.all([
fetch(chrome.runtime.getURL("./2018.json")),
fetch(chrome.runtime.getURL("./2017.json"))])
.then(([res1, res2])=>{
    return Promise.all([res1.json(), res2.json()])
})
.then(([json1,json2])=>{
        table.querySelectorAll(".odd_normal,.even_normal").forEach((tr, i) => {
        subject = tr.querySelector("td:nth-child(2)").textContent.replace(/(\d[A-Z]\d+,?)+/, '').trim()
        td = document.createElement("td")
        item = json1.find((item)=>{
            return item['授業科目名'] === subject
        })
        if(!item) {item = json2.find((item)=>{
            return item['授業科目名'] === subject
        })
        }
        if(!item) return
        td.textContent = String(item["単位取得率"]).substr(0, 4) + "(" + item["単位取得者数（平均）"] + "/" + item["履修登録者数（平均）"] + ")"
        tr.appendChild(td)
    })
})
