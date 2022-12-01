<script>
import Preview from './components/Preview.vue';

export default {
  data() {
    return {
      preview_bg: "rgba(55, 55, 55, 1)",
      default_config: {
        "general": {
          "room_id": 0,
          "background": {
            "color": "#00000000",
          },
          "font": {
            "family": '"Microsoft YaHei", "Microsoft Sans Serif", "Microsoft SanSerf", "微软雅黑"',
          }
        },
        "danmu": {
          "line_margin": "2px",
          "show_medal": true,
          "rank": {
            "show": true,
            "bg": "rgb(230, 93, 14)",
            "fg": "#ffffff",
          },
          "admin": {
            "show": true,
            "color": "rgb(219, 135, 0)",
            "size": "11px",
          },
          "username": {
            "color": "rgb(117, 122, 129)",
            "size": "14px",
            "weight": 500,
          },
          "content": {
            "color": "#fefefe",
            "size": "14px",
            "weight": 500,
          }
        },
        "enter": {
          "show": true,
          "color": "rgb(117, 122, 129)",
          "size": "14px",
          "weight": 500,
          "show_medal": true,
        },
        "gift": {
          "gold": {
            "weight": 500,
            "show": true,
            "size": "14px",
            "color": "#edd400",
          },
          "silver": {
            "show": true,
            "weight": 500,
          }
        },
        "extra": {
          "css": "",
          "js": "",
        }
      },
      config: "",
      config_str: "",
      config_format_str: ""
    };
  },
  methods: {
    set_config() {
      this.config_str = JSON.stringify(this.config);
      this.$store.commit('update', { config: this.config_str });
    }
  },
  beforeMount() {
    this.config_str = this.$store.state.usr_config;
    this.config = this.config_str == '' ? this.default_config : JSON.parse(this.config_str);
    this.config_str = JSON.stringify(this.config);
    this.config_format_str = JSON.stringify(this.config, null, 4);
  },
  components: {
    Preview,
  }
}
</script>

