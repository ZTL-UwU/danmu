<template>
  <iframe id="frame" src="template.html" class="preview-frame"></iframe>
</template>

<script>
export default {
  methods: {
    generate_css(config) {
      return `body {
        font-family: ${config.general.font.family};
        font-size: ${config.general.font.size};
        font-weight: ${config.general.font.weight};
        color: ${config.general.font.color};
        background-color: ${config.general.background.color};
      }
      
      .usr {
        color: ${config.danmu.username.color};
        font-size: ${config.danmu.username.size};
        font-weight: ${config.danmu.username.weight};
      }

      .msg {
        color: ${config.danmu.content.color};
        font-size: ${config.danmu.content.size};
        font-weight: ${config.danmu.content.weight};
      }

      .admin {
        ${config.danmu.admin.show ? '' : 'display: none;'}
        color: ${config.danmu.admin.color};
        border: 1px solid ${config.danmu.admin.color};
      }

      .rank {
        ${config.danmu.rank.show ? '' : 'display: none;'}
        background: ${config.danmu.rank.color};
        border: 1px solid ${config.danmu.rank.color};
      }

      .line {
        margin-top: ${config.danmu.line_margin};
        margin-bottom: ${config.danmu.line_margin};
      }

      .enter {
        ${config.enter.show ? '' : 'display: none;'}
        color: ${config.enter.color};
        font-size: ${config.enter.size};
        font-weight: ${config.enter.weight};
      }

      .gift-gold {
        ${config.gift.gold.show ? '' : 'display: none;'}
        color: ${config.gift.gold.color};
        font-weight: ${config.gift.gold.weight};
        font-size: ${config.gift.gold.size};
      }

      .gift-silver {
        ${config.gift.silver.show ? '' : 'display: none;'}
      }

      ${config.extra.css}
      `;
    }
  },
  props: {
    config: String,
  },
  watch: {
    config(new_config) {
      const frame = document.getElementById('frame');
      const doc = frame.contentWindow.document;
      const head = doc.getElementsByTagName('head');
      let style = doc.createElement('style');
      style.innerHTML = this.generate_css(JSON.parse(new_config));
      head[0].append(style);
    }
  }
}
</script>

<style scoped>
.preview-frame {
  height: 500px;
  width: 310px;
  border: none;
}
</style>