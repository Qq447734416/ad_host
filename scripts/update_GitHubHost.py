import requests
from datetime import datetime

url = r"https://github-hosts.tinsfox.com/hosts.json"
try:
    host_ip = requests.get(url).json()
except requests.RequestException as e:
    print(f"HTTP请求失败: {e}")
    exit(1)

path = r"LOOP/plugin/GitHub.plugin"
with open(path, "w", encoding="utf-8") as file:
    file.write("//通过DNS映射解决无法访问GitHub问题\n")
    file.write(f"//更新时间：{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n")
    file.write("[Host]\n")
    for x in host_ip:
        file.write(f"{x[1]} = {x[0]}\n")
