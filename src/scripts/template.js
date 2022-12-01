function generate_css(config) {
    return `
body {
    font-family: ${config.general.font.family};
    font-size: ${config.general.font.size};
    font-weight: ${config.general.font.weight};
    color: ${config.general.font.color};
    background-color: ${config.general.background.color};
    position: relative;
}

#message {
    width: 100%;
    height: calc(100vh - 40px);
    overflow-y: hidden;
}

#message:hover,
#enter:hover {
    outline: 4px solid red;
}

.usr {
    color: ${config.danmu.username.color};
    font-size: ${config.danmu.username.size};
    font-weight: ${config.danmu.username.weight};
}

.msg {
    padding-left: 3px;
    color: ${config.danmu.content.color};
    font-size: ${config.danmu.content.size};
    font-weight: ${config.danmu.content.weight};
}

.admin {
    ${config.danmu.admin.show ? "" : "display: none;"}
    color: ${config.danmu.admin.color};
    border: 1px solid ${config.danmu.admin.color};
    font-size: ${config.danmu.admin.size};

    padding: 0 2px;
    height: 14px;
    border-radius: 2px;
    line-height: 14px;
    margin-right: 4px;
}

.rank {
    ${config.danmu.rank.show ? "" : "display: none;"}
    background: ${config.danmu.rank.bg};
    border: 1px solid ${config.danmu.rank.bg};
    color: ${config.danmu.rank.fg};

    padding: 0 2px;
    height: 14px;
    border-radius: 2px;
    line-height: 14px;
    font-size: 11px;
    margin-right: 4px;
}

.line {
    margin-top: ${config.danmu.line_margin};
    margin-bottom: ${config.danmu.line_margin};
}

.enter {
    ${config.enter.show ? "" : "display: none;"}
    color: ${config.enter.color};
    font-size: ${config.enter.size};
    font-weight: ${config.enter.weight};
}

#enter {
    width: calc(100% - 16px);
}

.gift-gold {
    ${config.gift.gold.show ? "" : "display: none;"}
    color: ${config.gift.gold.color};
    font-weight: ${config.gift.gold.weight};
    font-size: ${config.gift.gold.size};
}

.gift-silver {
    ${config.gift.silver.show ? "" : "display: none;"}
}

.enter-container {
    margin-bottom: 8px;
    position: fixed;
    bottom: 0;
}

.medal {
    display: inline-block;
    font-size: 10px;
    border: 1px solid transparent;
    border-radius: 2px;
    margin-right: 4px;
    line-height: 14px;
}

.medal-label,
.medal-level {
    justify-content: center;
    align-items: center;
    min-width: 12px;
    padding: 0 3px;
    color: #fff;
    border-radius: 1px;

    box-sizing: content-box;
    height: 100%;
    text-align: center;
}

${config.extra.css}
`;
}