<template>
  <main>
    <el-row :gutter="20">
      <el-col :span="16">
        <el-card class="card-holder">
          <el-tabs tab-position="left">
            <el-tab-pane label="常规" class="tab-content">
              <p class="title">房间号</p>
              <el-row :gutter="10">
                <el-col :span="18">
                  <el-input v-model="config.general.room_id"></el-input>
                </el-col>
              </el-row>

              <p class="title">背景</p>
              <el-row :gutter="10">
                <el-col :span="18">
                  <el-input v-model="config.general.background.color"></el-input>
                </el-col>
                <el-col :span="6">
                  <el-color-picker v-model="config.general.background.color" show-alpha />
                </el-col>
              </el-row>

              <p class="title">字体样式</p>
              <el-row :gutter="10">
                <el-col :span="18">
                  <el-input v-model="config.general.font.family"></el-input>
                </el-col>
              </el-row>
              <br>
              <el-button type="info" plain style="float: right;" @click="(config = default_config, set_config())">
                恢复默认设置
              </el-button>
            </el-tab-pane>
            <el-tab-pane label="弹幕" class="tab-content">
              <p class="title">行间距</p>
              <el-row :gutter="10">
                <el-col :span="18">
                  <el-input v-model="config.danmu.line_margin"></el-input>
                </el-col>
              </el-row>

              <p class="title">粉丝牌
                <el-switch v-model="config.danmu.show_medal" size="small"
                  style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" />
              </p>

              <p class="title">房管标识</p>
              <p class="subtitle">显示
                <el-switch v-model="config.danmu.admin.show" size="small"
                  style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" />
              </p>
              <p class="subtitle">颜色</p>
              <el-row :gutter="10">
                <el-col :span="18">
                  <el-input v-model="config.danmu.admin.color"></el-input>
                </el-col>
                <el-col :span="6">
                  <el-color-picker v-model="config.danmu.admin.color" show-alpha />
                </el-col>
              </el-row>
              <p class="subtitle">大小</p>
              <el-row :gutter="10">
                <el-col :span="18">
                  <el-input v-model="config.danmu.admin.size"></el-input>
                </el-col>
              </el-row>

              <p class="title">高能榜标识</p>
              <p class="subtitle">显示
                <el-switch v-model="config.danmu.rank.show" size="small"
                  style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" />
              </p>
              <p class="subtitle">背景颜色</p>
              <el-row :gutter="10">
                <el-col :span="18">
                  <el-input v-model="config.danmu.rank.bg"></el-input>
                </el-col>
                <el-col :span="6">
                  <el-color-picker v-model="config.danmu.rank.bg" show-alpha />
                </el-col>
              </el-row>
              <p class="subtitle">字体颜色</p>
              <el-row :gutter="10">
                <el-col :span="18">
                  <el-input v-model="config.danmu.rank.fg"></el-input>
                </el-col>
                <el-col :span="6">
                  <el-color-picker v-model="config.danmu.rank.fg" show-alpha />
                </el-col>
              </el-row>

              <p class="title">用户名</p>
              <p class="subtitle">颜色</p>
              <el-row :gutter="10">
                <el-col :span="18">
                  <el-input v-model="config.danmu.username.color"></el-input>
                </el-col>
                <el-col :span="6">
                  <el-color-picker v-model="config.danmu.username.color" show-alpha />
                </el-col>
              </el-row>
              <p class="subtitle">大小</p>
              <el-row :gutter="10">
                <el-col :span="18">
                  <el-input v-model="config.danmu.username.size"></el-input>
                </el-col>
              </el-row>
              <p class="subtitle">粗细</p>
              <el-row :gutter="10">
                <el-col :span="18">
                  <el-input v-model="config.danmu.username.weight"></el-input>
                </el-col>
              </el-row>

              <p class="title">内容</p>
              <p class="subtitle">颜色</p>
              <el-row :gutter="10">
                <el-col :span="18">
                  <el-input v-model="config.danmu.content.color"></el-input>
                </el-col>
                <el-col :span="6">
                  <el-color-picker v-model="config.danmu.content.color" show-alpha />
                </el-col>
              </el-row>
              <p class="subtitle">大小</p>
              <el-row :gutter="10">
                <el-col :span="18">
                  <el-input v-model="config.danmu.content.size"></el-input>
                </el-col>
              </el-row>
              <p class="subtitle">粗细</p>
              <el-row :gutter="10">
                <el-col :span="18">
                  <el-input v-model="config.danmu.content.weight"></el-input>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="进入直播" class="tab-content">
              <p class="title">显示
                <el-switch v-model="config.enter.show" size="small"
                  style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" />
              </p>
              <p class="subtitle">颜色</p>
              <el-row :gutter="10">
                <el-col :span="18">
                  <el-input v-model="config.enter.color"></el-input>
                </el-col>
                <el-col :span="6">
                  <el-color-picker v-model="config.enter.color" show-alpha />
                </el-col>
              </el-row>
              <p class="subtitle">大小</p>
              <el-row :gutter="10">
                <el-col :span="18">
                  <el-input v-model="config.enter.size"></el-input>
                </el-col>
              </el-row>
              <p class="subtitle">粗细</p>
              <el-row :gutter="10">
                <el-col :span="18">
                  <el-input v-model="config.enter.weight"></el-input>
                </el-col>
              </el-row>
              <p class="subtitle">显示粉丝牌
                <el-switch v-model="config.enter.show_medal" size="small"
                  style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" />
              </p>
            </el-tab-pane>
            <el-tab-pane label="礼物" class="tab-content">
              <p class="title">电池礼物</p>
              <p class="subtitle">显示
                <el-switch v-model="config.gift.gold.show" size="small"
                  style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" />
              </p>
              <p class="subtitle">颜色</p>
              <el-row :gutter="10">
                <el-col :span="18">
                  <el-input v-model="config.gift.gold.color"></el-input>
                </el-col>
                <el-col :span="6">
                  <el-color-picker v-model="config.gift.gold.color" show-alpha />
                </el-col>
              </el-row>
              <p class="subtitle">大小</p>
              <el-row :gutter="10">
                <el-col :span="18">
                  <el-input v-model="config.gift.gold.size"></el-input>
                </el-col>
              </el-row>
              <p class="subtitle">粗细</p>
              <el-row :gutter="10">
                <el-col :span="18">
                  <el-input v-model="config.gift.gold.weight"></el-input>
                </el-col>
              </el-row>

              <p class="title">银瓜子礼物</p>
              <p class="subtitle">显示
                <el-switch v-model="config.gift.silver.show" size="small"
                  style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" />
              </p>
              <p class="subtitle">粗细</p>
              <el-row :gutter="10">
                <el-col :span="18">
                  <el-input v-model="config.gift.silver.weight"></el-input>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="高级" class="tab-content">
              <p class="title">自定义 CSS</p>
              <el-input v-model="config.extra.css" :rows="4" type="textarea" class="code-input"
                placeholder="Please input" />
              <p class="title">自定义 JS</p>
              <el-input v-model="config.extra.js" :rows="4" type="textarea" class="code-input"
                placeholder="Please input" />
              <p class="title">当前设置（只读）</p>
              <el-input v-model="config_format_str" :rows="10" disabled type="textarea" class="code-input"
                placeholder="Please input" />
            </el-tab-pane>
            <el-tab-pane label="预览设置" class="tab-content">
              <p class="title">背景颜色</p>
              <el-row :gutter="10">
                <el-col :span="18">
                  <el-input v-model="preview_bg"></el-input>
                </el-col>
                <el-col :span="6">
                  <el-color-picker v-model="preview_bg" show-alpha />
                </el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
          <div class="set-config-btn">
            <el-button @click="set_config()">应用设置</el-button>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card :style="`background: ${preview_bg}; border: none;`">
          <Preview :config="config_str"></Preview>
        </el-card>
      </el-col>
    </el-row>
  </main>
</template>

<style scoped>
main {
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
}

.title {
  color: #303133;
  font-size: 18px;
  font-weight: 600;
}

.subtitle {
  color: #909399;
  font-size: 14px;
  margin-top: 10px;
  margin-bottom: 5px;
}

.tab-content {
  margin-left: 10px;
  padding-bottom: 15px;
}

.set-config-btn {
  position: absolute;
  right: 15px;
  top: 15px;
}

.code-input {
  font-family: monospace;
}

.card-holder {
  position: relative;
}
</style>
