import requests
from datetime import datetime, timedelta, timezone

cn_timezone = timezone(timedelta(hours=8))
cn_time = datetime.now(cn_timezone)

try:
    url = r"https://raw.githubusercontent.com/privacy-protection-tools/anti-AD/refs/heads/master/anti-ad-quanx.txt"
    qx_host_config = requests.get(url)
except requests.RequestException as e:
    print(f"HTTP请求失败: {e}")
    exit(1)

path = r"LOOP/HOST/anti-AD.txt"
with open(path, "w", encoding="utf-8") as file:
    file.write(f"//更新时间：{cn_time.strftime('%Y-%m-%d %H:%M:%S')}\n\n")
    for line in qx_host_config.text.splitlines():
        line = line.replace("host-suffix", "DOMAIN-SUFFIX")
        line = line.replace(",reject", "")
        file.write(line + "\n")