export function generate_html(config) {
    return `
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>danmu</title>

        <style type="text/css">
            ${generate_css(config)}
        </style>
    </head>

    <body>
        <div id="message"></div>
        <div id="enter" class="enter-container"></div>
    </body>
</html>

<script src="https://cdn.bootcdn.net/ajax/libs/pako/0.1.0/pako.min.js"></script>
<script type="text/javascript">
    var ws = new WebSocket("wss://broadcastlv.chat.bilibili.com/sub");

    var room_id = ${config.general.room_id};
    var timer;
    var json = {
        uid: 0,
        roomid: room_id,
        protover: 1,
        platform: "web",
        clientver: "1.4.0",
    };

    ${config.extra.js}

    function getCertification(json) {
        var bytes = str2bytes(json);
        var n1 = new ArrayBuffer(bytes.length + 16);
        var i = new DataView(n1);
        i.setUint32(0, bytes.length + 16), i.setUint16(4, 16), i.setUint16(6, 1), i.setUint32(8, 7), i.setUint32(12, 1);
        for (var r = 0; r < bytes.length; r++) {
            i.setUint8(16 + r, bytes[r]);
        }
        return i;
    }

    function str2bytes(str) {
        const bytes = [];
        let c;
        const len = str.length;
        for (let i = 0; i < len; i++) {
            c = str.charCodeAt(i);
            if (c >= 0x010000 && c <= 0x10ffff) {
                bytes.push(((c >> 18) & 0x07) | 0xf0);
                bytes.push(((c >> 12) & 0x3f) | 0x80);
                bytes.push(((c >> 6) & 0x3f) | 0x80);
                bytes.push((c & 0x3f) | 0x80);
            } else if (c >= 0x000800 && c <= 0x00ffff) {
                bytes.push(((c >> 12) & 0x0f) | 0xe0);
                bytes.push(((c >> 6) & 0x3f) | 0x80);
                bytes.push((c & 0x3f) | 0x80);
            } else if (c >= 0x000080 && c <= 0x0007ff) {
                bytes.push(((c >> 6) & 0x1f) | 0xc0);
                bytes.push((c & 0x3f) | 0x80);
            } else {
                bytes.push(c & 0xff);
            }
        }
        return bytes;
    }

    ws.onopen = function () {
        console.log("WebSocket 已连接上");
        ws.send(getCertification(JSON.stringify(json)).buffer);
        timer = setInterval(function () {
            var n1 = new ArrayBuffer(16);
            var i = new DataView(n1);
            i.setUint32(0, 0), i.setUint16(4, 16), i.setUint16(6, 1), i.setUint32(8, 2), i.setUint32(12, 1);
            ws.send(i.buffer);
        }, 30000);
    };

    ws.onclose = function () {
        console.log("连接已关闭");
        if (timer != null) clearInterval(timer);
    };

    function medal(data, type) {
        if (data.length != 0) {
            if (type == "msg" && data[11]) {
                let color = parseInt(data[4]).toString(16);
                return \`<span class="medal" style="background-color: #\${color};"><span class="medal-label" style="color: #FFFFFF;">\${
        data[1]
    }</span><span class="medal-level" style="color: #\${color}; background-color: #FFFFFF;">\${data[0]}</span></span>\`;
            } else if (type == "enter" && data.is_lighted) {
                let color = parseInt(data.medal_color).toString(16);
                return \`<span class="medal" style="background-color: #\${color};"><span class="medal-label" style="color: #FFFFFF;">\${
        data.medal_name
    }</span><span class="medal-level" style="color: #\${color}; background-color: #FFFFFF;">\${
        data.medal_level
    }</span></span>\`;
            }
        }

        return "";
    }

    function admin(is_admin) {
        if (is_admin) {
            return \`<span class="admin">房</span>\`;
        }

        return "";
    }

    function rank_icon(rank) {
        if (rank >= 1 && rank <= 3) {
            return \`<span class="rank">榜\${rank}</span>\`;
        }

        return "";
    }

    function get_rank(user_id) {
        for (let i = 0; i < online_rank.length; i++) {
            if (online_rank[i].uid == user_id) {
                return online_rank[i].rank;
            }
        }

        return -1;
    }

    var online_rank = [];

    ws.onmessage = function (evt) {
        var blob = evt.data;
        decode(blob, function (packet) {
            if (packet.op == 5) {
                for (let i = 0; i < packet.body.length; i++) {
                    var element = packet.body[i];
                    console.log(element);

                    if (element.cmd.indexOf("DANMU_MSG") !== -1) {
                        // 弹幕
                        document
                            .getElementById("message")
                            .insertAdjacentHTML(
                                "afterbegin",
                                \`<div class="line">${!config.danmu.rank.show ? '' : `\${rank_icon(get_rank(element.info[2][0]))}`}${!config.danmu.show_medal ? '' : `\${medal(
        element.info[3],
        "msg"
    )}`}${!config.danmu.admin.show ? '' : `\${admin(element.info[2][2])}`}<span class="usr">\${element.info[2][1]}: </span><span class="msg">\${
        element.info[1]
    }</span></div>\`
                            );
                    } else if (element.cmd == "INTERACT_WORD") {
                        // 进入直播间
                        document.getElementById("enter").innerHTML = \`<div><span class="enter">${!config.enter.show_medal ? '' : `\${medal(
                            element.data.fans_medal,
                            "enter"
                        )}`}\${element.data.uname} 进入直播间</span></div>\`;
                    } else if (element.cmd == "SEND_GIFT") {
                        // 礼物
                        if (element.data.coin_type == "gold") {
                            // 电池礼物
                            if (${config.gift.gold.show ? `true` : `false`}) {
                                document
                                    .getElementById("message")
                                    .insertAdjacentHTML(
                                        "afterbegin",
                                        \`<div class="line gift-gold">感谢 \${medal(element.data.medal_info, "enter")}\${
            element.data.uname
        } \${element.data.action}的 \${element.data.num} × \${element.data.giftName}</div>\`
                                    );
                            }
                        } else {
                            // 银瓜子礼物
                            if (${config.gift.silver.show ? `true` : `false`}) {
                                document
                                    .getElementById("message")
                                    .insertAdjacentHTML(
                                        "afterbegin",
                                        \`<div class="line gift-silver">\${medal(
                                            element.data.medal_info,
                                            "enter"
                                        )}<span class="usr">\${element.data.uname}: </span><span class="msg">\${
            element.data.num
        } × \${element.data.giftName}</span></div>\`
                                    );
                            }
                        }
                    } else if (element.cmd == "ONLINE_RANK_V2") {
                        online_rank = element.data.list;
                    }
                }
            }
        });
    };

    var textDecoder = new TextDecoder("utf-8");
    const readInt = function (buffer, start, len) {
        let result = 0;
        for (let i = len - 1; i >= 0; i--) {
            result += Math.pow(256, len - i - 1) * buffer[start + i];
        }
        return result;
    };

    function decode(blob, call) {
        let reader = new FileReader();
        reader.onload = function (e) {
            let buffer = new Uint8Array(e.target.result);
            let result = {};
            result.packetLen = readInt(buffer, 0, 4);
            result.headerLen = readInt(buffer, 4, 2);
            result.ver = readInt(buffer, 6, 2);
            result.op = readInt(buffer, 8, 4);
            result.seq = readInt(buffer, 12, 4);
            if (result.op == 5) {
                result.body = [];
                let offset = 0;
                while (offset < buffer.length) {
                    let packetLen = readInt(buffer, offset + 0, 4);
                    let headerLen = 16;
                    let data = buffer.slice(offset + headerLen, offset + packetLen);

                    let body = "{}";
                    if (result.ver == 2) {
                        body = textDecoder.decode(pako.inflate(data));
                    } else {
                        body = textDecoder.decode(data);
                    }
                    if (body) {
                        const group = body.split(/[\\x00-\\x1f]+/);
                        group.forEach((item) => {
                            try {
                                result.body.push(JSON.parse(item));
                            } catch (e) {}
                        });
                    }
                    offset += packetLen;
                }
            }
            call(result);
        };
        reader.readAsArrayBuffer(blob);
    }
</script>

<!-- CONFIG
${JSON.stringify(config, null, 4)}
-->
`;
}
