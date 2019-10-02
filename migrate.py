import sqlite3
import json

DB_PATH = "2018.sqlite3"

def j_file2dic(_file):
    with open(_file, "r", encoding="utf-8") as filed:
        dic = json.load(filed)
    return dic

def main():
    json_data = j_file2dic("2018.json")
    with sqlite3.connect(DB_PATH) as conn:
        c = conn.cursor()
        c.execute("""CREATE TABLE 単位取得率2018 (
            開講学部・研究科等,
            授業科目名,
            履修登録者数（合計）,
            履修登録者数（平均）,
            単位取得者数（合計）,
            単位取得者数（平均）,
            授業数,
            単位取得率
            )""")
    for item in json_data:
        item_vals = list(item.values())
        with sqlite3.connect(DB_PATH) as conn:
            c = conn.cursor()
            c.execute('''
                insert into 単位取得率2018
                values (?, ?, ?, ?, ?, ?, ?, ?)
            ''', item_vals)
    

if __name__ == "__main__":
    main()
